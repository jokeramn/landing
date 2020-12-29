const findBlockByAlias = (alias) => {
  return $('.feedbacks__item').filter((ndx, item) =>{
    return $(item).attr('data-linked-with') == alias
  })
}
$('.picture__link').click(e => { 
  e.preventDefault()

 const $this = $(e.currentTarget)
 const target = $this.attr('data-open')
 const itemToShow = findBlockByAlias(target)
 const curItem = $this.closest('.picture')

 itemToShow.addClass('feedbacks__item--active').siblings().removeClass('feedbacks__item--active')
 curItem.addClass('picture--active').siblings().removeClass('picture--active')
})

