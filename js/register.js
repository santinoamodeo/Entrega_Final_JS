class Usuarios {
    constructor({ nombre, apellido, mail, password }) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.mail = mail;
        this.password = password;
    }
}

const formRegister = document.querySelector('#formRegister');
const inputNombre = document.querySelector('#inputNombre');
const inputApellido = document.querySelector('#inputApellido');
const inputMail = document.querySelector('#inputMail');
const inputPassword = document.querySelector('#inputPassword');
const inputNombreApellido = document.querySelector('#inputNombreApellido');

const p = document.createElement('p');
p.textContent = 'Completa el campo.';
p.className = 'alertas';

const usuarios = [];

formRegister.addEventListener('submit', (event) => {
    event.preventDefault();

    const nombre = inputNombre.value;
    const apellido = inputApellido.value;
    const mail = inputMail.value;
    const password = inputPassword.value;

    if (nombre.trim() === '' || apellido.trim() === '') {

        inputNombreApellido.parentNode.insertBefore(p, inputNombreApellido.nextSibling);

    } else if (mail.trim() === '') {

        inputMail.parentNode.insertBefore(p, inputMail.nextSibling);

    } else if (password.trim() === '') {

        inputPassword.parentNode.insertBefore(p, inputPassword.nextSibling);

    } else {

        const mensajeError = inputNombreApellido.nextSibling;
        if (mensajeError) {
            mensajeError.remove();
        }

        const nuevoUsuario = new Usuarios({ nombre, apellido, mail, password });

        usuarios.push(nuevoUsuario);
        localStorage.setItem('claveNuevoUsuario', JSON.stringify(usuarios));

        window.location.href = 'login.html';
    }
});


