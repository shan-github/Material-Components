$.when(
  $.getScript('./ripple.js'),
  $.getScript('./drawer.js'),
  $.getScript('./modal.js'),
  $.Deferred(defered => {
    $(defered.resolve)
  }).done(()=>{
      console.log('Done loadding scripts')
  })
)
