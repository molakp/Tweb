
jQuery.getScript("https://ajax.googleapis.com/ajax/libs/prototype/1.7.3.0/prototype.js");
$("body").append("<h3> sAca request fuori </h3>");
window.onload = function () {

    new Ajax.Request("php/retrieve.php",
        {
            method: "get",

            onSuccess: showShoes,
            onFailure: ajaxFailed,
            // function shown in previous sections
            onException: ajaxFailed
        }
    );
}

function ajaxFailed(ajax, exception) {
    alert("Error making Ajax request:" + "\n\nServer status:\n" +
        ajax.status + " " + ajax.statusText +
        "\n\nServer response text:\n" + ajax.responseText + "\n\n Exception: \n"+exception);
    if (exception) {
        throw exception;
    }
}

function showShoes(ajax) {

    var data = JSON.parse(ajax.responseText);



    // clear the list of schoes
    /*  while ($("content").firstChild) {
          $("content").removeChild($("content").firstChild);
      } */

    // add all shoes from the JSON to the content div
  

      alert(data[0]);
    console.log(data[0].brand);
    data.forEach(element => {
        console.log(element);

    });


    var image = data[0].image;
    var name = data[0].name;
    var description = data[0].description;
    var price = data[0].price;

    var div = document.createElement("div");
    div.addClassName("product-slide"); // proptotype method to add class name
    //  $( ".content" ).append("<figure class='block-4-image'> <a href='shop-single.html'><img src="image ,+" alt='Image placeholder' class='img-fluid'></a></figure><div class='description-and-price'> <h3><a href='shop-single.html'>Tank Top</a></h3><p class='description'>Finding perfect t-shirt</p><p class='price'>$50</p></div>");
    var code = '    <figure class="block-4-image">' +
        '   <a href="shop-single.html"><img src="' + data.images + '" alt="Image placeholder" class="img-fluid"></a>' +
        '   </figure>' +
        '   <div class="description-and-price">' +
        '    <h3><a href="shop-single.html">' + data.model + '</a></h3> ' +
        '    <p class="description">' + data.description + '</p> ' +
        '     <p class="price">$' + data.price + '</p>' +
        '    </div>';

    var div = document.createElement("div");
    div.innerHTML = code;
    //div.onclick = categoryClick;
    $("content").appendChild(div);

//    $("#content").append(prova);
  //  $("#content").appendChild("<h3> suca </h3>");
    //alert(code);
}
