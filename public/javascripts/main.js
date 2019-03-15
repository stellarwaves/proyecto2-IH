'use strict'

const form = document.querySelector('#form-teachme')
form.addEventListener('submit', evt => {
  evt.preventDefault()
  swal({
    text: 'Are sure that you want this teacher?',
    buttons: true,
    icon: 'warning'
  }).then(val => {
    if (val) {
      swal('Great!! You almost have a teacher, wait for confirmation. ', {
        icon: 'success'
      }).then(val => {
        form.submit()
      })
    } else {
      swal('Not a problem, you can find another one')
    }
  })
})
