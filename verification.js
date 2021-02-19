var signInEmail = $("#in__email");
var signInPassword = $("#in__password");
var signUpEmail = $("#up__email");
var signUpName = $("#up__username");
var signUpPassword1 = $("#up__password--1");
var signUpPassword2 = $("#up__password--2");
var usernameList = [];

db.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        usernameList.push(doc.data().name);
    });
});

// If form input value is undefined, form label will still be visible
function formCheck(e) {
    if (e.value != "") {
        $(e).addClass("field__input--non-empty");
    } else {
        $(e).removeClass("field__input--non-empty");
    }
}

// Check if password value length is > 6
function lengthCheck(e) {
    if ((e.value.length < "6") && e.value.length > "0") {
        $(".field__error--first").css("display", "block");
    } else {
        $(".field__error--first").css("display", "none");
    }
}

// Check if password and confirmed password value are equal
function pwCheck() {
    if ((signUpPassword1.val() != signUpPassword2.val()) && (signUpPassword1.val().length >= "6") && (signUpPassword2.val().length > "0")) {
        $(".field__error--second").css("display", "block");
    } else {
        $(".field__error--second").css("display", "none");
    }
}

// Function for user to login
function userLogin() {
    firebase.auth().signInWithEmailAndPassword(signInEmail.val(), signInPassword.val())
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            location.href = "index.html";
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            $(".form__error").css("display", "block");
        });
}

// Function for user to create a new account
function userRegister(username) {
    let error = 0;
    for (let i = 0; i < usernameList.length; i++) {
        if (usernameList[i] == username) {
            error++;
            console.log("error name");
        }
    }

    if (error == 0) {
        firebase.auth().createUserWithEmailAndPassword(signUpEmail.val(), signUpPassword2.val())
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;
                user.updateProfile({
                    displayName: `${username}`
                });
                console.log(user);

                setTimeout(() => {
                    location.href = "index.html";
                }, 1000); 
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
            });
    }

}

// Function for user to logout
function userLogout() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
}

// Check if user is signed in or not
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        $("#in").css("display", "none");
        $("#out").css("display", "initial");

        setTimeout(() => {
            // Getting user profile
            var user = firebase.auth().currentUser;
            var email, name, uid;
            if (user != null) {
                email = user.email;
                name = user.displayName;
                uid = user.uid;
                localStorage.setItem("email", email);
                localStorage.setItem("username", name);
                localStorage.setItem("user-id", uid);
            };

            // Creating user database
            db.collection("users").doc(`${localStorage["user-id"]}`).get().then((doc) => {
                if (doc.exists) { // If user data exists, do nothing
                    console.log("User data successfully obtained");
                } else {    // If user data doesn't exist, create a new data
                    console.log("Creating new user data");
                    db.collection("users").doc(`${localStorage["user-id"]}`).set({
                        globalPoints: 0,
                        localPoints: 0,
                        qComplete1: false,
                        qComplete2: false,
                        qComplete3: false,
                        qComplete4: false,
                        name: `${localStorage["username"]}`,
                        userID: `${localStorage["user-id"]}`
                    });
                };setTimeout(() => {
                location.href = "index.html";
            }, 1000); 
            });
        }, 1000);


    } else {
        // No user is signed in.
        $("#in").css("display", "inline-block");
        $("#out").css("display", "none");

        // Clear user local storage
        localStorage.removeItem("user-id")
        localStorage.removeItem("username");
        localStorage.removeItem("email");
    }
});

signInEmail.add(signInPassword).add(signUpEmail).add(signUpName).add(signUpPassword1).add(signUpPassword2).on("blur", function () {
    formCheck(this);
});

signUpPassword1.add(signInPassword).on("blur", function () {
    lengthCheck(this);
});

signUpPassword2.on("blur", function () {
    pwCheck();
});

$("#in__submit").click(function (e) {
    e.preventDefault();
    userLogin();
})

$("#up__submit").click(function (e) {
    e.preventDefault();
    userRegister(signUpName.val());
})

$("#out").on("click", function (e) {
    userLogout();
});

$("#page-back").click(function () {
    location.href = "index.html";
});