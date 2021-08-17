$(document).ready(function () {
    const $app = $('.app');
    const $img = $('.app__img');
    const $pageNav1 = $('.pages__item--1');
    const $pageNav2 = $('.pages__item--2');
    let animation = true;
    let curSlide = 1;
    let scrolledUp, nextSlide;

    let pagination = function (slide, target) {
      animation = true;
      if (target === undefined) {
        nextSlide = scrolledUp ? slide - 1 : slide + 1;
      } else {
        nextSlide = target;
      }

      $('.pages__item--' + nextSlide).addClass('page__item-active');
      $('.pages__item--' + slide).removeClass('page__item-active');

      $app.toggleClass('active');
      setTimeout(function () {
        animation = false;
      }, 3000);
    };

    let navigateDown = function () {
      if (curSlide > 1) return;
      scrolledUp = false;
      pagination(curSlide);
      curSlide++;
    };

    let navigateUp = function () {
      if (curSlide === 1) return;
      scrolledUp = true;
      pagination(curSlide);
      curSlide--;
    };

    setTimeout(function () {
      $app.addClass('initial');
    }, 1500);

    setTimeout(function () {
      animation = false;
    }, 4500);

    $(document).on('mousewheel DOMMouseScroll', function (e) {
      var delta = e.originalEvent.wheelDelta;
      if (animation) return;
      if (delta > 0 || e.originalEvent.detail < 0) {
        navigateUp();
      } else {
        navigateDown();
      }
    });

    $(document).on("click", ".pages__item:not(.page__item-active)", function () {
      if (animation) return;
      let target = +$(this).attr('data-target');
      pagination(curSlide, target);
      curSlide = target;
    });
  });
  //# sourceURL=pen.js
  (function ($) {// Begin jQuery
$(function () {// DOM ready
  // If a link has a dropdown, add sub menu toggle.
  $('nav ul li a:not(:only-child)').click(function (e) {
    $(this).siblings('.nav-dropdown').toggle();
    // Close one dropdown when selecting another
    $('.nav-dropdown').not($(this).siblings()).hide();
    e.stopPropagation();
  });
  // Clicking away from dropdown will remove the dropdown class
  $('html').click(function () {
    $('.nav-dropdown').hide();
  });
  // Toggle open and close nav styles on click
  $('#nav-toggle').click(function () {
    $('nav ul').slideToggle();
  });
  // Hamburger to X toggle
  $('#nav-toggle').on('click', function () {
    this.classList.toggle('active');
  });
}); // end DOM ready
})(jQuery); // end jQuery
//# sourceURL=pen.js

$(document).ready(function () {
    // Main variables
    var $aboutTitle = $('.about-myself .content h2');
    var $developmentWrapper = $('.development-wrapper');
    var developmentIsVisible = false;
    $('.hero .content .header').delay(500).animate({
        'opacity': '1',
        'top': '50%'
      },
      1000);


    $(window).scroll(function () {

      var bottom_of_window = $(window).scrollTop() + $(window).height();

      /* ##### ABOUT MYSELF SECTION #### */
      if (bottom_of_window > $aboutTitle.offset().top + $aboutTitle.outerHeight()) {
        $('.about-myself .content h2').addClass('aboutTitleVisible');
      }
      /* ##### EXPERIENCE SECTION #### */

      // Check the location of each element hidden */
      $('.experience .content .hidden').each(function (i) {

        var bottom_of_object = $(this).offset().top + $(this).outerHeight();

        /* If the object is completely visible in the window, fadeIn it */
        if (bottom_of_window > bottom_of_object) {

          $(this).animate({
              'opacity': '1',
              'margin-left': '0'
            },
            600);
        }
      });

      /*###### SKILLS SECTION ######*/

      var middle_of_developmentWrapper = $developmentWrapper.offset().top + $developmentWrapper
      .outerHeight() / 2;

      if (bottom_of_window > middle_of_developmentWrapper && developmentIsVisible == false) {

        $('.skills-bar-container li').each(function () {

          var $barContainer = $(this).find('.bar-container');
          var dataPercent = parseInt($barContainer.data('percent'));
          var elem = $(this).find('.progressbar');
          var percent = $(this).find('.percent');
          var width = 0;

          var id = setInterval(frame, 15);

          function frame() {
            if (width >= dataPercent) {
              clearInterval(id);
            } else {
              width++;
              elem.css("width", width + "%");
              percent.html(width + " %");
            }
          }
        });
        developmentIsVisible = true;
      }
    }); // -- End window scroll --
  });
  //# sourceURL=pen.js

  
var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 100) || 4000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 150 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 1000;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #F26921 }";
  document.body.appendChild(css);
};
