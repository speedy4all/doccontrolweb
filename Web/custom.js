var $meds = $('#meds'); // cache 
setInterval(function () {
     var value = parseInt($meds.html());
     value++;
     $meds.html(value);
     if(value==356)
     {
         clearInterval(setInterval());
     }
}, 100);
var $users = $('#users'); // cache 
setInterval(function () {
     var value2= parseInt($users.html());
     value2++;
     $users.html(value2);
     if(value2==656)
     {
         clearInterval(setInterval());
     }
}, 55);

function newpage(x){
    window.open(`/search_result.html?id=${x}`, "_self");
}