const slider = tns({
  container: ".carousel__inner",
  items: 1,
  slideBy: "page",
  autoplay: false,
  controls: false,
  nav: false,
  responsive: {
    768: {
      edgePadding: 20,
      gutter: 20,
      items: 1,
    },
  },
});

document.querySelector(".prev").addEventListener("click", function () {
  slider.goTo("prev");
});

document.querySelector(".next").addEventListener("click", function () {
  slider.goTo("next");
});

$("[data-modal=consultation]").on("click", function () {
  $(".overlay, #consultation").fadeIn("slow");
});
$(".modal__close").on("click", function () {
  $(".overlay, #consultation, #order, #thanks").fadeOut("slow");
});

$(".button_mini").each(function (i) {
  $(this).on("click", function () {
    $("#order .modal__descr").text($(".catalog-item__subtitle").eq(i).text());
    $(".overlay, #order").fadeIn("slow");
  });
});

function validateForms(form) {
  $(form).validate({
    rules: {
      name: "required",
      phone: "required",
      email: {
        required: true,
        email: true,
      },
    },
    messages: {
      name: "Пожалуйста, введите свое имя",
      phone: "Пожалуйста, введите номер телефона",
      email: {
        required: "Пожалуйста, введите свой email",
        email: "Неправильно введен адрес почты",
      },
    },
  });
}

validateForms("#consultation-form");
validateForms("#consultation form");
validateForms("#order form");

$("input[name=phone]").mask("+999 (999) 999-999");

$("form").submit(function (e) {
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: "mailer/smart.php",
    data: $(this).serialize(),
  }).done(function () {
    $(this).find("input").val("");
    $("#consultation, #order").fadeOut();
    $(".overlay, #thanks").fadeIn("slow");
    $("form").trigger("reset");
  });
  return false;
});

$(window).scroll(function () {
  if ($(this).scrollTop() > 1600) {
    $(".pageup").fadeIn();
  } else {
    $(".pageup").fadeOut();
  }
});

$("a[href=#up]").click(function () {
  const _href = $(this).attr("href");
  $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
  return false;
});

new WOW().init();
