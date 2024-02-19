/*--------------------------------------------------------------------------------*/
/*                        Clearing the Clipboard 
/*   (so even if, the user press Ctrl + C, nothing is copied into the clipboard)
/*--------------------------------------------------------------------------------
    function clearData(){
        window.clipboardData.setData('text','') 
    }
    function cldata(){
        if(clipboardData){
            clipboardData.clearData();
        }
    }
    setInterval("cldata();", 1000);*/



/*----------------------------------*/
/*      Always Start Body From Top If It IS Refresh
/*----------------------------------*/

$(window).unload(function() {
    $('body').scrollTop(0);
});


/*----------------------------------*/
/*      Adding classes to lists
/*----------------------------------*/

$(document).ready(function() {
    $("ul > li:nth-child(even)").addClass("even");
    $("ul > li:nth-child(odd)").addClass("odd");
    $("ul li:first-child").addClass("first-child");
    $("ul li:last-child").addClass("last-child");
});

// Flex Slider
$(window).load(function() {
    $('.flexslider').flexslider({
        animation: "fade"
    });
    $('#homeslider').flexslider({
        animation: "fade"
    });
});


/*
-----------------------
-----------------------
    prettyPhoto
-----------------------
----------------------- */
$(document).ready(function() {
    $("a[data-rel^='prettyPhoto']").prettyPhoto({
        deeplinking: false,
        default_width: 600,
        default_height: 400,
        overlay_gallery: false
    });

    $("a[data-rel^='gallerySitemap']").prettyPhoto({
        deeplinking: false,
        default_width: 600,
        default_height: 400,
        overlay_gallery: false
    });

    $("a[data-rel^='vtours']").prettyPhoto({
        deeplinking: false,
        default_width: 640,
        default_height: 485,
        overlay_gallery: false
    });

    $("a[data-rel^='zoomImages']").prettyPhoto({
        deeplinking: false,
        default_width: 640,
        default_height: 485,
        overlay_gallery: false
    });

    $("a[data-rel^='button-zoomImages']").prettyPhoto({
        deeplinking: false,
        default_width: 640,
        default_height: 445,
        overlay_gallery: false
    });

    $("a[data-rel^='hanger-zoomImages']").prettyPhoto({
        deeplinking: false,
        default_width: 690,
        default_height: 523,
        overlay_gallery: false
    });

    $("a[data-rel^='gallery']").prettyPhoto({
        deeplinking: false,
        overlay_gallery: false
    });
});





/*
    -----------------------
    -----------------------
        Form Validation with jQuery VAlidator
    -----------------------
    -----------------------

  $().ready(function() {
    // validate the comment form when it is submitted
    $("#contact-us").validate();
  });
    */

/****
div coming effect
****/

$(document).ready(function() {
    //$('.effect-container').css('display','none');

    // $('.effect-container').hide().fadeIn(1000);

});

/****
div coming effect end
****/

/*
-----------------------
-----------------------
  Teachers Grid View debouncedresize | Admin.php page
-----------------------
-----------------------
*/
$(function() {
    Grid.init();
});