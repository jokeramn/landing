const openItem = (item) => {
  const container = item.closest('.team__item')
  const contentBlock = container.find('.team__block')
  const textBlock = contentBlock.find('.team__about')
  const currentHeight = textBlock.height()

  container.addClass('team__item--active')
  contentBlock.height(currentHeight)
}

const closeEveryItem = (container) => {
  const items = container.find('.team__block')
  const itemContainer = container.find('.team__item')

  itemContainer.removeClass('team__item--active')
  items.height(0)
}

$('.team-btn').click((e) => {
  const $this = $(e.currentTarget)
  const container = $this.closest('.team__list')
  const elemContainer = $this.closest('.team__item')


  if (elemContainer.hasClass('team__item--active')) {
    closeEveryItem(container)
  } else {
    closeEveryItem(container)
    openItem($this)
  }
})