const mesureWidth = (item) => {
  let reqItemWidth = 0;
  const screenWidth = $(window).width();
  const container = item.closest('.menu-accord__list');
  const previewBlocks = container.find('.menu-accord__preview');
  const previewWidth =previewBlocks.width() * previewBlocks.length;

  const textContainer = item.find('.menu-accord__text');
  const paddingLeft = parseInt(textContainer.css("padding-left"));
  const paddingRight = parseInt(textContainer.css("padding-right"));

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  if(isMobile) {
    reqItemWidth = screenWidth - previewWidth;
  } else {
    reqItemWidth = 400;
  }

  return {
    container: reqItemWidth,
    textContainer: reqItemWidth - paddingRight - paddingLeft
  };
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
  const textBlock = item.find('.menu-accord__text');

  item.addClass('menu-accord__item--active');
  hiddenContent.width(reqWidth.container);
  textBlock.width(reqWidth.textContainer);
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