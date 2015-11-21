

  //  Foundation reactive features for small media.
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
    
  // Configuration for Slick Carousel. 
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

  // UUID generator, thanks to http://jsfiddle.net/briguy37/2mvfd/
  function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
  };
 