
const processLine = doctor => {
	const container = $('#doctorList');

	const { name, about, phone, picture, id, index } = doctor;
	container.append(`
	<li class="list-group-item" onclick="onListClick('${id}')">
          <div class="media align-items-lg-center flex-column flex-lg-row p-3">
            <div class="media-body order-2 order-lg-1">
              <h5 class="mt-0 font-weight-bold mb-2" id="name_sr">${name}</h5>
              <p class="font-italic text-muted mb-0 small" id="div1">${about}</p>
              <div class="d-flex align-items-center justify-content-between mt-1">
                <h6 class="font-weight-bold my-2">${phone}</h6>
				<ul class="list-inline small">
				  <li class="list-inline-item m-0"><p>${index}</p></li>
                  <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
                </ul>
              </div>
            </div><img src="${picture}" alt="${name}" width="200" class="ml-lg-5 order-1 order-lg-2"></a>
          </div>
        </li>`);
}

const onListClick = id => {
	console.log(`clicked ${id}`);
	window.open(`/profile_pageCopy.html?id=${id}`, "_self");
}

$(window).on('load', function () {

	$(function () {
		$.ajax({
			url: "/doctors", success: function (result) {
				result.forEach(processLine);

			}
		});
	});

	
});
if (window.innerWidth <= 983)
	$('.filter-content').removeClass("show");
else
	$('.filter-content').addClass("show");
$(window).resize(function () {
	if ($(window).width() <= 983)
		$('.filter-content').removeClass("show");
	else
		$('.filter-content').addClass("show");
});

