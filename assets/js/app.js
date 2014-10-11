(function ($) {
    "use strict";

    $(document).ready(function () {
        var aboutActive = false;
        var lastPosition = 0;

        var toggleAbout = function () {
            if (!aboutActive) {
                $(this).prepend($('<i class="fa fa-fw fa-times" style="display: none;"></i>').show('slow'));

                // $(document) seems to be the only reliable solution to read the scroll position
                // but not to navigate to
                lastPosition = $(document).scrollTop();
                $("html, body").animate({ scrollTop: 0 }, "slow");
            } else {
                $(this).children('i').hide('slow', function(){
                    $(this).remove();
                });
                $("html, body").animate({ scrollTop: lastPosition }, "slow");
            }
            $('#site-wrapper').toggleClass("show-about-canvas");
            aboutActive = !aboutActive;
        }

        var fixContentPanelSize = function() {
            var offset = $(".blog").offset().top;
            var height = $(window).height();
            var footerHeight = 0; //$("#footer").outerHeight(true);
            $(".blog").css({ minHeight: height - offset - footerHeight });
        }

        $('#about-canvas').show();
        $('.nav-about').click(toggleAbout);

        fixContentPanelSize();

        $(window).resize(function () {
            fixContentPanelSize();
        });

        $(document).ajaxSuccess(function () {
            fixContentPanelSize();
        });
    });
}(jQuery));