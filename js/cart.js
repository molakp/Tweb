$.ajax({
    type: 'GET',
    url: 'php/cart.php',
    dataType: "json",

    success: function (data) {
        alert(data);
        var total_price = 0;
        data.forEach(element => {
            var brand = element.brand;
            var size = element.size;
            var id = element.id;
            var model = element.model;
            var description = element.description;
            var price = element.price;
            var image = element.image;
            var code = ' <div class ="product-slide">   <figure class="block-4-image">' +
                '   <a href="shop-single.html?id=' + id + '"><img src="' + image + '" alt="Image placeholder" class="img-fluid"></a>' +
                '   </figure>' +
                '   <div class="description-and-price">' +
                '    <h3><a href="shop-single.html?id=' + id + '">' + model + '</a></h3> ' +
                '    <p class="description">' + description + '</p> ' +
                '     <p class="price">$' + price + '</p>' +
                '     <button class="remove-from-cart-' + id + '"> Remove </button>  </div> </div> ';

            var div = document.createElement("div");
            //div.className("product-slide");
            div.innerHTML = code;
            $(".content-slide").append(code);

            total_price = total_price + parseInt(price);

            $(".remove-from-cart-" + id).click(function (e) {
                e.preventDefault();
                $.ajax({
                    type: "GET",
                    url: "php/remove-cart.php",
                    data: {
                        id: id //  id of the product
                    },
                    success: function (data) {
                        if (data == "ok") {
                            location.reload();

                        }
                        else
                            alert(data); // show response from the php script.
                    }
                });

            });
        })
        $("#summary-total").append(total_price + "€");
    }
});

//function for buy button 

$(".buy").click(function (e) {
    

    $.ajax({
        type: "GET",
        url: "php/remove-cart.php",
        data: {
            buy: "buy"
        },
        success: function (data) {
            if (data == "ok") {

                $("#content").empty();
                var code = '<img src=images/added-to-cart.png alt="success" class="img-success-buy">' +
                    '<p class="already-logged-in">Thank you for buying!</p>';
                $("#content").append(code);
                $("#content").css("text-align", "center");
                $("#summary").empty();
            }
            else{
                if(data=="empty"){
                    var code= "You need to add something to the cart first!";
                    $("#content").append(code);
                    $("#content").css("text-align","center");

                }
                else{
                    alert(data); // show response from the php script.

                }
            }
                
        }
    });




});

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}