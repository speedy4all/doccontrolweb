$(window).on('load', function(){
    YUI().use('calendar', 'datatype-date', 'cssbutton',  function(Y) {

        // Create a new instance of calendar, placing it in
        // #mycalendar container, setting its width to 340px,
        // the flags for showing previous and next month's
        // dates in available empty cells to true, and setting
        // the date to today's date.
        var calendar = new Y.Calendar({
          contentBox: "#mycalendar",
          width:'340px',
          showPrevMonth: true,
          showNextMonth: true,
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
          sessionStorage.setItem('key', newDate);
          calendar.hide();
          
          // Format the date and output it to a DOM
          // element.
         // console.log(dtdate.format(newDate));
        });
        
        
        });
    
    

});

function initializeMap() {
    var mapProp= {
    center:new google.maps.LatLng(31.508742,-0.120850),
    zoom:5,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
}
function data(){
    let data = sessionStorage.getItem('key');
    console.log(data);
}
