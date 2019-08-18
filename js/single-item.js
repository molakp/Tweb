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

var params = getSearchParameters();
alert("ID is: "+params["id"]);

getItem();

function getItem () {
    //jQuery.getScript("https://ajax.googleapis.com/ajax/libs/prototype/1.7.3.0/prototype.js"); meglio non usarlo perchè da solo problemi  ogni volta che lo includo, uso jquery


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

            });
        }


    });

}