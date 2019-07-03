
	if(window.innerWidth <= 983)
				$('.filter-content').removeClass("show");
				else
						$('.filter-content').addClass("show");
					$(window).resize(function() 
					{
						if ($(window).width() <= 983) 
							$('.filter-content').removeClass("show");
						else
							$('.filter-content').addClass("show");
				});

				