var stripe = Stripe("pk_test_51Ll96dJwCxOOQvePFgPGvHTkqebAbf3HHCMnJjuYEJpObiCgZbO74Si566p4ysXUELET7o3sBHuv0UPm67RbI90c00tHVjkmgw");
const checkOutBtn = document.getElementById("btn");

    checkOutBtn.addEventListener("click", function () {
        fetch("/payment", {
        headers: {'Content-Type': 'application/json'},
        method: "POST",
        body: JSON.stringify({
        "product": {
            "name": "iPhone 12", 
            "image": "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-12-purple-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1617130317000", 
            "amount": 100,
            "quantity": 1
            }})
        })
        .then(function (response) {
        // return response.json();
        return response.json();
        })
        .then(function (session) {
        return stripe.redirectToCheckout({ sessionId: session.id });
        })
        .then(function (result) {
        
        if (result.error){
        alert(result.error.message);
        }
        })
        .catch(function (error) {
        console.error("Error:", error);
        });
        });


