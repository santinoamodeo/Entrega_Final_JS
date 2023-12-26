const formLogin = document.querySelector('#formLogin');
const inputTuMail = document.querySelector('#inputTuMail');
const inputTuPassword = document.querySelector('#inputTuPassword');

const navRegister = document.querySelector('#navRegister');
const textoRegistrate = document.querySelector('#textoRegistrate');

const navLogin = document.querySelector('#navLogin');

const p = document.createElement('p');
p.textContent = 'Completa el campo.';
p.className = 'alertas';

const usuariosGuardados = JSON.parse(localStorage.getItem('claveNuevoUsuario'));

if (usuariosGuardados !== null) {
    navRegister.style.display = 'none';
    textoRegistrate.innerHTML = 'Ya tenes cuenta, solo ingresa tus datos!';
} else {
    navRegister.style.display = 'block';
    textoRegistrate.innerHTML = 'No tenes cuenta? Hace <a href="./register.html">click aca</a> y registrate!';
}

formLogin.addEventListener('submit', (event) => {

    event.preventDefault();

    const mailIngresado = inputTuMail.value;
    const passwordIngresado = inputTuPassword.value;

    const usuariosGuardados = JSON.parse(localStorage.getItem('claveNuevoUsuario'));

    if (mailIngresado.trim() === '') {
        inputTuMail.parentNode.insertBefore(p, inputTuMail.nextSibling);
    } else if (passwordIngresado.trim() === '') {
        inputTuPassword.parentNode.insertBefore(p, inputTuPassword.nextSibling);
    } else {
        if (usuariosGuardados && usuariosGuardados.length > 0) {
            const usuarioEncontrado = usuariosGuardados.find((usuario) => {
                return usuario.mail === mailIngresado && usuario.password === passwordIngresado;
            });

            if (usuarioEncontrado) {
                window.location.href = '../index.html';
            } else {
                textoRegistrate.innerHTML = 'Credenciales incorrectas. Verifica tu correo y contraseña.';
                textoRegistrate.className = 'alertas';
            }
        } else {
            if (p !== '') {
                p.remove();
            }

            textoRegistrate.innerHTML = 'Esa cuenta no existe aún, hace <a href="./register.html">click acá</a> y registrate!';
            textoRegistrate.className = 'alertas';
        }
    }
});




