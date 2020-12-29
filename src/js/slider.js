const slider = $('.sliders__list').bxSlider({
  pager: false,
  controls: false
});

$('.slider-arrow--left').click(e => {
  e.preventDefault()
  slider.goToPrevSlide()
})

$('.slider-arrow--right').click(e => {
  e.preventDefault()
  slider.goToNextSlide()
})