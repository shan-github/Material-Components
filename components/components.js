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
    $('#drawer li'),
    $('.collapsible .title')
    // $('.switch-button')
    // $('.card')
  ])
  createIconRipple()
  $(document.body).css('padding-top', $('#header').height())
  $(window).scroll(() => {
    let scrollY = $(window).scrollTop()
    console.log(scrollY)
    if (scrollY > prevScrollY) $('#header').css({ top: -$('#header').height() })
    else $('#header').css({ top: 0 })
    prevScrollY = scrollY
  })
  togglePage($('.active').attr('id'))
})

const init = () => {
  createCheckMark()
  createSwitch()
  createRadio()
  createAccordians()
  $('input').each((i, elm) => {
    elm.value = $(elm.parentElement)
      .text()
      .trim()
  })
}
/**
 *
 * @param {String} color
 * @param {number} alpha
 */
const colorWithAlpha = (color, alpha) => {
  let codes = color.split(',')
  return `rgba(${codes[0].split('(')[1]},${codes[1]},${
    codes[2].split(')')[0]
  },${alpha})`
}

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
$('.pages').css('padding-top', $('#header').height() + 'px')

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
  $('.checkbox')
    .append([$(markCont).append($(mark).append(check))])
    .each((i, elm) => {
      if ($(elm.children[0]).prop('disabled')) {
        $(elm.children[1].firstChild).css('border-color', '#aaa')
        $(elm.children[1]).css('background', 'none')
        $(elm).css({
          color: $(elm.children[1].firstChild).css('border-top-color'),
          cursor: 'default'
        })
      }
      if ($(elm.children[0]).prop('checked')) {
        $(elm.children[1].firstChild).css(
          'background-color',
          $(elm.children[1].firstChild).css('border-top-color')
        )
        $(elm.children[1].firstChild.firstChild).fadeIn(100)
      }
    })
}

$('.checkbox').on('click', e => {
  e.stopPropagation()

  const target = e.currentTarget.children[1].firstChild,
    input = e.currentTarget.children[0]

  // console.log($(input).val().length)

  if ($(input).prop('disabled')) return

  target.animate(
    {
      transform: ['scale(1)', 'scale(0.8)', 'scale(1)'],
      // borderRadius: ['2px', '5px', '2px'],
      offset: [0, 0.8, 1]
    },
    { duration: 200, easing: 'ease' }
  )
  if (!input.checked) {
    $(target.firstChild).fadeOut(100)
    $(target).css('background-color', 'rgba(0,0,0,0)')
  } else {
    $(target.firstChild).fadeIn(300)
    $(target).css('background-color', $(target).css('border-top-color'))
  }
})

/**
 * Switch
 */
$('.switch').on('change', e => {
  e.stopPropagation()
  const target = e.currentTarget,
    input = target.children[0]
  // console.log(input.checked  )
  toggleSwitch(target, input.checked)
})
const createSwitch = () => {
  let track = document.createElement('span'),
    button = document.createElement('span')
  $(track).addClass('switch-track')
  $(button).addClass('switch-button')
  $('.switch')
    .append($(track).append($(button)))
    .each((i, elm) => {
      toggleSwitch(elm, elm.children[0].checked)
    })
}
const toggleSwitch = ({ children }, checked) => {
  const button = children[1].firstElementChild,
    track = children[1]
  if (checked) {
    $(button).css(
      'left',
      $(track).width() -
        $(button)
          .css('padding-top')
          .split('p')[0]
    )
    $(track).css(
      'background-color',
      colorWithAlpha($(button).css('background-color'), 0.5)
    )
  } else {
    $(button).css('left', 0)
    $(track).css('background-color', 'rgba(0,0,0,0.2)')
  }
}
/**
 * Radio Buttons
 */
const createRadio = () => {
  let radio = document.createElement('span'),
    button = document.createElement('span')
  $(radio).addClass('radio-circle')
  $(button).addClass('radio-button')
  $('.radio').append($(radio).append($(button)))
  $('input[type="radio"]').each((i, elm) => {
    elm.checked
      ? toggleRadio(elm.parentElement, true)
      : toggleRadio(elm.parentElement, false)
  })
}
$('.radio').on('click', e => {
  e.stopPropagation()
  const input = e.currentTarget.children[0]
  // console.log(typeof input.name)
  if (input.checked) return
  $('input[type="radio"]').each((i, elm) => {
    if (elm.name == input.name && input.name != '')
      if (elm.checked) toggleRadio(elm.parentElement, false)
  })
  toggleRadio(e.currentTarget, true)
})
/**
 * @param {Boolean} toggleVal
 * @param {HTMLElement} radio
 */
const toggleRadio = (radio, toggleVal) => {
  const circle = radio.children[1],
    button = radio.children[1].firstChild,
    duration = 200
  if (toggleVal) {
    circle.animate(
      {
        transform: ['scale(1)', 'scale(0.8)', 'scale(1)'],
        offset: [0, 0.8, 1]
      },
      { duration, easing: 'ease' }
    )
    button.animate(
      { transform: ['scale(0)', 'scale(2)', 'scale(1)'], opacity: [0, 0.9, 1] },
      { duration, fill: 'forwards' }
    )
  } else {
    button.animate(
      { transform: ['scale(1)', 'scale(2)'], opacity: [1, 0] },
      { duration, fill: 'forwards' }
    )
  }
}

/**
 * Accordians
 */
const createAccordians = () => {
  $('.collapsible .title')
    .append(
      $(document.createElement('i'))
        .addClass('icon material-icons icons-small md-light')
        .text('keyboard_arrow_down')
    )
    .prop('toggle', false)
  $('.collapsible').height(
    $('.collapsible .title')
      .css('padding-top')
      .split('p')[0] * 10
  )
}
$('.collapsible .title').on('click', e => {
  const parent = e.currentTarget.parentElement,
  toggle=!$(parent).prop('toggle')
  // console.log($(parent.children[0]).css('padding-top'))
  $(parent).prop('toggle',toggle)

  if (toggle) {
    $(parent).height(
      $(parent.children[0]).height() + $(parent.children[1]).height() + 30
    )
    e.currentTarget.children[0].animate(
      { transform: ['rotate(0deg)', 'rotate(180deg)'] },
      { duration: 200, fill: 'forwards' }
    )
  } else {
    $(parent).height(
      $(e.currentTarget)
        .css('padding-top')
        .split('p')[0] * 10
    )
    e.currentTarget.children[0].animate(
      { transform: ['rotate(180deg)', 'rotate(0deg)'] },
      { duration: 200, fill: 'forwards' }
    )
  }
})
