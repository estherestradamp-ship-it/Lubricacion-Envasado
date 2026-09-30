// =====================================================
// DATOS DE LOS PUNTOS DE LUBRICACIÓN
// =====================================================

const puntosLubricacion = [

    {
        id: 1,
        x: 15,
        y: 25,
        componente: "Engranaje de sincronización",
        lubricante: "Grasa",
        cantidad: "20 g",
        frecuencia: "Semanal",
        ultima: "25/09/2026",
        proxima: "02/10/2026",
        estado: "green",
        observacion: "Lubricación realizada normalmente."
    },

    {
        id: 2,
        x: 25,
        y: 35,
        componente: "Rodamiento inferior estrella de entrada",
        lubricante: "Grasa",
        cantidad: "15 g",
        frecuencia: "Mensual",
        ultima: "01/09/2026",
        proxima: "01/10/2026",
        estado: "yellow",
        observacion: "Próxima lubricación programada."
    },

    {
        id: 3,
        x: 35,
        y: 45,
        componente: "Rodamiento",
        lubricante: "Grasa",
        cantidad: "15 g",
        frecuencia: "Mensual",
        ultima: "01/09/2026",
        proxima: "01/10/2026",
        estado: "green",
        observacion: "Sin novedades."
    },

    {
        id: 4,
        x: 48,
        y: 30,
        componente: "Cadena de transmisión",
        lubricante: "Aceite",
        cantidad: "10 ml",
        frecuencia: "Semanal",
        ultima: "20/09/2026",
        proxima: "27/09/2026",
        estado: "red",
        observacion: "Lubricación pendiente."
    },

    {
        id: 5,
        x: 60,
        y: 50,
        componente: "Rodamiento principal",
        lubricante: "Grasa",
        cantidad: "20 g",
        frecuencia: "Mensual",
        ultima: "15/09/2026",
        proxima: "15/10/2026",
        estado: "green",
        observacion: "Condición normal."
    },

    {
        id: 6,
        x: 72,
        y: 65,
        componente: "Eje de transmisión",
        lubricante: "Grasa",
        cantidad: "15 g",
        frecuencia: "Mensual",
        ultima: "10/09/2026",
        proxima: "10/10/2026",
        estado: "green",
        observacion: "Sin novedades."
    },

    {
        id: 7,
        x: 82,
        y: 40,
        componente: "Rodamiento",
        lubricante: "Grasa",
        cantidad: "15 g",
        frecuencia: "Semanal",
        ultima: "24/09/2026",
        proxima: "01/10/2026",
        estado: "yellow",
        observacion: "Próxima ejecución."
    }

];


// =====================================================
// CREAR LOS PUNTOS
// =====================================================

function crearPuntos() {

    const contenedor =
        document.getElementById(
            "lubricationPoints"
        );

    contenedor.innerHTML = "";


    puntosLubricacion.forEach(punto => {

        const elemento =
            document.createElement("div");


        elemento.className =
            `lubrication-point ${punto.estado}`;


        elemento.innerText =
            punto.id;


        elemento.style.left =
            punto.x + "%";


        elemento.style.top =
            punto.y + "%";


        elemento.title =
            `Punto ${punto.id}`;


        elemento.addEventListener(
            "click",
            () => mostrarDetalle(punto)
        );


        contenedor.appendChild(elemento);

    });

}


// =====================================================
// MOSTRAR DETALLE
// =====================================================

function mostrarDetalle(punto) {

    document
        .getElementById("emptyPanel")
        .classList.add("hidden");


    document
        .getElementById("pointPanel")
        .classList.remove("hidden");


    document
        .getElementById("pointNumber")
        .innerText =
        `Punto ${String(punto.id).padStart(2, "0")}`;


    document
        .getElementById("component")
        .innerText =
        punto.componente;


    document
        .getElementById("lubricant")
        .innerText =
        punto.lubricante;


    document
        .getElementById("quantity")
        .innerText =
        punto.cantidad;


    document
        .getElementById("frequency")
        .innerText =
        punto.frecuencia;


    document
        .getElementById("lastDate")
        .innerText =
        punto.ultima;


    document
        .getElementById("nextDate")
        .innerText =
        punto.proxima;


    document
        .getElementById("observation")
        .innerText =
        punto.observacion;


    const estado =
        document.getElementById(
            "pointStatus"
        );


    estado.className =
        `status ${punto.estado}`;


    if (punto.estado === "green") {

        estado.innerText = "OK";

    }

    if (punto.estado === "yellow") {

        estado.innerText = "PRÓXIMO";

    }

    if (punto.estado === "red") {

        estado.innerText = "VENCIDO";

    }

}


// =====================================================
// ACTUALIZAR KPIs
// =====================================================

function actualizarKPIs() {

    const total =
        puntosLubricacion.length;


    const ok =
        puntosLubricacion.filter(
            p => p.estado === "green"
        ).length;


    const proximos =
        puntosLubricacion.filter(
            p => p.estado === "yellow"
        ).length;


    const vencidos =
        puntosLubricacion.filter(
            p => p.estado === "red"
        ).length;


    document
        .getElementById("totalPuntos")
        .innerText = total;


    document
        .getElementById("puntosOK")
        .innerText = ok;


    document
        .getElementById("puntosProximos")
        .innerText = proximos;


    document
        .getElementById("puntosVencidos")
        .innerText = vencidos;

}


// =====================================================
// INICIO
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        crearPuntos();

        actualizarKPIs();

    }
);
