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
  let bgcolor = 'rgba(0,0,0,0.8)'
  cir.classList.add('cir')
  cir.style.backgroundColor = bgcolor
  cir.style.left = e.originalEvent.layerX
  cir.style.top = e.originalEvent.layerY
  return cir
}
const hideRipple = elm => {
  elm
    .animate(
      { opacity: [0.5, 0] },
      { duration: RIPPLE_DURATION, fill: 'forwards' }
    )
    .finished.then(() => {
      $(elm).remove()
    })
}

const onMouseUp = e => {
  // if ($(e.currentTarget).hasClass('material-btn'))
  // e.currentTarget.animate(
  //   {
  //     boxShadow: [
  //       '0px 5px 10px 0px rgba(0,0,0,0.4)',
  //       '0px 2px 3px 0px rgba(0,0,0,0.4)'
  //     ]
  //   },
  //   { duration: 200, fill: 'forwards' }
  // )
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

  //   }, RIPPLE_DURATION)
}
const onMouseDown = e => {
  let cir = createRippleCircle(e)
  e.stopPropagation()
  $(e.target).append(cir)
  cir.animate(
    {
      transform: ['scale(3)', 'scale(' + e.target.clientWidth / 4 + ')'],
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
const Toast = (text = 'Default Text', duration = 1000, color = '#222') => {
  if (previous != null) document.body.removeChild(previous)
  let toast = document.createElement('span'),
    t = document.createElement('p'),
    btn = document.createElement('button')
  $(toast).css('background-color', color)
  $(btn).addClass(['trans-material-btn'])
  $(btn).text('Dismiss')
  $(btn).click(e => {
    dismiss(toast)
  })

  createRipple($(btn))
  t.innerText = text
  $(toast).addClass('toast')
  toast.append(t)
  toast.append(btn)
  $(document.body).prepend(toast)
  previous = toast
  $(toast).animate(
    {
      bottom: 20,
      opacity: 1
    },
    toastDuration
  )
  setTimeout(() => {
    if (toast.parentNode != null) dismiss(toast)
  }, duration)
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

$('.icon')
  .css('padding', $('.icon').height() / 2)
  .css({
    height: $('.icon').css('padding'),
    width: $('.icon').css('padding'),
    borderRadius: 900
  })
  .on('click', e => {
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
  })
