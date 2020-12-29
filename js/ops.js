const sections = $('section');
const display = $('.wrapper-content');
const sideMenu = $('.fixed-menu');
const menuItems = sideMenu.find('.fixed-menu__item');

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

let inScroll = false;

sections.first().addClass('section--active');

const countSectionPosition = sectionEq => {
  const position = sectionEq * -100;

  if (isNaN(position)) {
    console.error('Передано не верное значение в countSectionPosition');
    return 0;
  }

  return position;
};

const changeMenuThemeForSection = sectionEq => {
  const currentSection = sections.eq(sectionEq);
  const mentTheme = currentSection.attr('data-theme');
  const activeClass = 'fixed-menu--black';


  if (mentTheme == 'black') {
    sideMenu.addClass(activeClass);
  } else {
    sideMenu.removeClass(activeClass);
  }
};

const resetActiveClassForItem = (items, itemEq, activeClass) => {
  items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
};

const performTransition = sectionEq => {
  if (inScroll) return;

  inScroll = true;

  const position = countSectionPosition(sectionEq);

  changeMenuThemeForSection(sectionEq);

  display.css({
    transform: `translateY(${position}%)`
  });

  resetActiveClassForItem(sections, sectionEq, 'section--active');


  setTimeout(() => {
    inScroll = false;

    resetActiveClassForItem(menuItems, sectionEq, 'fixed-menu__item--active');

  }, 450);
};

const viewportScroller = () => {
  const activeSection = sections.filter('.section--active');
  const nextSection = activeSection.next();
  const prevtSection = activeSection.prev();

  return {
    next() {
      if (nextSection.length) {
        performTransition(nextSection.index());
      }
    },

    prev() {
      if (prevtSection.length) {
        performTransition(prevtSection.index());
      }
    },
  };
};

$(window).on('wheel', e => {
  const deltaY = e.originalEvent.deltaY;
  const scroller = viewportScroller();

  if (deltaY > 0) {
    scroller.next();
  }

  if (deltaY < 0) {
    scroller.prev();
  }
});

$(window).on('keydown', e => {
  const tagName = e.target.tagName.toLowerCase();
  const userTypingInInputs = tagName == 'input' || tagName == 'textarea';
  const scroller = viewportScroller();

  if (userTypingInInputs) return;
  switch (e.keyCode) {
    case 38: //prev
      scroller.prev();
      break;

    case 40: //next

      scroller.next();
      break;
  }
});

$('.wrapper').on('touchmove', e => e.preventDefault());

$('[data-scroll-to]').click(e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr('data-scroll-to');
  const reqSection = $(`[data-section-id=${target}]`);

  performTransition(reqSection.index());
});
if (isMobile) {
///https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
$("body").swipe({
  swipe: function (event, direction) {
    
    const scroller = viewportScroller();
    let scrollDirection = '';

    if (direction == 'up') scrollDirection = 'next';
    if (direction == 'down') scrollDirection = 'prev';

    if (direction == 'left') return;
    if (direction == 'right') return;

    scroller[scrollDirection]();
  },
});
}
