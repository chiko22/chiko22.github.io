window.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".header__menu"),
    menuItem = document.querySelectorAll(".header__menu_item"),
    hamburger = document.querySelector(".hamburger");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("hamburger_active");
    menu.classList.toggle("header__menu_active");
  });

  menuItem.forEach((item) => {
    item.addEventListener("click", () => {
      hamburger.classList.toggle("hamburger_active");
      menu.classList.toggle("header__menu_active");
    });
  });
});

const slider = tns({
  container: ".comments__carousel",
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
  $(".overlay, #consultation, #thanks").fadeOut("slow");
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

validateForms("#consultation form");

$("input[name=phone]").mask("+999 (999) 999-999");

$("form").submit(function (e) {
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: "mailer/smart.php",
    data: $(this).serialize(),
  }).done(function () {
    $(this).find("input").val("");
    $("#consultation, #free-consultation, #question-consultation").fadeOut();
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
