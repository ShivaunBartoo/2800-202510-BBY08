// This script manages the contents page for a storage location (fridge/pantry).
// It handles loading and displaying items, donation and take actions, and AI food classification integration.

import { getUserLocation, getDistance } from "./userLocation.js";

const itemsToDonate = [];
const storageId = window.location.pathname.split("/")[2];

let disabled = true;
/**
 * Initializes the contents page by checking user distance and loading item rows.
 */
function initialize() {
    checkDistance();
    loadRows();
}
initialize();

/**
 * Fetches the content rows for the current storage location from the API.
 * Returns a promise that resolves to an array of row HTML strings.
 */
async function getRows() {
    let rows = await fetch(`/api/contents/${storageId}`);
    return rows.json();
}

/**
 * Checks the user's distance from the storage location and updates the UI accordingly.
 * Disables donation/take actions if the user is too far away.
 */
async function checkDistance() {
    let userLocation = await getUserLocation();
    let storageLocation = await fetch(`/storageloc/${storageId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accepts: "application/json",
        },
    }).then((response) => {
        return response.json();
    });
    let distance = getDistance(userLocation.lat, userLocation.lon, storageLocation.latitude, storageLocation.longitude);
    distance = distance.toFixed(1);

    document.getElementById("distance").innerHTML = `${distance}km Away`;

    if (distance > 7) {
        disabled = true;
        document.querySelector("#open-modal").disabled = true;
        document.querySelector("#take").disabled = true;
        document.querySelector("#distance-error").classList.remove("hidden");
    } else {
        disabled = false;
        document.getElementById("distance-error").classList.add("hidden");
    }
}

/**
 * Loads and displays the content rows in the table.
 */
function loadRows() {
    let table = document.getElementById("content-rows");

    getRows().then((rows) => {

        if (rows.length > 0) {
            for (let row of rows) {
                let rowHTML = document.createElement("tr");
                rowHTML.innerHTML = row.trim();
                table.appendChild(rowHTML);
            }
        }
    })
}

/**
 * Sends an AJAX POST request to the given URL with the provided data.
 * Calls the callback with the response if successful.
 */
function ajaxPOST(url, callback, data) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            callback(this.responseText);
        } else {
            console.error(this.status);
        }
    };
    xhr.open("POST", url);
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
}

// Opens the donation modal when the button is clicked.
document.querySelector("#open-modal").addEventListener("click", function () {
    if (disabled) {
        return;
    }
    document.getElementById("contentsmodal").style.display = "flex";
});

/**
 * Resets the donation form values and clears the donation list.
 */
function resetValues() {
    let list = document.getElementById("donationList");
    let qty = document.getElementById("qty");
    let name = document.getElementById("itemName");
    let bbd = document.getElementById("bbd");
    name.value = "";
    qty.value = "0";
    bbd.value = "";
    while (2 <= list.rows.length) {
        list.deleteRow(1);
    }
    itemsToDonate.length = 0;
    current = "";
    setClassificationResult("none");

}

// Cancels the donation modal and resets values.
document.querySelector("#modal-cancel").addEventListener("click", function () {
    resetValues();
    document.getElementById("contentsmodal").style.display = "none";
    document.getElementById("add-item-error").classList.add("hidden");
});

// Closes the donation modal and resets values.
document.querySelector("#close-modal").addEventListener("click", function () {
    document.getElementById("add-item-error").classList.add("hidden");
    resetValues();
    document.getElementById("contentsmodal").style.display = "none";
});

// Displays an error message in the add-item-error element.
function showError(message) {
    const element = document.getElementById("add-item-error");
    element.classList.remove("hidden");
    element.innerHTML = message;
}

// Handles the "Add Item" button click for donations.
// Validates input fields, AI classification, and adds the item to the donation list if valid.
document.querySelector("#addItem").addEventListener("click", function (e) {
    document.getElementById("add-item-error").classList.add("hidden");
    let name = document.getElementById("itemName");
    let qty = document.getElementById("qty");
    let bbd = document.getElementById("bbd");
    name.style.border = `none`;
    qty.style.border = `none`;
    bbd.style.border = `none`;
    let today = new Date().setHours(0, 0, 0);
    let bbdDate = new Date(bbd.value);
    let aiRejected = document.getElementById("ai-good").classList.contains("hidden");
    if (aiRejected || name.value == "") {
        name.style.border = `1px solid var(--pink-accent)`;
        showError("Item Name cannot be empty and must be recognized as food.");
        return;
    }

    if (1 > qty.value || qty.value > 50) {
        qty.style.border = `1px solid var(--pink-accent)`;
        showError("Item quantity must be between 1 and 50.");
        return;
    }

    if (qty.value % 1 != 0) {
        qty.style.border = `1px solid var(--pink-accent)`;
        showError("Item quantity cannot be fractional.");
        return;
    }

    if (bbdDate == `Invalid Date` || bbdDate < today) {
        bbd.style.border = `1px solid var(--pink-accent)`;
        showError("Best Before Date cannot be expired.");
        return;
    }

    // Add the validated item to the donation list
    let donateItem = { storageId: storageId, itemName: name.value, quantity: qty.value, bbd: bbd.value };
    itemsToDonate.push(donateItem);

    const list = document.getElementById("donationList");
    let itemQty = document.createElement("td");
    let itemName = document.createElement("td");
    let itemBBD = document.createElement("td");
    itemQty.textContent = qty.value;
    itemName.textContent = name.value;
    itemBBD.textContent = bbd.value;

    name.value = "";
    qty.value = "0";
    bbd.value = "";
    let item = document.createElement("tr");
    item.appendChild(itemQty);
    item.appendChild(itemName);
    item.appendChild(itemBBD);
    list.appendChild(item);
    current = "";
    setClassificationResult("none");
    document.querySelector("#donate-btn").disabled = false;
});

const closebtn = document.querySelector("#close-modal");
closebtn.disabled = false;

// Handles the "Donate" button click.
// Disables the button, calls donateHandler, and disables the close button during processing.
document.querySelector("#donate-btn").addEventListener("click", function (e) {
    document.querySelector("#donate-btn").disabled = true;
    donateHandler();
    e.preventDefault();
    closebtn.disabled = true;
});

/**
 * Handles the donation process.
 * Sends the donation items to the server and updates the UI based on the response.
 */
function donateHandler() {

    if (disabled) {
        return;
    }
    let items = JSON.stringify(itemsToDonate);
    ajaxPOST(
        `/api/donate`,
        function (data) {
            if (data) {
                let parsedData = JSON.parse(data);
                if (parsedData.status == "fail") {
                    alert(parsedData.msg);
                    document.querySelector("#donate-btn").disabled = false;
                } else {
                    let table = document.getElementById("content-rows");
                    while (2 <= table.rows.length) {
                        table.deleteRow(1);
                    }
                    loadRows();
                    resetValues();
                    document.getElementById("contentsmodal").style.display = "none";
                    document.querySelector("#donate-btn").disabled = false;
                }
            }
        },
        items
    );
    closebtn.disabled = false;
}

var qtyList = [];

// Handles the "Take" button click.
// Calls takeHandler to enable take mode.
document.querySelector("#take").addEventListener("click", function takeMode() {
    takeHandler();
});

/**
 * Handles the take process after bot verification.
 * Converts item quantities to input fields for user to specify how much to take.
 */
function takeHandler() {
    if (disabled) {
        return;
    }
    let elements = document.getElementsByClassName("item-quantity");
    let quantities = Array.from(elements);
    quantities.forEach((qty) => {
        let itemId = qty.dataset["contentid"];
        let itemQty = qty.dataset["qty"];
        qtyList.push({ id: parseInt(itemId), qty: parseInt(itemQty) });
        // Replace the quantity cell with an input for user entry
        qty.innerHTML = `<input type="number" class="input-values" id="qty" value="0" min="0" data-itemid=${itemId} data-qty=${itemQty} max=${itemQty} /><span id="maxValue">/${itemQty}</span>`;
    });
    document.getElementById("open-modal").classList.add("hidden");
    document.getElementById("take").classList.add("hidden");
    document.getElementById("take-cancel").classList.remove("hidden");
    document.getElementById("take-confirm").classList.remove("hidden");
}

// Cancels the take mode and restores original item quantities.
document.querySelector("#take-cancel").addEventListener("click", function () {
    cancelTake();
});

/**
 * Cancels the take mode, restores original item quantities, and resets UI.
 */
function cancelTake() {
    document.getElementById("take-error").classList.add("hidden");
    document.getElementById("decimal-error").classList.add("hidden");
    let elements = document.getElementsByClassName("item-quantity");
    let quantities = Array.from(elements);
    for (let i = 0; i < quantities.length; i++) {
        quantities[i].innerHTML = qtyList[i].qty;
    }
    document.getElementById("open-modal").classList.remove("hidden");
    document.getElementById("take").classList.remove("hidden");
    document.getElementById("take-cancel").classList.add("hidden");
    document.getElementById("take-confirm").classList.add("hidden");
    document.getElementById("take-error").classList.add("hidden");
}

// Confirms the take action, validates input, and sends the updated quantities to the server.
document.querySelector("#take-confirm").addEventListener("click", async function confirmTake() {
    document.querySelector("#take-confirm").disabled = true;
    document.querySelector(".input-values").style.border = `none`;
    document.getElementById("take-error").classList.add("hidden");
    document.getElementById("decimal-error").classList.add("hidden");
    let error = false;
    qtyList.forEach((item) => {
        let subQty = parseFloat(document.querySelector(`[data-itemid~="${item.id}"]`).value);
        if (subQty < 0) {
            document.querySelector(`[data-itemid~="${item.id}"]`).style.border = `1px solid var(--pink-accent)`;
            document.getElementById("take-error").classList.remove("hidden");
            error = true;
            return;
        }
        if (subQty % 1 !== 0) {
            document.querySelector(`[data-itemid~="${item.id}"]`).style.border = `1px solid var(--pink-accent)`;
            document.getElementById("decimal-error").classList.remove("hidden");
            error = true;
            return;
        }
        let newQty = item.qty - subQty;
        if (newQty < 0) {
            newQty = 0;
        }
        item["qty"] = newQty;
    });
    if (error) {
        document.querySelector("#take-confirm").disabled = false;
        return;
    }

    document.querySelector('#take-confirm').innerHTML = `<div id="take-loader"></div>`;

    const response = await fetch("/api/take", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(qtyList),
    });

    if (response.status == 200) {
        document.querySelector("#take-confirm").disabled = false;
        document.querySelector('#take-confirm').innerHTML = `Confirm`;
        window.location = window.location;
    } else {
        console.error("An error has occurred!");
        document.querySelector("#take-confirm").disabled = false;
    }
});

/**
 * Updates the AI classification result icons based on the result string.
 * Hides or shows the appropriate icon.
 */
function setClassificationResult(result) {
    const loader = document.getElementById("ai-loader");
    const good = document.getElementById("ai-good");
    const bad = document.getElementById("ai-bad");
    const warning = document.getElementById("ai-warning");
    loader.classList.add("hidden");
    good.classList.add("hidden");
    bad.classList.add("hidden");
    warning.classList.add("hidden");
    switch (result) {
        case "loading":
            loader.classList.remove("hidden");
            break;
        case "good":
            good.classList.remove("hidden");
            break;
        case "bad":
            bad.classList.remove("hidden");
            warning.classList.remove("hidden");
            break;
        case "none":
            break;
        default:
            console.error("Invalid icon.");
    }
}

let current = "";

// Resets AI classification result when the item name input is focused.
document.querySelector("#itemName").addEventListener("focusin", async (event) => {
    if (event.target.value != current) {
        setClassificationResult("none");
    }
});

// Runs AI classification on item name input when focus is lost.
document.querySelector("#itemName").addEventListener("focusout", async (event) => {
    const input = event.target.value;
    let aiRejected = document.getElementById("ai-good").classList.contains("hidden");
    if (input && (current != input || aiRejected)) {
        current = input;
        setClassificationResult("loading");
        let response = await fetch(`/api/classify?input=${encodeURIComponent(input)}`);
        let result = await response.json();
        if (result.input == current) {
            if (result.isFood) {
                setClassificationResult("good");
            }
            else {
                setClassificationResult("bad");
            }
        }
        else {
            console.error("stale result rejected.")
        }
    }
});
