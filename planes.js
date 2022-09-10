const planesDetalle = document.querySelector("#plan");
const btnVolver = document.querySelector(".volver");

let planLS = JSON.parse(localStorage.getItem('plan'))
console.table(planLS);
btnVolver.addEventListener("click", () => location.href = "index.html")

const detallarPlanes = (cadaPlan) => {
    const {poster, titulo, horario, reservas, minimo, precio} = cadaPlan
    return `<div class= "card content">
    <img src="${poster}">
    <h5 class="card-title">${titulo}</h5>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">${horario}</li>
      <li class="list-group-item">${reservas}</li>
      <li class="list-group-item">${minimo}</li>
      <li class="list-group-item">${precio}</li>
    </ul>
    </div>`
}

const retornoError = () => {
    return `<div class="mensajeError">
    <div class="iconoError">"⚠"</div>
    <p>No pudimos cargar los planes</p>
 
</div>`
}

const recuperarPlanes = ()=> {
    
    if (localStorage.cadaPlan) {
        const planLS = JSON.parse(localStorage.getItem('plan'))
        planesDetalle.innerHTML = detallarPlanes(planLS)

    } else {
        planesDetalle.innerHTML = retornoError()
    }
}
recuperarPlanes ()