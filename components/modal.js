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

//Snackbar
const createSnackBar = () => {
  let snackbar = document.createElement('span'),
    message = document.createElement('p'),
    button = document.createElement('button')
    createRipple($(button))
  $(snackbar)
    .addClass('snackbar')
    .append([   
      $(message).text('Snackbar'),
      $(button).text('Undo').addClass('trans-material-btn p-5 primary-text')
    ])

  $(document.body).append(snackbar)

  $(snackbar)
    .animate({ bottom: 0 }, { duration: 100 })
    .delay(2000)
    .animate({ bottom: -100 },{duration:200})
}
