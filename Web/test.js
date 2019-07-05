var calendar;
let selectedDate;
var lalt =0;
var long =0;
var specialitate;
const hours = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00"];
const docdetails = doctor => {
    const { company ,name, about, phone, picture, id, index, email, specialty, education, experience , facebook, instagram, twitter} = doctor;
    specialitate=specialty;
    const containerlateralprez = $('#doctor-lateral-prez');
    const containerlateralcontact = $('#doctor-lateral-contact');
    const containerschooltable = $('#doctor-school-table');
    const containerexperiencetable = $('#doctor-experience-table');
    lalt=doctor.latitude;
    long=doctor.longitude;
    containerlateralprez.append(`
        <img src="${picture}" class="img-thumbnail">
        <div class="hospital-data">
            <h3>${name}</h3>
            <p>${specialty}</p>
            <p>${company}</p>
        </div>
    `);
    containerlateralcontact.append(`
                <p><b>Numar de telefon:${phone}</b></p>
                <p><b>E-mail:${email} </b></p>
                <div style="float:left">
                    <b>Social: </b>
                    <a href="${facebook}"><span class="social fab fa-facebook"></span></a>
                    <a href="${instagram}"><span class="social fab fa-instagram"></span></a>
                    <a href="${twitter}"><span class="social fab fa-twitter"></span></a>
    `);
    containerschooltable.append(`
    ${education.map((element, index) => (`
        <tr>
            <th scope="row">${index + 1}</th>
            <td>${element.period}</td>
            <td>${element.domain}</td>
            <td>${element.place}</td>
        </tr>
    `))} 
    `);
    containerexperiencetable.append(`
    ${experience.map((element, index) =>
        (`
    <tr>
        <th scope="row">${index + 1}</th>
        <td>${element.period}</td>
        <td>${element.domain}</td>
        <td>${element.hospital}</td>
    </tr>
    `))} 
    `);

}/*
const docappoinments = appointments => {

    const containerhours = $(`#doctor-hours`);
    const availableHours = appointments.map(element,index) ;
    console.log(hours);
    for(let i=0;i<14;i++){
        
        
            console.log(availableHours);
            containerhours.append(`
            <tr>
                <td></td>
                <td></td>
            </tr>
        `)
       
    
    }
}*/
const onListClick = id => {
    console.log(`clicked ${id}`);
}

$(window).on('load', function () {

    $(function () {
        $.ajax({
            url: `/doctors/${window.location.search.substring(4)}`, success: function (result) {
                docdetails(result);
            }
        });
        $.ajax({
            url: `/appointments/${window.location.search.substring(4)}`, success: function (result) {
                //  docappoinments(result);
            }
        });
    });




});
YUI().use('calendar', 'datatype-date', 'cssbutton', function (Y) {
    // Create a new instance of calendar, placing it in
    // #mycalendar container, setting its width to 340px,
    // the flags for showing previous and next month's
    // dates in available empty cells to true, and setting
    // the date to today's date.
    
    calendar = new Y.Calendar({
        contentBox: "#mycalendar",
        width: '340px',
        showNextMonth: true,
        multiSelect: true,
        date: new Date()
    }).render();
    // Get a reference to Y.DataType.Date
    var dtdate = Y.DataType.Date;

    // Listen to calendar's selectionChange event.
    calendar.on("selectionChange", function (ev) {

        // Get the date from the list of selected
        // dates returned with the event (since only
        // single selection is enabled by default,
        // we expect there to be only one date)
        var newDate = ev.newSelection[0];
        selectedDate = dtdate.format(newDate);
        calendar.hide();
        ore();
        $('.time-menu').removeClass("hide");
        // Format the date and output it to a DOM
        // element.
        console.log(selectedDate);

    });
});
$(window).on('load', function () {

   
    $('.owl-carousel').owlCarousel({
        loop: true,
        dots: false,
        margin: 10,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 5
            }

        }

    })


});
function verif(date, hour) {
    if (selectedDate === date) {
        const avHours = hours.filter(v => v !== hour);
        const containerhours = $(`#doctor-hours`);
        avHours.map(h => {
            containerhours.append(`
            <tr>
                <td>${h}</td>
                <td><button class="btn btn-small btn-primary">Select</button></td>
            </tr>
        `);
        });
        
    }
}
function ore() {
    $.ajax({
        url: `/appointments/${window.location.search.substring(4)}`, success: function (result) {
            result.map(element => verif(element.date, element.hour));
        }
    });
}

function schimbare() {
    calendar.show();
    $('.time-menu').addClass("hide");
}
function myMap() {
    console.log(lalt);
    console.log(long);
    var mapProp= {
      center:new google.maps.LatLng(lalt,long),
      zoom:5,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
    }