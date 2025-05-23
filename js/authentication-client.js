// This script handles client-side authentication logic for login and account creation forms.
// It validates user input, displays error messages, and sends AJAX POST requests to the server for login and registration.

/**
 * Sends an AJAX POST request to the given URL with the provided data.
 * Calls the callback with the response if successful, otherwise shows an error.
 */
function ajaxPOST(url, callback, data) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            callback(this.responseText);
        } else {
            let parsedRes = JSON.parse(this.response)
            showError(parsedRes.msg);
        }
    };
    xhr.open("POST", url);
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(data);
}


// Displays an error message in the error message element.
function showError(message) {
    const element = document.getElementById("errormsg");
    element.classList.remove("hidden");
    element.innerHTML = message;
}

/**
 * Handles login form submission.
 * Validates input fields and sends login data to the server.
 */
document.querySelector("#login-submit")?.addEventListener("click", function (e) {
    e.preventDefault();
    let email = document.getElementById("login-email");
    let password = document.getElementById("login-password");

    if (email.value == "") {
        email.style.border = "solid #ac6872";
        showError("Highlighted fields cannot be empty.");
    }
    if (password.value == "") {
        password.style.border = "solid #ac6872";
        showError("Highlighted fields cannot be empty.");
    }
    if (email.value && password.value) {
        document.querySelector(".loader").classList.remove("hidden");
        const vars = { email: email.value, password: password.value };
        let data = btoa(JSON.stringify(vars));
        let body = "data=" + data;
        ajaxPOST(
            "/loggingIn",
            function (data) {
                if (data) {
                    let dataParsed = JSON.parse(data);
                    if (dataParsed.status == "fail") {
                        showError(dataParsed.msg);
                        return;
                    } else {
                        window.location.replace("/browse");
                    }
                }
            },
            body
        );
    }
});

/**
 * Handles account creation form submission.
 * Validates input fields and sends registration data to the server.
 */
document.querySelector("#create-submit")?.addEventListener("click", function (e) {
    e.preventDefault();

    let firstName = document.getElementById("first-name");
    let lastName = document.getElementById("last-name");
    let email = document.getElementById("email");
    let pword = document.getElementById("password");
    let confirm = document.getElementById("confirm-password");
    let error = false;
    if (firstName.value == "") {
        firstName.style.border = "solid #ac6872";
        document.getElementById("errormsg").classList.remove("hidden");
        showError("Highlighted fields cannot be empty.");
        error = true;
    }
    if (lastName.value == "") {
        lastName.style.border = "solid #ac6872";
        document.getElementById("errormsg").classList.remove("hidden");
        showError("Highlighted fields cannot be empty.");
        error = true;
    }
    if (email.value == "") {
        email.style.border = "solid #ac6872";
        document.getElementById("errormsg").classList.remove("hidden");
        showError("Highlighted fields cannot be empty.");
        error = true;
    }
    if (pword.value == "") {
        pword.style.border = "solid #ac6872";
        document.getElementById("errormsg").classList.remove("hidden");
        showError("Highlighted fields cannot be empty.");
        error = true;
    }
    if (confirm.value == "") {
        confirm.style.border = "solid #ac6872";
        document.getElementById("errormsg").classList.remove("hidden");
        showError("Highlighted fields cannot be empty.");
        error = true;
    }
    // Check if password and confirm password match
    if (!pword.value == confirm.value) {
        pword.style.border = "solid #ac6872";
        confirm.style.border = "solid #ac6872";
        document.getElementById("pwderror").classList.remove("hidden");
        showError("Highlighted fields cannot be empty.");
        error = true;
    } else {
        var password = pword.value;
    }
    if (!error) {
        document.querySelector(".loader").classList.remove("hidden");
        const vars = { firstName: firstName.value, lastName: lastName.value, email: email.value, password: password };
        let data = btoa(JSON.stringify(vars));
        let body = "data=" + data;

        ajaxPOST(
            "/createUser",
            function (data) {
                if (data) {
                    let dataParsed = JSON.parse(data);
                    if (dataParsed.status == "fail") {
                        alert(dataParsed.msg);
                    } else {
                        window.location.replace("/browse");
                    }
                }
            },
            body
        );
    }
});
