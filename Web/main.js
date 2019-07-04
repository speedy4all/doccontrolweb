var calendar;
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

YUI().use('calendar', 'datatype-date', 'cssbutton',  function(Y) {
    // Create a new instance of calendar, placing it in
    // #mycalendar container, setting its width to 340px,
    // the flags for showing previous and next month's
    // dates in available empty cells to true, and setting
    // the date to today's date.
   
    calendar= new Y.Calendar({
      contentBox: "#mycalendar",
      width:'340px',
      showNextMonth: true,
      multiSelect: true,
      date: new Date()}).render();
    // Get a reference to Y.DataType.Date
    var dtdate = Y.DataType.Date;
    
    // Listen to calendar's selectionChange event.
    calendar.on("selectionChange", function (ev) {
    
      // Get the date from the list of selected
      // dates returned with the event (since only
      // single selection is enabled by default,
      // we expect there to be only one date)
      var newDate = ev.newSelection[0];
      newDate=dtdate.format(newDate);
      calendar.hide();
      $('.time-menu').removeClass("hide");
      // Format the date and output it to a DOM
      // element.
      console.log(dtdate.format(newDate));
      
    });
    });
    
function schimbare(){
calendar.show();
$('.time-menu').addClass("hide");
}