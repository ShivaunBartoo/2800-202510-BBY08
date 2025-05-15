function ajaxPOST(url, callback, data) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            callback(this.responseText);
        } else {
            console.log(this.status);
        }
    }
    xhr.open("POST", url);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(data);
}

document.querySelector('#login-submit')?.addEventListener('click', function (e) {
    e.preventDefault();
    let email = document.getElementById("login-email");
    let password = document.getElementById("login-password");

    if (email.value == "") {
        email.style.backgroundColor = '#ac6872';
        document.getElementById("errormsg").classList.remove("hidden");
        return;
    }

    if (password.value == "") {
        password.style.backgroundColor = '#ac6872';
        document.getElementById("errormsg").classList.remove("hidden");
        return;
    }

    const vars = { "email": email.value, "password": password.value }
    let data = btoa(JSON.stringify(vars));
    let body =
        "data=" + data;
    
    ajaxPOST("/loggingIn", function (data) {

        if (data) {
            let dataParsed = JSON.parse(data);
            if (dataParsed.status == "fail") {
                alert(dataParsed.msg);
                return;
            } else {
                window.location.replace("/browse");
            }
        }

    }, body);
});

document.querySelector('#create-submit')?.addEventListener('click', function (e) {
    e.preventDefault();

    let firstName = document.getElementById('first-name');
    let lastName = document.getElementById('last-name');
    let email = document.getElementById('email');
    let pword = document.getElementById('password');
    let confirm = document.getElementById('confirm-password');

    if (firstName.value == "") {
        firstName.style.backgroundColor = '#ac6872';
        document.getElementById("errormsg").classList.remove("hidden");
        return;
    }

    if (lastName.value == "") {
        lastName.style.backgroundColor = '#ac6872';
        document.getElementById("errormsg").classList.remove("hidden");
        return;
    }

    if (email.value == "") {
        email.style.backgroundColor = '#ac6872';
        document.getElementById("errormsg").classList.remove("hidden");
        return;
    }

    if (!pword.value == confirm.value) {
        pword.style.backgroundColor = '#ac6872';
        confirm.style.backgroundColor = '#ac6872';
        document.getElementById("pwderror").classList.remove("hidden");
        return;
    } else {
        var password = pword.value;
    }
    const vars = {"firstName": firstName.value, "lastName": lastName.value, "email": email.value, "password": password}
    let data = btoa(JSON.stringify(vars));
    let body =
        "data=" + data;

    ajaxPOST("/createUser", function (data) {
        if (data) {
            let dataParsed = JSON.parse(data);
            if (dataParsed.status == "fail") {
                alert(dataParsed.msg);
            } else {
                window.location.replace("/browse");
            }
        }
    }, body);
});