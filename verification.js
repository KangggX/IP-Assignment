var signInEmail = $("#in__email");
var signInPassword = $("#in__password");
var signUpEmail = $("#up__email");
var signUpPassword1 = $("#up__password--1");
var signUpPassword2 = $("#up__password--2");

function formCheck(e) {
    if (e.value != "") {
        $(e).addClass("field__input--non-empty");
        console.log(e);
    } else {
        $(e).removeClass("field__input--non-empty");
    }
}

signInEmail.add(signInPassword).add(signUpEmail).add(signUpPassword1).add(signUpPassword2).on("blur", function() {
    formCheck(this);
}); 