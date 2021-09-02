(function ($) {
  "use strict";
  /*==================================================================
        [ Daterangepicker ]*/
  try {
    $(".js-datepicker").daterangepicker({
      singleDatePicker: true,
      showDropdowns: true,
      autoUpdateInput: false,
      locale: {
        format: "DD/MM/YYYY",
      },
    });

    var myCalendar = $(".js-datepicker");
    var isClick = 0;

    $(window).on("click", function () {
      isClick = 0;
    });

    $(myCalendar).on("apply.daterangepicker", function (ev, picker) {
      isClick = 0;
      $(this).val(picker.startDate.format("DD/MM/YYYY"));
    });

    $(".js-btn-calendar").on("click", function (e) {
      e.stopPropagation();

      if (isClick === 1) isClick = 0;
      else if (isClick === 0) isClick = 1;

      if (isClick === 1) {
        myCalendar.focus();
      }
    });

    $(myCalendar).on("click", function (e) {
      e.stopPropagation();
      isClick = 1;
    });

    $(".daterangepicker").on("click", function (e) {
      e.stopPropagation();
    });
  } catch (er) {
    console.log(er);
  }
  /*[ Select 2 Config ]
        ===========================================================*/

  try {
    var selectSimple = $(".js-select-simple");

    selectSimple.each(function () {
      var that = $(this);
      var selectBox = that.find("select");
      var selectDropdown = that.find(".select-dropdown");
      selectBox.select2({
        dropdownParent: selectDropdown,
      });
    });
  } catch (err) {
    console.log(err);
  }

  /*[ File Input Config ]
        ===========================================================*/

  try {
    var file_input_container = $(".js-input-file");

    if (file_input_container[0]) {
      file_input_container.each(function () {
        var that = $(this);

        var fileInput = that.find(".input-file");
        var info = that.find(".input-file__info");

        fileInput.on("change", function () {
          var fileName;
          fileName = $(this).val();

          if (fileName.substring(3, 11) == "fakepath") {
            fileName = fileName.substring(12);
          }

          if (fileName == "") {
            info.text("No file chosen");
          } else {
            info.text(fileName);
          }
        });
      });
    }
  } catch (e) {
    console.log(e);
  }

  var form = $("#signup-form");
  form.validate({
    errorPlacement: function errorPlacement(error, element) {
      element.before(error);
    },
    rules: {
      email: {
        email: true,
      },
    },
    onfocusout: function (element) {
      $(element).valid();
    },
  });
  form.children("div").steps({
    headerTag: "h3",
    bodyTag: "fieldset",
    transitionEffect: "fade",
    stepsOrientation: "vertical",
    titleTemplate:
      '<div class="title"><span class="step-number">#index#</span><span class="step-text">#title#</span></div>',
    labels: {
      previous: "Previous",
      next: "Next",
      finish: "Finish",
      current: "",
    },
    onStepChanging: function (event, currentIndex, newIndex) {
      if (currentIndex === 0) {
        form
          .parent()
          .parent()
          .parent()
          .append('<div class="footer footer-' + currentIndex + '"></div>');
      }
      if (currentIndex === 1) {
        form
          .parent()
          .parent()
          .parent()
          .find(".footer")
          .removeClass("footer-0")
          .addClass("footer-" + currentIndex + "");
      }
      if (currentIndex === 2) {
        form
          .parent()
          .parent()
          .parent()
          .find(".footer")
          .removeClass("footer-1")
          .addClass("footer-" + currentIndex + "");
      }
      if (currentIndex === 3) {
        form
          .parent()
          .parent()
          .parent()
          .find(".footer")
          .removeClass("footer-2")
          .addClass("footer-" + currentIndex + "");
      }
      // if(currentIndex === 4) {
      //     form.parent().parent().parent().append('<div class="footer" style="height:752px;"></div>');
      // }
      form.validate().settings.ignore = ":disabled,:hidden";
      return form.valid();
    },
    onFinishing: function (event, currentIndex) {
      form.validate().settings.ignore = ":disabled";
      return form.valid();
    },
    onFinished: function (event, currentIndex) {
      alert("Submited");
    },
    onStepChanged: function (event, currentIndex, priorIndex) {
      return true;
    },
  });

  jQuery.extend(jQuery.validator.messages, {
    required: "",
    remote: "",
    email: "",
    url: "",
    date: "",
    dateISO: "",
    number: "",
    digits: "",
    creditcard: "",
    equalTo: "",
  });

  $.dobPicker({
    daySelector: "#birth_date",
    monthSelector: "#birth_month",
    yearSelector: "#birth_year",
    dayDefault: "",
    monthDefault: "",
    yearDefault: "",
    minimumAge: 0,
    maximumAge: 120,
  });
  var marginSlider = document.getElementById("slider-margin");
  if (marginSlider != undefined) {
    noUiSlider.create(marginSlider, {
      start: [1100],
      step: 100,
      connect: [true, false],
      tooltips: [true],
      range: {
        min: 100,
        max: 2000,
      },
      pips: {
        mode: "values",
        values: [100, 2000],
        density: 4,
      },
      format: wNumb({
        decimals: 0,
        thousand: "",
        prefix: "$ ",
      }),
    });
    var marginMin = document.getElementById("value-lower"),
      marginMax = document.getElementById("value-upper");

    marginSlider.noUiSlider.on("update", function (values, handle) {
      if (handle) {
        marginMax.innerHTML = values[handle];
      } else {
        marginMin.innerHTML = values[handle];
      }
    });
  }
})(jQuery);
