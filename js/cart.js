$.ajax({
    type: 'GET',
    url: 'php/cart.php',
    dataType: "json",

    success: function (data) {
        alert(data);
        data.forEach(element => {
            var brand = element.brand;
            var size = element.size;
            var id = element.id;
            var model = element.model;
            var description = element.description;
            var price = element.price;
            var image = element.image;
            var code = ' <div class ="product-slide">   <figure class="block-4-image">' +
            '   <a href="shop-single.html?id='+id+'"><img src="' + image + '" alt="Image placeholder" class="img-fluid"></a>' +
            '   </figure>' +
            '   <div class="description-and-price">' +
            '    <h3><a href="shop-single.html?id='+id+'">' + model + '</a></h3> ' +
            '    <p class="description">' + description + '</p> ' +
            '     <p class="price">$' + price + '</p>' +
            '     <button class="remove-from-cart"> Remove </button>  </div> </div> ';                            
           
            var div = document.createElement("div");
            //div.className("product-slide");
            div.innerHTML = code;
            $(".content-slide").append(code);


           /* $(".remove-from-cart").click(function (e) { 
                e.preventDefault();
                $.ajax({
                    type: "GET",
                    url: "php/cart.php",
                    data:{
                       id:  params["id"] //  id of the product
                      }, 
                    success: function(data)
                    {    if(data == "ok"){
                        $(".description-and-price-expanded ").empty();
                        var code='<img src=images/added-to-cart.png alt="Item added to cart!" class="img-added-to-cart"> <p class="already-logged-in">Item added to cart!</p>';
                        $(".description-and-price-expanded ").append(code);
                    }
                    else
                        alert(data); // show response from the php script.
                    }
                  }); 
                
            }); */
        })
    }
});

