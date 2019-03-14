const main = () => {
  document.getElementById('estudiantes').style.display = 'none'
}

// vemos la lista students
function misProfesores () {
  document.getElementById('profesores').style.display = 'block'
  document.getElementById('estudiantes').style.display = 'none'
}

// vemos la lista teachers
function misEstudiantes () {
  document.getElementById('profesores').style.display = 'none'
  document.getElementById('estudiantes').style.display = 'block'
}

function activeTabs (e) {
  const elems = document.querySelectorAll('.active');
  [].forEach.call(elems, function (el) {
	  el.classList.remove('active')
  })
  e.target.className = 'active'
}

window.addEventListener('load', main)
