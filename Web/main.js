
$(window).on('load', function(){
      
      $('.owl-carousel').owlCarousel({
        loop:true,
        dots:false,
        margin:10,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1000:{
                items:5
            }
    
        }
    
    })
    
});

function initializeMap() {
    var mapProp= {
    center:new google.maps.LatLng(31.508742,-0.120850),
    zoom:5,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
}