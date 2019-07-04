var calendar;
const showDetails = doctor => {
    const container = $('#doctor');
    const containercalendar=$('beforeGoogle')
    const { name, about, phone, picture, id, index, email, specialty, education, experience } = doctor;

    container.append(`
    <div class="row"> <!--LATERAL MENU-->
    <div class= " lateral-menu">
        <div class="card">
            <img src="${picture}" class="img-thumbnail">
            <div class="hospital-data">
                <h3>${name}</h3>
                <p>${specialty}</p>
                <p >NUMELE SPITALULUI</p>
            </div>
        </div>
                <div class="card" id="beforeGoogle">
                    <h3>Informatii Personale</h3>
                    <p><b>Numar de telefon: </b>${phone}</p>
                    <p><b>E-mail: </b>${email}</p>
                    <div style="float:left">
                        <b>Social: </b>
                        <span class="social fab fa-facebook"></span>
                        <span class="social fab fa-instagram"></span>
                        <span class="social fab fa-twitter"></span>
                    </div>
                </div>
                `);
                container.append(`  
    </div>
<div class="col-xs-12 col-sm-12 col-md-12 col-lg-8">
<div class="card card-right">
    <h3>Despre mine:</h3>
    <p>${about}</p>
    <h3>Educatie: </h3>
        <table class="table">
                <thead>
                  <tr><!--STATIC-->
                    <th scope="col">#</th>
                    <th scope="col">An</th>
                    <th scope="col">Domeniu</th>
                    <th scope="col">Facultate</th>
                  </tr>
                </thead>
                <tbody>
                 ${education.map((element, index) =>

        (`<tr>
            <th scope="row">${index + 1}</th>
            <td>${element.period}</td>
            <td>${element.domain}</td>
            <td>${element.place}</td>
        </tr>`)
    )}
                </tbody>
              </table>
    <br>
    <h3>Experienta :</h3>
    <table class="table">
            <thead>
              <tr><!--STATIC-->
                <th scope="col">#</th>
                <th scope="col">An</th>
                <th scope="col">Domeniu</th>
                <th scope="col">Facultate</th>
              </tr>
            </thead>
            <tbody>
            ${experience.map((element, index) =>

        (`<tr>
            <th scope="row">${index + 1}</th>
            <td>${element.period}</td>
            <td>${element.domain}</td>
            <td>${element.hospital}</td>
        </tr>`)
    )}
            </tbody>
          </table>`);
          containercalendar.appendChild(`
    <h3>Selectati data si ora programarii: </h3>
    <div id="demo" class="yui3-skin-sam yui3-g calendar"> <!-- You need this skin class -->
        <div id="leftcolumn" class="yui3-u">
           <!-- Container for the calendar -->
           <div id="mycalendar"></div>
        </div>
        <div id="rightcolumn" class="yui3-u">
         <div id="links" style="padding-left:20px;">
         </div>
        </div>
    </div>
    <div class="time-menu hide">
        <h3>Selectati ora programarii: </h3>
        <div class="row color-bar-1"> <!--STATIC---->
            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                <p>Ora</p>
            </div>
        </div>
        <div class="row color-bar-2"> <!--DINAMIC-->
            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                <p>12:30</p>
            </div>
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <button class="btn btn-outline-primary">Rezervare</button>
            </div>
        </div>
        <div class="row color-bar-1"> <!--DINAMIC-->
            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                <p>13:00</p>
            </div>
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <button class="btn btn-outline-primary">Rezervare</button>
            </div>
        </div>
        <div class="row">
            <button id="data-change" class="btn btn-outline-primary flex-fill" onclick="schimbare()">SCHIMBATI DATA</button>
        </div>
    </div>
    
    `);
    container.append(`
    <h3>Inca nemultumit? Optati pentru medici similari:</h3>
        <div class="row container">
            <div class="owl-carousel owl-theme">
                    <div class="item">
                        <figure class="card card-product">
                            <div class="img-wrap"> <img src="https://www.radiustheme.com/demo/html/medilink/medilink/img/team/team20.png" class="img-thumbnail"></div>
                            <figcaption class="info-wrap"style="text-align: center">
                            <a href="#" class="title">Medic 1</a>
                            <div class="action-wrap">
                                <div class="price-wrap h5" style="text-align: center">
                                <span class="price-new">RATING</span>
                                </div> 
                            </div> 
                            </figcaption>
                        </figure>
                    </div>
                    <div class="item">
                        <figure class="card card-product">
                            <div class="img-wrap"> <img src="https://www.radiustheme.com/demo/html/medilink/medilink/img/team/team20.png" class="img-thumbnail"></div>
                            <figcaption class="info-wrap"style="text-align: center">
                            <a href="#" class="title">Medic 2</a>
                            <div class="action-wrap">
                                <div class="price-wrap h5" style="text-align: center">
                                <span class="price-new">RATING</span>
                                </div> 
                            </div> 
                            </figcaption>
                        </figure>
                    </div>
                    <div class="item">
                            <figure class="card card-product">
                                <div class="img-wrap"> <img src="https://www.radiustheme.com/demo/html/medilink/medilink/img/team/team20.png" class="img-thumbnail"></div>
                                <figcaption class="info-wrap"style="text-align: center">
                                <a href="#" class="title">Medic 3</a>
                                <div class="action-wrap">
                                    <div class="price-wrap h5" style="text-align: center">
                                    <span class="price-new">RATING</span>
                                    </div> 
                                </div> 
                                </figcaption>
                            </figure>
                    </div>
                    <div class="item">
                            <figure class="card card-product">
                                <div class="img-wrap"> <img src="https://www.radiustheme.com/demo/html/medilink/medilink/img/team/team20.png" class="img-thumbnail"></div>
                                <figcaption class="info-wrap"style="text-align: center">
                                <a href="#" class="title">Medic 4</a>
                                <div class="action-wrap">
                                    <div class="price-wrap h5" style="text-align: center">
                                    <span class="price-new">RATING</span>
                                    </div> 
                                </div> 
                                </figcaption>
                            </figure>
                    </div>
                    <div class="item">
                            <figure class="card card-product">
                                <div class="img-wrap"> <img src="https://www.radiustheme.com/demo/html/medilink/medilink/img/team/team20.png" class="img-thumbnail"></div>
                                <figcaption class="info-wrap"style="text-align: center">
                                <a href="#" class="title">Medic 5</a>
                                <div class="action-wrap">
                                    <div class="price-wrap h5" style="text-align: center">
                                    <span class="price-new">RATING</span>
                                    </div> 
                                </div> 
                                </figcaption>
                            </figure>
                    </div>
                    <div class="item">
                            <figure class="card card-product">
                                <div class="img-wrap"> <img src="https://www.radiustheme.com/demo/html/medilink/medilink/img/team/team20.png" class="img-thumbnail"></div>
                                <figcaption class="info-wrap"style="text-align: center">
                                <a href="#" class="title">Medic 6   </a>
                                <div class="action-wrap">
                                    <div class="price-wrap h5" style="text-align: center">
                                    <span class="price-new">RATING</span>
                                    </div> 
                                </div> 
                                </figcaption>
                            </figure>
                    </div>
                </div>
            </div>
</div>
</div>
</div>
    `);
    /*
    containerMaps.append(`
    <div class="card">
            <div id="googleMap" style="width:100%;height:400px !important;"></div>
    </div>`);*/

}

const onListClick = id => {
    console.log(`clicked ${id}`);
}

$(window).on('load', function () {

    $(function () {
        $.ajax({
            url: `/doctors/${window.location.search.substring(4)}`, success: function (result) {
                showDetails(result);
            }
        });
    });


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