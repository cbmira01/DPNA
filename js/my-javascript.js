

//  Foundation reactive features for small media
			$(window).on("load resize",function(e) {
				var isSmallMedia = Foundation.utils.is_small_only();
				var dpnaElement = document.getElementById("dpnaText");
				if ( isSmallMedia ) {
					dpnaElement.innerHTML = "DPNA";
					$(document).foundation({
						equalizer : { equalize_on_stack: false }
					});
				} else {
					dpnaElement.innerHTML = "Deer Park Neighborhood Association";
					$(document).foundation({
						equalizer : { equalize_on_stack: true }
					});
				}
			});  //end on-resize
    
// Action support for Slick Carousel   
      $(document).ready(function(){
        $('.featureCarousel').slick({
					accessibility: true,
          dots: false,
          infinite: true,
          autoplay: true,
          autoplayspeed: 3000,
          fade: true,
          cssEase: 'linear'
        });
      });    
