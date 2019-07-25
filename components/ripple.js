let previous = null,
  toastDuration = 200
const RIPPLE_DURATION = 200

const createRippleCircle = e => {
  let cir = document.createElement('span')
  // let bgcolor = '#fff'
  // if (
  //   $(e.currentTarget).hasClass('card') ||
  //   $(e.currentTarget).hasClass('trans-material-btn')
  // )
  // console.log(e.originalEvent)
  // console.log($(e.target).css('color'))
  cir.classList.add('cir')
  cir.style.backgroundColor = $(e.target).css('color')
  cir.style.left = e.originalEvent.layerX
  cir.style.top = e.originalEvent.layerY
  return cir
}
const hideRipple = elm => {
  const anim=elm
    .animate(
      { opacity: [0.5, 0] },
      { duration: RIPPLE_DURATION, fill: 'forwards' }
    )
    anim.play()
    anim.onfinish=()=>{$(elm).remove()}
}

const onMouseUp = e => {
  if ($(e.target).hasClass('cir')) hideRipple(e.target)
  else
    $(e.target)
      .children()
      .each((i, elm) => {
        if ($(elm).hasClass('ripple-con')) {
          $(elm)
            .children()
            .map((i, el) => {
              hideRipple(el)
            })
        }
      })
}
const onMouseDown = e => {
  let cir = createRippleCircle(e)
  e.stopPropagation()
  $(e.target).append(cir)
  cir.animate(
    {
      transform: ['scale(3)', 'scale(' + e.target.clientWidth / 3 + ')'],
      offset: [0, 0.2, 1],
      opacity: [0.4, 0.49, 0.5]
    },
    {
      duration: RIPPLE_DURATION,
      fill: 'forwards'
    }
  )
}
const bindEvents = node => {
  $(node)
    .on('mousedown', onMouseDown)
    .on('mouseup', onMouseUp)
    .on('blur', onMouseUp)
}

const createRipple = target => {
  if (target instanceof Array) {
    target.forEach(node => {
      let rippleOverlay = document.createElement('span')
      $(rippleOverlay).addClass('ripple-con')
      $(node).append(rippleOverlay)
      bindEvents(node)
    })
  } else {
    let rippleOverlay = document.createElement('span')
    $(rippleOverlay).addClass('ripple-con')
    $(target).append(rippleOverlay)
    bindEvents(target)
  }
}

const dismiss = toast => {
  $(toast).animate(
    {
      bottom: 30,
      opacity: 0
    },
    toastDuration,
    () => {
      document.body.removeChild(toast)
      previous = null
    }
  )
}


//Icon Ripple
const hideIconRipple = () => {
  $('.icon-ripple').each((i, elm) => {
    if (elm)
      $(elm).animate(
        { opacity: 0 },
        {
          duration: 100,
          easing: 'linear',
          done: () => {
            $(elm).remove()
          }
        }
      )
  })
}
const createIconRipple=()=>{
$('.icon')
  .css('padding', $('.icon').height() / 2)
  .css({
    height: $('.icon').css('padding'),
    width: $('.icon').css('padding'),
    borderRadius: 900
  })
  .on('mousedown', e => {
    hideIconRipple()
    if (!$(e.target.parentElement).hasClass('option-container')) {
      collapseOptions()
      e.stopPropagation()
    }
    if ($(e.target).hasClass('icon-ripple')) return
    let ripple = document.createElement('span')
    $(ripple).addClass('icon-ripple')
    // console.log(e.target.parentElement)
    $(e.target).append(ripple)
    ripple.animate({ transform: ['scale(0)', 'scale(1)'] }, { duration: 100 })
  }).on('mouseup',e=>{
    // console.log(e.target)
    $('.icon-ripple').fadeOut('fast')
  })
}