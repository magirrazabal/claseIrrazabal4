const planesDetalle = document.querySelector("#plan");
const btnVolver = document.querySelector(".volver");
arrayPlanes = []
let planLS = JSON.parse(localStorage.getItem('plan'))
console.table(planLS);


btnVolver.addEventListener("click", () => location.href = "index.html")