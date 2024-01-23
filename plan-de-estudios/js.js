document.addEventListener("DOMContentLoaded", function () {


const materias = [
    {
        nom: "Lectura y escritura académica",
        horaSem: 	5,
        cred: 10,
        chorar: 90,
        ord: 1,
        id: 1,
    },
    {
        nom: "Matemática",
        horaSem: 5,
        cred: 10,
        chorar: 90,
        ord: 1,
        id: 2
    },
    {
        nom: "Elementos de programación y lógica",
        horaSem: 5,
        cred: 10,
        chorar: 90,
        ord: 1,
        id: 3
    },
    {
        nom: "Matemática I",
        horaSem: 8,
        cred: 16,
        chorar: 144,
        ord: 2,
        id: 4,
        req: [2, 3]
    },
    {
        nom: "Introducción a la Programación",
        horaSem: 8,
        cred: 16,
        chorar: 144,
        ord: 2,
        id: 5,
        req: [3],
    },
    {
        nom: "Organización de Computadoras",
        horaSem: 6,
        cred: 12,
        chorar: 108,
        ord: 2,
        id: 6,
        req: [3],
    },
    {
        nom: "Estructuras de Datos",
        horaSem: 8,
        cred: 16,
        chorar: 144,
        ord: 3,
        id: 7,
        req: [3, 5],
    },
    {
        nom: "Programación con Objetos I",
        horaSem: 8,
        cred: 16,
        chorar: 144,
        ord: 3,
        id: 8,
        req: [3, 5],
    },
    {
        nom: "Bases de Datos",
        horaSem: 6,
        cred: 12,
        chorar: 108,
        ord: 3,
        id: 9,
    },
    {
        nom: "Matemática II",
        horaSem: 4,
        cred: 8,
        chorar: 72,
        ord: 3,
        id: 10,
        req: [2, 3, 4],
    },
    {
        nom: "Redes de Computadoras",
        horaSem: 6,
        cred: 12,
        chorar: 108,
        ord: 3,
        id: 11,
        req: [3,6],
    },
    {
        nom: "Sistemas Operativos",
        horaSem: 6,
        cred: 12,
        chorar: 108,
        ord: 3,
        id: 12,
        req: [3,5,6],
    },
    {
        nom: "Programación con Objetos II",
        horaSem: 6,
        cred: 12,
        chorar: 108,
        ord: 4,
        id: 13,
        req:[3,5,8],
    },
    {
        nom: "Programación Funcional",
        horaSem: 4,
        cred: 8,
        chorar: 72,
        ord: 4,
        id: 14,
        req:[3,5,7],
    },
    {
        nom: "Laboratorio de Sistemas Operativos y Redes",
        horaSem: 4,
        cred: 8,
        chorar: 72,
        ord: 4,
        id: 15,
        req:[3,5,6,11,12],
    },
    {
        nom: "Construcción de Interfaces de Usuario",
        horaSem: 6,
        cred: 12,
        chorar: 108,
        ord: 5,
        id: 16,
        req:[3,5,8,13],
    },
    {
        nom: "Algoritmos",
        horaSem: 6,
        cred: 12,
        chorar: 108,
        ord: 5,
        id: 17,
        req:[3,5,7,14],
    },
    {
        nom: "Estrategias de Persistencia",
        horaSem: 6,
        cred: 12,
        chorar: 108,
        ord: 5,
        id: 18,
        req:[3,5,8,9,13],
    },
]

materias.forEach(materia => {
    materia.aprobada = false;
});

function areMateriasRequeridasAprobadas(materia) {
    return materia.req ? materia.req.every(reqId => {
        const materiaRequerida = materias.find(m => m.id === reqId);
        return materiaRequerida ? materiaRequerida.aprobada : false;
    }) : true;
}

function crearHtmlMateria(materia) {
    const nombre = materia.nom;
    const horasSemanales = materia.horaSem;
    const creditos = materia.cred;
    const cargaHorariaTotal = materia.chorar;
    const id = materia.id;
    const ord = materia.ord; // Nuevo valor "ord"

    const materiasRequeridasAprobadas = areMateriasRequeridasAprobadas(materia);

    const checklistHtml = `
        <div class="checklist">
            <input type="checkbox" id="check_${id}" ${materia.aprobada ? 'checked' : ''}>
            <label for="check_${id}">Aprobada</label>
        </div>
    `;

    const html = `
        <div class="accordion-item">
            <h2 class="accordion-header" id="heading_${materia.id}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_${materia.id}" aria-expanded="false" aria-controls="collapse_${materia.id}}">
                    ${nombre}
                </button>
            </h2>
            <div id="collapse_${materia.id}" class="accordion-collapse collapse" aria-labelledby="heading_${materia.id}" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    ${checklistHtml}
                    <p>Horas semanales: <strong>${horasSemanales}</strong></p>
                    <p>Créditos: <strong>${creditos}</strong></p>
                    <p>Carga Horaria Total: <strong>${cargaHorariaTotal}</strong></p>
                </div>
            </div>
        </div>
    `;

    return html;
}

const divCintro = document.getElementsByClassName("div-acor")[0];

function updateMateriasList() {
    // Limpiar el contenedor antes de volver a crear las materias
    divCintro.innerHTML = '';

    // Agrupar las materias por su valor "ord"
    const materiasPorColumna = {};
    materias.forEach((materia) => {
        if (!materia.req || (materia.req && areMateriasRequeridasAprobadas(materia))) {
            const htmlResultante = crearHtmlMateria(materia);
            if (!materiasPorColumna[materia.ord]) {
                materiasPorColumna[materia.ord] = [];
            }
            materiasPorColumna[materia.ord].push(htmlResultante);
        }
    });

    // Insertar las materias en las columnas
    for (const columna in materiasPorColumna) {
        const divColumna = document.createElement('div');
        divColumna.className = 'column-container'; // Agregar la clase 'column-container'
        divColumna.innerHTML = materiasPorColumna[columna].join('');
        divCintro.appendChild(divColumna);
    }

    // Manejar el evento de cambio de la casilla de verificación
    materias.forEach((materia) => {
        const checkbox = document.getElementById(`check_${materia.id}`);
        checkbox.addEventListener("change", function (event) {
            materia.aprobada = event.target.checked;
            updateMateriasList(); // Volver a generar la lista al cambiar una materia
        });
    });
}

// Crear la lista inicial
updateMateriasList();

});