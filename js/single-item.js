//funzione per recuperare parametro id da url html, funziona anche per parametri multipli
function getSearchParameters() {
    var prmstr = window.location.search.substr(1);
    return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
}

function transformToAssocArray( prmstr ) {
  var params = {};
  var prmarr = prmstr.split("&");
  for ( var i = 0; i < prmarr.length; i++) {
      var tmparr = prmarr[i].split("=");
      params[tmparr[0]] = tmparr[1];
  }
  return params;
}

var params = getSearchParameters(); // params servirà anche per aggiungere al carrello
//alert("ID is: "+params["id"]);

getItem();

function getItem () {
    


    $.ajax({
        type: 'GET',
        url: 'php/single-retrieve.php?id='+params["id"],
        dataType: "json",
        
        success: function (data) {
            alert(data);
            data.forEach(element => {
                var brand=element.brand;
                var size= element.size;
                var id= element.id;
                var model = element.model;
                var description = element.description;
                var price = element.price;
                var image = element.image;
                var code = ' <div class ="product-show">   ' +
                '   <a href="shop-single.html?id='+id+'"><img src="' + image + '" alt="Image placeholder" class="img-fluid"></a>' +
                '   ' +
                '   <div class="description-and-price-expanded">' +
                '    <h3><a href="shop-single.html?id='+id+'">' + model + '</a></h3> ' +
                '       <p class="brand">'+brand+ '</p>'+
                '       <p class="description">' + description + '</p> ' +
                '<p class="avaiable-size"> Size: '+size+ '</p>'+
                '     <p class="price">$' + price + '</p>' +
                '   <button class="add-to-cart">Add to cart!</button> </div> </div>';
                var div = document.createElement("div");
                //div.className("product-slide");
                div.innerHTML = code;
                $(".content-slide").append(code);


                $(".add-to-cart").click(function (e) { 
                    e.preventDefault();
                    $.ajax({
                        type: "GET",
                        url: "php/add-cart.php",
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
                    
                });

            });
        }


    });

}

