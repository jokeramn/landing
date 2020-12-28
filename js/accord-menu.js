const mesureWidth = (item) => {
  const screenWidth = $(window).width();
  const container = item.closest('.menu-accord__list');
  const previewBlocks = container.find('.menu-accord__preview');
  const previewWidth =previewBlocks.width() * previewBlocks.length;

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  if(isMobile) {
    return screenWidth - previewWidth;
  } else {
    return 400;
  }

  
};

const closeEveryItemInContainer = container => {
  const items = container.find('.menu-accord__item');
  const content = container.find('.menu-accord__text');

  items.removeClass('menu-accord__item--active');
  content.width(0);
};

const opensItem = item => {
  const hiddenContent = item.find('.menu-accord__text');
  const reqWidth = mesureWidth(item);
  item.addClass('menu-accord__item--active');
  hiddenContent.width(reqWidth);
};

$('.menu-accord__preview').on('click', e =>{
  e.preventDefault();

  const $this = $(e.currentTarget);
  const item = $this.closest('.menu-accord__item');
  const itemOpened = item.hasClass('menu-accord__item--active');
  const container = $this.closest('.menu-accord__list');

  if (itemOpened) {
    closeEveryItemInContainer(container);
  } else {
    closeEveryItemInContainer(container);
    opensItem(item);
  }
});