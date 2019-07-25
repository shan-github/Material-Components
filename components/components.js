let drawer = document.querySelector('#drawer'),
  btn = document.querySelectorAll('.material-btn')
let toggle = true
let bg = '',
  prevScrollY = 0,
  prevPage = null

/**
 * Ready
 */
$(document).ready(() => {
  init()
  createRipple([
    $('.material-btn'),
    $('.trans-material-btn'),
    $('.option li'),
    $('#icon'),
    $('#drawer li')
    // $('.switch-button')
    // $('.card')
  ])
  createIconRipple()
  $(document.body).css('padding-top', $('#header').height())
  $(window).scroll(() => {
    let scrollY = $(window).scrollTop()
    if (scrollY > prevScrollY) $('#header').css({ top: -$('#header').height() })
    else $('#header').css({ top: 0 })
    prevScrollY = scrollY
  })
  togglePage($('.active').attr('id'))
})

const init = () => {
  createCheckMark()
  $('.checkbox input').prop('checked', false)
  $('.switch input').prop('checked', false)
  createSwitch()
}
/**
 * 
 * @param {String} color 
 * @param {number} alpha 
 */
const colorWithAlpha=(color,alpha)=>`rgba${color.slice(3,-1)},${alpha})`

/**
 * Header
 */
$('#header div p').on('click', () => {
  collapseOptions()
})

$('.content-con').click(() => {
  collapseOptions()
})
const show = () => {
  collapseOptions()
  $('#maskDiv').css('visibility', 'visible')
  $('#maskDiv').css('background-color', 'rgba(0,0,0,0.5)')
  toggle = false
  drawer.style.left = '0px'
  drawer.style.visibility = 'visible'
  //icon.style.left = '250'
}
const togglePage = targetPage => {
  $('.pages').each((i, page) => {
    page.id == targetPage
      ? $(page).slideDown({ duration: 500 })
      : $(page).css('display', 'none')
  })
}
const hide = () => {
  collapseOptions()
  $('#maskDiv').css('background-color', 'rgba(0,0,0,0)')
  setTimeout(() => {
    $('#maskDiv').css('visibility', 'hidden')
    clearInterval()
  }, 500)
  $('.modal').fadeOut(100, () => {
    $('.modal').remove()
  })
  toggle = true
  drawer.style.left = '-320px'
  setTimeout(() => {
    drawer.style.visibility = 'hidden'
    clearInterval()
  }, 100)
  //icon.style.left = '0'
}

$('#maskDiv').on('mousedown', () => {
  hide()
  collapseOptions()
})

$('#icon').click(e => {
  toggle ? show() : hide()
})

/**
 * Material Buttons
 */
$('.floating-btn').click(e => {
  collapseOptions()
})
$('.material-btn').on('mousedown', e => {
  collapseOptions()
})
const collapseOptions = () => {
  hideIconRipple()
  $('.option').animate(
    { opacity: 0, top: 5 },
    {
      duration: 100,
      done: () => {
        $('.option').css('display', 'none')
      }
    }
  )
}

$('.trans-material-btn').click(e => {
  collapseOptions()
})

$('#drawer li').click(e => {
  $('#drawer li').map((i, e) => {
    $(e).removeClass('active')
  })
  togglePage(e.currentTarget.id)
  $(e.currentTarget).addClass('active')

  hide()
})

/**
 * Options
 */

$('.option-container').click(e => {
  $('.option').css('display', 'block')
  $('#option').css('background-color', 'rgba(255,255,255,0.4)')
  $('.option').css('border-radius', '3px')
  // $('.option').offset({ top: e.pageY })
  $('.option').animate(
    {
      opacity: 1,
      top: 0
    },
    200
  )
})

$('.option li').click(e => {
  e.stopPropagation()
  collapseOptions()
})

/**
 * Toast
 */
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

const createToast = (text, duration, color) => {
  Toast(text, duration, color)
}

/*
 *Modal
 */
const createModal = (text = ['This is a modal', 'Hi'], success) => {
  $('#maskDiv').css('visibility', 'visible')
  $('#maskDiv').css('background-color', 'rgba(0,0,0,0.8)')

  let modal = document.createElement('div'),
    cancel = document.createElement('button'),
    ok = document.createElement('button'),
    buttonContainer = document.createElement('div'),
    title = document.createElement('p'),
    subtitle = document.createElement('p'),
    titleContainer = document.createElement('div')

  $(titleContainer).append([
    $(title)
      .addClass('modal-title')
      .text(text[0]),
    $(subtitle)
      .addClass('modal-sub')
      .text(text[1])
  ])

  $(modal).addClass('modal')
  $(cancel)
    .addClass('trans-material-btn p-10')
    .text('Cancel')
    .click(() => {
      hide()
    })
  $(ok)
    .addClass('trans-material-btn p-10 primary-text')
    .text('OK')
    .click(() => {
      hide()
      success()
    })

  $(buttonContainer).append([cancel, ok])
  $(modal).append([titleContainer, buttonContainer])
  $(document.body).append(modal)

  createRipple([ok, cancel])
}

/**
 * Snack Bar
 */
const createSnackBar = (text = 'Snackbar') => {
  let snackbar = document.createElement('span'),
    message = document.createElement('p'),
    button = document.createElement('button')
  createRipple($(button))
  $(snackbar)
    .addClass('snackbar')
    .append([
      $(message).text(text),
      $(button)
        .text('Undo')
        .addClass('trans-material-btn p-5 primary-text')
    ])

  $(document.body).append(snackbar)

  $(snackbar)
    .animate({ bottom: 0 }, { duration: 100 })
    .delay(2000)
    .animate({ bottom: -100 }, { duration: 200 })
}

/**
 * Pages
 */
$('.pages').css('padding-top', $('#header').height())

/**
 * Check Box
 */
const createCheckMark = () => {
  let markCont = document.createElement('span'),
    mark = document.createElement('span'),
    check = document.createElement('span')

  $(markCont).addClass(['mark-container'])
  $(mark).addClass('checkmark')
  $(check).addClass('check')

  $(mark).css('background-color', 'rgba(0,0,0,0)')
  $(check).css('display', 'none')
  $('.checkbox').append([$(markCont).append($(mark).append(check))])
}

$('.checkbox').on('click', e => {
  e.stopPropagation()
  const target = e.currentTarget.children[1].firstChild,
    input = e.currentTarget.children[0]
  // console.log(input.checked+' '+e.bubbles)
  target.animate(
    {
      transform: ['scale(1)', 'scale(0.3)', 'scale(1)'],
      borderRadius: ['2px', '20px', '2px'],
      offset: [0, 0.2, 1]
    },
    { duration: 200, easing: 'ease' }
  )

  if (!input.checked) {
    $(target.firstChild).fadeOut(100)
    $(target).css('background-color', 'rgba(0,0,0,0)')
  } else {
    $(target.firstChild).fadeIn(100)
    $(target).css('background-color', $(target).css('border-top-color'))
  }
})

/**
 * Radio Buttons
 */
$('.switch').on('click', e => {
  e.stopPropagation()
  const target = e.currentTarget,
    input = target.children[0],
    button = target.children[1].firstElementChild,
    track = target.children[1]
  // console.log(colorWithAlpha($(button).css('background-color'),0.2))
  if (input.checked){
    $(button).css(
      'left',
      $(track).width() -
        $(button)
          .css('padding-top')
          .split('p')[0]
    )
    $(track).css('background-color',colorWithAlpha($(button).css('background-color'),0.5))
  }
  else {$(button).css('left', 0)
  $(track).css('background-color','rgba(0,0,0,0.2)')
}
})
const createSwitch = () => {
  let track = document.createElement('span'),
    button = document.createElement('span')
  $(track).addClass('switch-track')
  $(button).addClass('switch-button')
  $('.switch').append($(track).append($(button)))
}
