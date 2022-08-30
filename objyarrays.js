//clases
class gymClase {
    constructor(nombre, hora, capacidad, disponibilidad) {
        this.nombre = nombre
        this.hora = hora
        this.capacidad = capacidad
        this.disponibilidad = disponibilidad //Espacio disponible en base a reservas
        this.calcularDisponibilidad = function (reservas) {
            reservas >= this.capacidad ? this.disponibilidad = false : this.disponibilidad = true
        }
    }
}

class Usuario {
    constructor(nombre, socio, clase) {
        this.nombre = nombre;
        this.socio = socio;
        this.clase = clase;
    }
}


//objetos
const clase1 = new gymClase("Functional", "lunes - miercoles - viernes 16:00", 15, false)
const clase2 = new gymClase("Spinning", "lunes a viernes 15:00", 20, true)
const clase3 = new gymClase("Pilates", "martes - jueves - sabado 17:30", 15, true)
const clase4 = new gymClase("Yoga", "martes - jueves - sabado 20:30", 10, true)
const clase5 = new gymClase("Boxeo", "lunes a viernes 19:00", 20, false)



// //arrays
const clases = [clase1, clase2, clase3, clase4, clase5];
let reservaClases = []

//DOM
const botonFiltrar = document.querySelector(".botonFiltrar")
const inputFiltrar = document.querySelector("#filtrar")
const botonTodas = document.querySelector(".botonTodas")
const todas = document.querySelector("#todas")
const selectClase = document.querySelector("#selectClase")
const listaClases = document.querySelector("#opciones")
const tablaReserva = document.querySelector('#tablaReservas')
const cuerpoReserva = document.querySelector('#cuerpo-reserva')
const botonHistorial = document.querySelector(".botonHistorial")
const botonReservar = document.querySelector(".botonReservar")

//Funciones
function filtrarClases() {
    cuerpo.innerHTML = ""
    let claseFound = document.getElementById("filtar").value
    const resultado = clases.filter(elemento => elemento.hora.includes(claseFound))

    console.table(resultado)

    resultado.forEach(clase => {
        const { nombre, hora, capacidad, disponibilidad } = clase
        cuerpo.innerHTML += `<tr>
                                <td>${nombre}</td>
                                <td>${hora}</td>
                                <td>${capacidad}</td>
                                <td>${disponibilidad}</td>
                            </tr>`
    })

    inputFiltrar.value = ""
}
function mostrarTodas() {
    cuerpo.innerHTML = ""

    clases.forEach(clase => {
        const { nombre, hora, capacidad, disponibilidad } = clase
        cuerpo.innerHTML += `<tr>
                                <td>${nombre}</td>
                                <td>${hora}</td>
                                <td>${capacidad}</td>
                                <td>${disponibilidad ? 'Disponible' : 'Completa'}</td>
                            </tr>`
    })
}
mostrarTodas()

function seleccionarClase() {
    clases.forEach(clase => {
        selectClase.innerHTML += `<select>
                                    <option>${clase.nombre}</option>
                             </select>`
    })
}

//Eventos
botonFiltrar.addEventListener("click", filtrarClases)
botonTodas.addEventListener("click", mostrarTodas)
botonHistorial.addEventListener("click", recuperarLS)

//LS
let form = document.querySelector('#reservar')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    let inputNombre = document.getElementById('nombre').value
    let inputSocio = document.getElementById('socio').value
    let inputClase = document.getElementById('clase').value
    let usuario = new Usuario(inputNombre, inputSocio, inputClase)
    reservaClases.push(usuario)
    console.log(reservaClases);
    localStorage.setItem('usuario', JSON.stringify(reservaClases))
})

function recuperarLS() {
    const arrayLS = JSON.parse(localStorage.getItem('usuario')) || []
    cuerpoReserva.innerHTML = ''
    reservaClases = []
    arrayLS.forEach(usuario => {
        const { nombre, clase, socio } = usuario
        reservaClases.push(usuario)
        cuerpoReserva.innerHTML += `<tr>
                                            <td>${nombre}</td>
                                            <td>${clase}</td>
                                            <td>${socio}</td>
                                        </tr>`
    })
}




const popUpReserva = () => {

    let inputNombre = document.getElementById('nombre').value
    let inputSocio = document.getElementById('socio').value
    let inputClase = document.getElementById('clase').value

    const completo = (inputNombre != "" && inputSocio != "" && inputClase != "") ? true : false

    completo ? Swal.fire({
        position: 'top-end',
        icon: 'success',
        iconColor: '#65292a',
        width: '300px',
        title: '¡Gracias por reservar!',
        showConfirmButton: false,
        timer: 1500
    })
        :
        Swal.fire({
            position: 'bottom-end',
            icon: 'warning',
            iconColor: '#65292a',
            width: '300px',
            title: 'No se han ingresado datos',
            showConfirmButton: false,
            timer: 1500
        })

}
botonReservar.addEventListener("click", popUpReserva)



