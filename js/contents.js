import { getUserLocation, getDistance } from "./userLocation.js";

const itemsToDonate = [];
const storageId = window.location.pathname.split("/")[2];

function initialize() {
    checkDistance();
    loadRows();
}
initialize();

async function getRows() {
    let rows = await fetch(`/api/contents/${storageId}`);
    return rows.json();
}

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

    if (distance > 50) {
        document.querySelector("#open-modal").disabled = true;
        document.querySelector("#take").disabled = true;
        document.querySelector("#distance-error").classList.remove("hidden");
    } else {
        document.getElementById("distance-error").classList.add("hidden");
    }
}

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


function ajaxPOST(url, callback, data) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            callback(this.responseText);
        } else {
            console.log(this.status);
        }
    };
    xhr.open("POST", url);
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
}

document.querySelector("#open-modal").addEventListener("click", function (e) {
    document.getElementById("contentsmodal").style.display = "flex";
});

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

document.querySelector("#modal-cancel").addEventListener("click", function (e) {
    resetValues();
    document.getElementById("contentsmodal").style.display = "none";
    document.getElementById("donate-errors").classList.add("hidden");
});

document.querySelector("#close-modal").addEventListener("click", function (e) {
    resetValues();
    document.getElementById("contentsmodal").style.display = "none";
});

document.querySelector("#addItem").addEventListener("click", function (e) {
    document.getElementById("donate-errors").classList.add("hidden");
    let name = document.getElementById("itemName");
    let qty = document.getElementById("qty");
    let bbd = document.getElementById("bbd");

    let today = new Date().setHours(0, 0, 0);
    let bbdDate = new Date(bbd.value);
    let aiRejected = document.getElementById("ai-good").classList.contains("hidden");
    if (aiRejected || name.value == "" || qty.value == 0 || bbdDate == `Invalid Date` || bbdDate < today) {
        document.getElementById("donate-errors").classList.remove("hidden");
        return;
    }

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
//currentAction is protection against inspect element goblins
let currentAction = null; //copy from here
let pending = false;

//sends challenge and receives token
async function onTurnstileSuccess(token) {

    const res = await fetch('/challenge-point', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, action: currentAction })

    });
    const result = await res.json();
    return result;
}

document.querySelector("#donate-btn").addEventListener("click", function (e) { // add cloudflare
    document.querySelector("#bot-checking-donate").classList.remove("hidden");
    
    e.preventDefault();
    
    //assigns currentAction as donate
    currentAction = "donate"

    const ploader = document.querySelector(".persoloader")

    ploader.classList.remove("donate-hidden");

    turnstile.reset('#turnstile-widget');
    pending = true;
    //executes the widget to then get verified
    turnstile.execute('#turnstile-widget', { action: currentAction });
});

//verified result gets used to determine which action was selected
//this is important because if something malicious actually manages to
//get one token it can't use it across all functions 
window.onTurnstileVerified = async function (token) {

    if (!pending) return;

    pending = false;

    const ploader = document.querySelector(".persoloader")
    const nloader = document.querySelector(".nuthaloader")

    const result = await onTurnstileSuccess(token);

    if (!result.success) {
        alert("not verified");
        return;
    }

    ploader.classList.add("donate-hidden");
    nloader.classList.add("take-hidden");
    takeBtn.textContent = originalText;
    document.querySelector("#bot-checking").classList.add("hidden");
    document.querySelector("#bot-checking-donate").classList.add("hidden");
    //determines which function to call based on which button was pushed
    if (currentAction === "donate") {
        donateHandler();
    } else if (currentAction === "take") {
        takeHandler();
    }
    //clears action so you can use other actions
    currentAction = null;
};
function donateHandler() {

    console.log("donate button clicked");
    let items = JSON.stringify(itemsToDonate);

    ajaxPOST(
        `/api/donate?ID=${storageId}`,
        function (data) {
            if (data) {
                let parsedData = JSON.parse(data);
                if (parsedData.status == "fail") {
                    alert(parsedData.msg);
                } else {
                    let table = document.getElementById("content-rows");
                    while (2 <= table.rows.length) {
                        table.deleteRow(1);
                    }
                    loadRows();
                    resetValues();
                    document.getElementById("contentsmodal").style.display = "none";
                }
            }
        },
        items
    );
} // to here


var qtyList = [];
let takeBtn = document.getElementById("take-text");
let originalText = takeBtn.textContent.trim();
document.querySelector("#take").addEventListener("click", function takeMode() {

    currentAction = "take"
    turnstile.reset('#turnstile-widget');

    const nloader = document.querySelector(".nuthaloader");



    takeBtn.textContent = "";
    nloader.classList.remove("take-hidden")
    document.querySelector("#bot-checking").classList.remove("hidden");
    pending = true;
    turnstile.execute('#turnstile-widget', { action: currentAction });

});

function takeHandler() {
    let elements = document.getElementsByClassName("item-quantity");
    let quantities = Array.from(elements);
    quantities.forEach((qty) => {
        let itemId = qty.dataset["contentid"];
        let itemQty = qty.dataset["qty"];
        qtyList.push({ id: parseInt(itemId), qty: parseInt(itemQty) });
        qty.innerHTML = `<input type="number" class="input-values" id="qty" value="0" min="0" data-itemid=${itemId} data-qty=${itemQty} max=${itemQty} /><span id="maxValue">/${itemQty}</span>`;
    });
    document.getElementById("open-modal").classList.add("hidden");
    document.getElementById("take").classList.add("hidden");
    document.getElementById("take-cancel").classList.remove("hidden");
    document.getElementById("take-confirm").classList.remove("hidden");
}

document.querySelector("#take-cancel").addEventListener("click", function () {
    cancelTake();
});

function cancelTake() {
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

document.querySelector("#take-confirm").addEventListener("click", async function confirmTake() {
    let error = false;
    qtyList.forEach((item) => {
        let subQty = parseInt(document.querySelector(`[data-itemid~="${item.id}"]`).value);
        let newQty = item.qty - subQty;
        if (newQty < 0) {
            document.querySelector(`[data-itemid~="${item.id}"]`).style.backgroundColor = "#ac6872";
            document.getElementById("take-error").classList.remove("hidden");
            error = true;
            return;
        }
        item["qty"] = newQty;
    });
    if (error) {
        return;
    }

    const response = await fetch("/api/take", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(qtyList),
    });

    if (response.status == 200) {
        window.location = window.location;
    } else {
        console.log("An error has occurred!");
    }
});

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

document.querySelector("#itemName").addEventListener("focusin", async (event) => {
    if (event.target.value != current) {
        setClassificationResult("none");
    }
});

document.querySelector("#itemName").addEventListener("focusout", async (event) => {
    const input = event.target.value;
    if (input && current != input) {
        current = input;
        setClassificationResult("loading");
        console.log(`getting score for ${input}.`)
        let response = await fetch(`/api/classify?input=${encodeURIComponent(input)}`);
        let result = await response.json();
        console.log("score: " + JSON.stringify(result));
        if (result.input == current) {
            if (result.isFood) {
                setClassificationResult("good");
            }
            else {
                setClassificationResult("bad");
            }
        }
        else {
            console.log("stale result rejected.")
        }
    }
});
