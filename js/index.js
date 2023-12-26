class Divisas {
    constructor(nombre, valor) {
        this.nombre = nombre;
        this.valor = valor;
    }
}

const dolares = [
    new Divisas('Oficial', 806),
    new Divisas('Blue', 985),
    new Divisas('Tarjeta', 1322),
    new Divisas('CCL', 929),
    new Divisas('MEP', 939),
    new Divisas('Mayorista', 806),
]

const divisas = [
    new Divisas('ARS', null),
    new Divisas('BRL', null),
    new Divisas('CNY', null),
    new Divisas('GBP', null),
    new Divisas('CHF', null),
    new Divisas('JPY', null),
];

const navLogin = document.querySelector('#navLogin')

const form = document.querySelector('#formConversor')
const inputCantidad = document.querySelector('#inputCantidad')
const alertaCompleta = document.querySelector('#alertaCompleta')

const submitDolar = document.querySelector('#submitDolar')
const submitDivisas = document.querySelector('#submitDivisas')
const submitPeso = document.querySelector('#submitPeso')

const paridad = document.querySelector('#paridad')

const divisaDolarOficial = document.querySelector('#divisaDolarOficial')
const divisaDolarBlue = document.querySelector('#divisaDolarBlue')
const divisaDolarTarjeta = document.querySelector('#divisaDolarTarjeta')
const divisaDolarCCL = document.querySelector('#divisaDolarCCL')
const divisaDolarMEP = document.querySelector('#divisaDolarMEP')
const divisaDolarMayorista = document.querySelector('#divisaDolarMayorista')

const valorDolarOficial = document.querySelector('#valorDolarOficial')
const valorDolarBlue = document.querySelector('#valorDolarBlue')
const valorDolarTarjeta = document.querySelector('#valorDolarTarjeta')
const valorDolarCCL = document.querySelector('#valorDolarCCL')
const valorDolarMEP = document.querySelector('#valorDolarMEP')
const valorDolarMayorista = document.querySelector('#valorDolarMayorista')


//API

function obtenerTasasDeCambio() {
    const apiKey = '768e5add5e1ae0d8f01f7c7741f1ad51';
    const baseCurrency = 'EUR'; // Moneda base 

    const divisasNombres = divisas.map(divisa => divisa.nombre);

    const apiUrl = `http://data.fixer.io/api/latest?base=${baseCurrency}&symbols=${divisasNombres.join(',')}&access_key=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const rates = data.rates;
            for (const divisa of divisas) {
                if (rates.hasOwnProperty(divisa.nombre)) {
                    divisa.paridad = rates[divisa.nombre];
                }
            }
        })
        .catch(error => {
            console.log('Error al obtener tasas de cambio:', error);
        });
}


obtenerTasasDeCambio();

function formatearNumero(numero) {
    const partes = numero.toFixed(2).toString().split('.');
    const parteEntera = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const parteDecimal = partes[1];
    return parteEntera + ',' + parteDecimal;
}

const usuariosGuardados = JSON.parse(localStorage.getItem('claveNuevoUsuario'));


if (usuariosGuardados !== null) {
    navLogin.removeAttribute('href');
    navLogin.innerHTML = 'Sesion Iniciada';
} else {
    navLogin.setAttribute('href', './pages/login.html');
    navLogin.innerHTML = 'Iniciar Sesion';

    setTimeout(() => {
        Swal.fire({
            icon: 'info',
            title: 'Registrate!',
            text: 'Registrate para no perderte ninguna novedad!',
            confirmButtonText: 'Registrarme',
            confirmButtonColor: '#rgb(9, 101, 15)',
            preConfirm: () => {
                window.location.href = './pages/register.html';
            }
        })
    }, 60000)
}

// ---------------------------- Dolares a pesos ---------------------------- //

const resultadosDolares = {};

submitDolar.addEventListener('click', (event) => {

    event.preventDefault();

    paridad.innerHTML = 'USD - ARS'

    divisaDolarOficial.innerHTML = 'Oficial'
    divisaDolarBlue.innerHTML = 'Blue'
    divisaDolarTarjeta.innerHTML = 'Tarjeta'
    divisaDolarCCL.innerHTML = 'CCL'
    divisaDolarMEP.innerHTML = 'MEP'
    divisaDolarMayorista.innerHTML = 'Mayorista'

    const cantidad = parseFloat(inputCantidad.value);

    if (!isNaN(cantidad)) {
        if (cantidad !== 0) {
            for (const dolar of dolares) {
                resultadosDolares[dolar.nombre] = cantidad * dolar.valor;
                alertaCompleta.innerHTML = '';
            }

            Toastify({
                text: "Conversion Exitosa",
                className: "info",
                gravity: "bottom",
                position: "right",
                close: true,
                style: {
                    background: "linear-gradient(to right, #22A83E, #A99429)",
                }
            }).showToast();
        } else {

            alertaCompleta.innerHTML = 'El valor no puede ser 0.';

            for (const dolar of dolares) {
                resultadosDolares[dolar.nombre] = 0;
            }
        }
    } else {

        alertaCompleta.innerHTML = 'Completa el campo con un valor numérico.';

        for (const dolar of dolares) {
            resultadosDolares[dolar.nombre] = 0;
        }
    }

    valorDolarOficial.innerHTML = '$' + formatearNumero(resultadosDolares['Oficial']);
    valorDolarBlue.innerHTML = '$' + formatearNumero(resultadosDolares['Blue']);
    valorDolarTarjeta.innerHTML = '$' + formatearNumero(resultadosDolares['Tarjeta']);
    valorDolarCCL.innerHTML = '$' + formatearNumero(resultadosDolares['CCL']);
    valorDolarMEP.innerHTML = '$' + formatearNumero(resultadosDolares['MEP']);
    valorDolarMayorista.innerHTML = '$' + formatearNumero(resultadosDolares['Mayorista']);
})

// ---------------------------- Euro a demas divisas ---------------------------- //

const resultadosDivisas = {};


submitDivisas.addEventListener('click', (event) => {

    event.preventDefault();

    paridad.innerHTML = 'EUR - DVS'

    divisaDolarOficial.innerHTML = 'Pesos'
    divisaDolarBlue.innerHTML = 'Real'
    divisaDolarTarjeta.innerHTML = 'Yuan'
    divisaDolarCCL.innerHTML = 'Libra'
    divisaDolarMEP.innerHTML = 'Franco'
    divisaDolarMayorista.innerHTML = 'Yen'

    const cantidad = parseFloat(inputCantidad.value);

    if (!isNaN(cantidad)) {
        if (cantidad !== 0) {
            for (const divisa of divisas) {
                resultadosDivisas[divisa.nombre] = cantidad * divisa.paridad;
                alertaCompleta.innerHTML = '';
            }
            Toastify({
                text: "Conversion Exitosa",
                className: "info",
                gravity: "bottom",
                position: "right",
                close: true,
                style: {
                    background: "linear-gradient(to right, #22A83E, #A99429)",
                }
            }).showToast();
        } else {

            alertaCompleta.innerHTML = 'El valor no puede ser 0.';

            for (const divisa of divisas) {
                resultadosDivisas[divisa.nombre] = 0;
            }
        }
    } else {
        alertaCompleta.innerHTML = 'Completa el campo con un valor numérico.';

        for (const divisa of divisas) {
            resultadosDivisas[divisa.nombre] = 0;
        }
    }

    valorDolarOficial.innerHTML = '$' + formatearNumero(resultadosDivisas['ARS']);
    valorDolarBlue.innerHTML = '$' + formatearNumero(resultadosDivisas['BRL']);
    valorDolarTarjeta.innerHTML = '$' + formatearNumero(resultadosDivisas['CNY']);
    valorDolarCCL.innerHTML = '$' + formatearNumero(resultadosDivisas['GBP']);
    valorDolarMEP.innerHTML = '$' + formatearNumero(resultadosDivisas['CHF']);
    valorDolarMayorista.innerHTML = '$' + formatearNumero(resultadosDivisas['JPY']);
})

// ---------------------------- Pesos a dolares ---------------------------- //

const resultadosPesos = {};

submitPeso.addEventListener('click', (event) => {

    event.preventDefault();

    paridad.innerHTML = 'ARS - USD'

    divisaDolarOficial.innerHTML = 'Oficial'
    divisaDolarBlue.innerHTML = 'Blue'
    divisaDolarTarjeta.innerHTML = 'Tarjeta'
    divisaDolarCCL.innerHTML = 'CCL'
    divisaDolarMEP.innerHTML = 'MEP'
    divisaDolarMayorista.innerHTML = 'Mayorista'

    const cantidad = parseFloat(inputCantidad.value);

    if (!isNaN(cantidad)) {
        if (cantidad !== 0) {
            for (const dolar of dolares) {
                resultadosPesos[dolar.nombre] = cantidad / dolar.valor;
                alertaCompleta.innerHTML = '';
            }

            Toastify({
                text: "Conversion Exitosa",
                className: "info",
                gravity: "bottom",
                position: "right",
                close: true,
                style: {
                    background:  "linear-gradient(to right, #22A83E, #A99429)"  ,
                }
            }).showToast();
        } else {

            alertaCompleta.innerHTML = 'El valor no puede ser 0.';


            for (const dolar of dolares) {
                resultadosPesos[dolar.nombre] = 0;
            }
        }
    } else {

        alertaCompleta.innerHTML = 'Completa el campo con un valor numérico.';

        for (const dolar of dolares) {
            resultadosPesos[dolar.nombre] = 0;
        }
    }

    valorDolarOficial.innerHTML = '$' + formatearNumero(resultadosPesos['Oficial']);
    valorDolarBlue.innerHTML = '$' + formatearNumero(resultadosPesos['Blue']);
    valorDolarTarjeta.innerHTML = '$' + formatearNumero(resultadosPesos['Tarjeta']);
    valorDolarCCL.innerHTML = '$' + formatearNumero(resultadosPesos['CCL']);
    valorDolarMEP.innerHTML = '$' + formatearNumero(resultadosPesos['MEP']);
    valorDolarMayorista.innerHTML = '$' + formatearNumero(resultadosPesos['Mayorista']);
})



