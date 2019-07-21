let drawer = document.querySelector('#drawer'),
  btn = document.querySelectorAll('.material-btn')
let toggle = true
let bg = '',
  prevScrollY = 0
$(document).ready(() => {
  createRipple([
    $('.material-btn'),
    $('.trans-material-btn'),
    $('.option li'),
    $('#icon')
    // $('.toast'),
    // $('.card')
  ])
  $(document.body).css('padding-top', $('#header').height())
  $(window).scroll(() => {
    let scrollY = $(window).scrollTop()
    if (scrollY > prevScrollY) $('#header').css({ top: -$('#header').height() })
    else $('#header').css({ top: 0 })
    prevScrollY = scrollY
  })
})

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
  }, 500)
  //icon.style.left = '0'
}

$('#maskDiv').on('mousedown', () => {
  hide()
  collapseOptions()
})

$('#icon').click(e => {
  toggle ? show() : hide()
})

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
  $('li').map((i, e) => {
    if ($(e).hasClass('active')) $(e).removeClass('active')
  })
  $('#content').css('visibility', 'visible')
  if (e.target.textContent == 'Introduction')
    $('#content').css('visibility', 'hidden')
  //$('#content').animate({opacity:[0,1]},1000,()=>{console.log('animation complete')})
  $(e.target).addClass('active')
  hide()
  navigate(e.target.attributes.link.value)
})

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
const navigate = url => {
  $('#content').load(url)
}

const createToast = (text, duration, color) => {
  Toast(text, duration, color)
}
