

$(document).ready(

    function () {
        //jQuery.getScript("https://ajax.googleapis.com/ajax/libs/prototype/1.7.3.0/prototype.js"); meglio non usarlo perchè da solo problemi  ogni volta che lo includo, uso jquery
        /* $("body").append("<h3> sAca request fuori </h3>");
         $("#top").load("top.html"); //jQuery instruction to load an html file into a target container
         $("#content").load("content.html");
         $("#footer").load("footer.html"); */

        $.ajax({
            type: 'GET',
            url: 'php/retrieve.php',
            dataType: "json",
            number: '10',
            success: function (data) {

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
       /* $.get("demo_test.asp", function(data, status){
            alert("Data: " + data + "\nStatus: " + status);
          });
        $.done(showShoes()); */

        /*new Ajax.Request("php/retrieve.php",
            {
                method: "get",
    
                onSuccess: showShoes,
                onFailure: ajaxFailed,
                // function shown in previous sections
                onException: ajaxFailed
            }
        );
    */ }

)




function ajaxFailed(ajax, exception) {
    alert("Error making Ajax request:" + "\n\nServer status:\n" +
        ajax.status + " " + ajax.statusText +
        "\n\nServer response text:\n" + ajax.responseText + "\n\n Exception: \n" + exception);
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


    //alert(data[0]);
    /*console.log(data[0].brand);
    data.forEach(element => {
        console.log(element);

    }); */


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
    //div.className("product-")
    div.innerHTML = code;
    //div.onclick = categoryClick;
    //$("content").appendChild(div);

    //    $("#content").append(prova);
    //  $("#content").appendChild("<h3> suca </h3>");
    alert(code);
} 
