const { DateTime } = require('luxon');

const DiasDic = 31;
const MesSelec = "Diciembre";
const JornadaLaboral = 8.5;
let horasExtras = new Array(DiasDic).fill(0);


const TitMes = document.getElementById("tit-1")
const DiaContenedor = document.getElementById("div-dia")
const HoraEntradaContenedor = document.getElementById("div-ent")
const HoraSalidaContenedor = document.getElementById("div-sal")
const ExtraContenedor = document.getElementById("div-ext")

TitMes.textContent = `Mes ${MesSelec}`

for (let i = 1; i <= DiasDic; i++) {
    const divDia = document.createElement("div");
    divDia.className = "div-dia-box";
    const pDia = document.createElement("p");
    pDia.textContent = `${i}`;
    pDia.className = "div-dia-p";
    DiaContenedor.appendChild(divDia);
    divDia.appendChild(pDia);
    const inputEnt = document.createElement("input");
    inputEnt.className = "div-ent-box";
    inputEnt.type = "time";
    HoraEntradaContenedor.appendChild(inputEnt);

    const inputSal = document.createElement("input");
    inputSal.className = "div-sal-box";
    inputSal.type = "time";
    HoraSalidaContenedor.appendChild(inputSal);

    const divExt = document.createElement("div");
    divExt.className = "div-ext-box";
    const pExtra = document.createElement("p");
    pExtra.textContent = 0;
    pExtra.className = "div-ext-p";
    ExtraContenedor.appendChild(divExt);
    divExt.appendChild(pExtra);

    inputSal.addEventListener("change", function (){
    let horaEntrada = inputEnt.value;
    let horaSalida = inputSal.value;
    console.log(`Día ${i}: Hora de Entrada - ${horaEntrada}, Hora de Salida - ${horaSalida}`);
    let fechaEntrada = new Date(`2023-12-${i}T${horaEntrada}:00`);
    let fechaSalida = new Date(`2023-12-${i}T${horaSalida}:00`);

    if(!isNaN(fechaEntrada) && !isNaN(fechaSalida)){
        let diferenciaEnMilisegundos = fechaSalida - fechaEntrada;
        let diferenciaEnHoras = diferenciaEnMilisegundos / (1000 * 60 * 60);
        horasExtras[i - 1] = Math.max(diferenciaEnHoras - JornadaLaboral, 0);
        pExtra.textContent = horasExtras[i - 1].toFixed(2);
        console.log(`Día ${i}: Horas Extras - ${horasExtras[i - 1].toFixed(2)}`);
    } else {
        horasExtras[i - 1] = 0;
        pExtra.textContent = 0;
        console.log(`Día ${i}: Fechas Inválidas`);
    }
})
}