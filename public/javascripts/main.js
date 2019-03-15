'use strict'

const form = document.querySelector('#form-teachme')
if (form) {
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
}

const formDelete = document.querySelector('#profile-delete')
if (formDelete) {
  formDelete.addEventListener('submit', evt => {
    evt.preventDefault()
    swal({
      text: 'Are you sure that you want to delete your profile',
      buttons: true,
      icon: 'warning'
    }).then(val => {
      if (val) {
        swal('Your profile was deleted', {
          icon: 'success'
        }).then(val => {
          formDelete.submit()
          console.log('hola')
        })
      } else {
        swal('Your profile is safe')
      }
    })
  })
}

const formEdit = document.querySelector('#profile-edit')
if (formEdit) {
  formEdit.addEventListener('submit', evt => {
    evt.preventDefault()
    swal('Are you sure?', {
      buttons: true
    }).then(val => {
      if (val) {
        formEdit.submit()
      }
    })
  })
}
