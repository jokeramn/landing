$(document).ready(function () {
  $('.menu-accord__preview').click(function () {
    const parent = $(this).parent();

    if (parent.hasClass('menu-accord__item--active')) {
      parent.removeClass('menu-accord__item--active');
    } else {
        $('.menu-accord__item').removeClass('menu-accord__item--active');
        parent.addClass('menu-accord__item--active');
    }
  });
});