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




function getItem () {
    //jQuery.getScript("https://ajax.googleapis.com/ajax/libs/prototype/1.7.3.0/prototype.js"); meglio non usarlo perchè da solo problemi  ogni volta che lo includo, uso jquery


    $.ajax({
        type: 'GET',
        url: 'php/retrieve.php',
        dataType: "json",
        id: '10',
        success: function (data) {

            data.forEach(element => {
                var model = element.model;
                var description = element.description;
                var price = element.price;
                var image = element.image;
                var code = ' <div class ="product-slide">   <figure class="block-4-image">' +
                    '   <a href="shop-single.html"><img src="' + image + '" alt="Image placeholder" class="img-fluid"></a>' +
                    '   </figure>' +
                    '   <div class="description-and-price">' +
                    '    <h3><a href="shop-single.html">' + model + '</a></h3> ' +
                    '    <p class="description">' + description + '</p> ' +
                    '     <p class="price">$' + price + '</p>' +
                    '    </div> </div>';

                var div = document.createElement("div");
                //div.className("product-slide");
                div.innerHTML = code;
                $(".content-slide").append(code);

            });
        }


    });

}