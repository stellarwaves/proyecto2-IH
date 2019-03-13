const main = () => {
	document.getElementById('profesores').style.display = 'block'
};
window.addEventListener('load',main);

//vemos la lista students
function misProfesores () {
	document.getElementById('profesores').style.display = 'none';
	document.getElementById('estudiantes').style.display = 'block';
}
//vemos la lista teachers
function mimEstudantes () {
	document.getElementById('profesores').style.display = 'block';
	document.getElementById('estudiantes').style.display = 'none';
}