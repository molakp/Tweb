$.ajax({
    type: 'GET',
    url: 'php/cart.php',
    dataType: "json",

    success: function (data) {
        alert(data);
        var total_price=0;
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
            '     <button class="remove-from-cart-'+id+'"> Remove </button>  </div> </div> ';                            
           
            var div = document.createElement("div");
            //div.className("product-slide");
            div.innerHTML = code;
            $(".content-slide").append(code);

            total_price=total_price+ parseInt(price) ;
           
            $(".remove-from-cart-"+id).click(function (e) { 
                e.preventDefault();
                $.ajax({
                    type: "GET",
                    url: "php/remove-cart.php",
                    data:{
                       id: id //  id of the product
                      }, 
                    success: function(data)
                    {    if(data == "ok"){
                        location.reload();

                    }
                    else
                        alert(data); // show response from the php script.
                    }
                  }); 
                
            }); 
        })
        $("#summary-total").append(total_price+"€");
    }
});

