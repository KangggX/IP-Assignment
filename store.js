function itemPurchase(item) {
    let itemID = ["item-1", "item-2", "item-3"];
    let itemPrice = [6, 8, 12];
    let decrementValue = itemPrice[itemID.indexOf(item)];

    db.collection("users").doc(`${localStorage["user-id"]}`).get().then((doc) => {
        if (doc.data().localPoints < decrementValue) {
            alert("Can't purchase");
        } else {
            db.collection("users").doc(`${localStorage["user-id"]}`).update({
                localPoints: firebase.firestore.FieldValue.increment(-itemPrice[itemID.indexOf(item)])
            });
            alert("Purchase successful");
        }
    });
}

// Check if user is signed in or not
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      $("#auth-modal-state").hide();
    } else {
      // No user is signed in.
      $("#auth-modal-state").css("display", "flex");
    }
});

$("#item-1").add("#item-2").add("#item-3").on("click", function() {
    itemPurchase(this.id);
});