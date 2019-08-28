


/**
 * 
 *   funzione per recuperare parametro id da url html, funziona anche per parametri multipli
 *
 * @returns
 */
function getSearchParameters() {
    var prmstr = window.location.search.substr(1);
    return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
}

/**
 * Works with getSearchParameters
 *
 * @param {*} prmstr
 * @returns params array of data
 */
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
type="%00";
gender="%00";
if(params["type"]){
    if(checkUrl(params["type"])){
         type = params["type"];
         //alert("Type is: "+type);
    }
     

}
if (params["gender"]){
    if(checkUrl){
        gender= params["gender"];
       // alert("gender is:"+gender);
    }
     
}
getItem(); 



/**
 * make ajax request to server and show the result in html  
 *
 */
function getItem () {
    //jQuery.getScript("https://ajax.googleapis.com/ajax/libs/prototype/1.7.3.0/prototype.js"); meglio non usarlo perchè da solo problemi  ogni volta che lo includo, uso jquery
    var siteurl= "php/category.php?gender="+gender+"&type="+type;

    $.ajax({
        type: 'GET',
        url: siteurl,
        dataType: "json",
        
        success: function (data) {
            //alert(data);
            data.forEach(element => {
                var id=element.id;
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
                    '    </div> </div>';

                var div = document.createElement("div");
                //div.className("product-slide");
                div.innerHTML = code;
                $(".content-slide").append(code);
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
                                       /* $(".description-and-price-expanded ").empty();
                                        var code = '<img src=images/added-to-cart.png alt="Item added to cart!" class="img-added-to-cart"> <p class="already-logged-in">Item added to cart!</p>';
                                        $(".description-and-price-expanded ").append(code); */
                                        ui.draggable.empty();
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

/**
 *
 * check url against regex
 * @param {*} url
 * @returns
 */
function checkUrl(url){
    if(url.match(/^[0-9a-zA-Z]{1,16}$/)){
       return true;
    }
    else{
       return false;
    }

}