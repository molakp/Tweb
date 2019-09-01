
getItem();



/**
 * make ajax request to server and show the result in html 
 *
 */
function getItem() {
  


    $.ajax({
        type: 'GET',
        url: "php/wishlist.php",
        dataType: "json",

        success: function (data) {
            if(JSON.stringify(data)== "[]"){ // se la wishlist è vuota
                $("#content").append("Your wishlist is empty, try to add something!");

            }
            //alert(data);
            data.forEach(element => {
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
                    '     <button class="remove-from-wishlist-' + id + '"> Remove </button> ' +
                    '    </div> </div>';

                var div = document.createElement("div");
                //div.className("product-slide");
                div.innerHTML = code;
                $(".content-slide").append(code);
                $(".remove-from-wishlist-" + id).click(function (e) {
                    e.preventDefault();
                    removeWishlist(id);


                });
                $(function () {
                    $(".product-slide").draggable({ revert: true, zIndex: 100, scroll: false, cursorAt: { bottom: 0 } });

                    $(".button-icon-cart").droppable({
                        tolerance: "pointer",
                        drop: function (event, ui) {

                            //ui.draggable.find("div").css("background-color","black");
                            var id = ui.draggable.find("a").attr("href");
                            id = id.replace('shop-single.html?id=', '');
                            // alert("dropped"+$(this).find("#img-fluid").attr("href"));
                            alert("dropped id " + id);
                            $.ajax({
                                type: "GET",
                                url: "php/add-cart.php",
                                data: {
                                    id: id //  id of the product
                                },
                                success: function (data) {
                                    if (data == "ok") {

                                        ui.draggable.empty(); // delete item from ui
                                        removeWishlist(id);// remove item from wishlist once added to cart
                                    }
                                    else
                                        alert(data); // show response from the php script.
                                }
                            });


                        }
                    });
                });

            });
        }


    });

}

function removeWishlist(id) {
    $.ajax({
        type: "GET",
        url: "php/remove-wishlist.php",
        data: {
            id: id //  id of the product
        },
        success: function (data) {
            if (data == "ok") {
                alert("Removed item" + id);
                location.reload();// reload page

            }
            else
                alert(data); // show response from the php script.
        }
    });

}

