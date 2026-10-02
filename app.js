// ======================================================
// MAPA DE LUBRICACIÓN - ETIQUETADORA
// ======================================================

// ------------------------------------------------------
// COMPONENTES REALES DE LA LEYENDA
// ------------------------------------------------------

const componentes = [
    {
        id: 1,
        componente: "Engranaje de sincronización principal, conformado por la estrella de entrada al carrusel (estrella 6) y la estrella de salida del carrusel (estrella 9)"
    },
    {
        id: 2,
        componente: "Rodamiento inferior de la estrella de entrada z15-16-5"
    },
    {
        id: 3,
        componente: "Rodamiento superior de la estrella de entrada z15-16-5"
    },
    {
        id: 4,
        componente: "Rodamiento inferior de la estrella de entrada al carrusel z15-16-6"
    },
    {
        id: 5,
        componente: "Rodamiento superior de la estrella de entrada al carrusel z15-16-6"
    },
    {
        id: 6,
        componente: "Rodamiento inferior de la estrella de salida del carrusel z15-16-9"
    },
    {
        id: 7,
        componente: "Rodamiento superior de la estrella de salida del carrusel z15-16-9"
    },
    {
        id: 8,
        componente: "Rodamiento inferior de la estrella de salida z12-16-10"
    },
    {
        id: 9,
        componente: "Rodamiento superior de la estrella de salida z12-16-10"
    },
    {
        id: 10,
        componente: "Engranaje de accionamiento principal del carrusel porta botellas"
    },
    {
        id: 11,
        componente: "Engranaje de sincronización del sistema de entrada (eje transportadora)"
    },
    {
        id: 12,
        componente: "Eje de sincronización para carrusel sin fin parte inferior"
    },
    {
        id: 13,
        componente: "Carrusel central porta botellas"
    },
    {
        id: 14,
        componente: "Piñón motriz del sistema de cadena unifilar de entrada (eje inferior)"
    },
    {
        id: 15,
        componente: "Engranaje de sincronización entre estrella de salida z12-16-10 y estrella de salida de carrusel z15-19-9"
    },
    {
        id: 16,
        componente: "Eje cardán de transmisión del cilindro de transferencia hacia el carrusel de paletas"
    },
    {
        id: 18,
        componente: "Engranajes de sincronización del cilindro de transferencia con paletas"
    },
    {
        id: 19,
        componente: "Engranaje del sistema de transferencia del cilindro hacia carrusel de paletas"
    },
    {
        id: 26,
        componente: "Eje cardán del sistema de embrague de la etiquetadora"
    },
    {
        id: 27,
        componente: "Eje cardán de transmisión del cilindro de transferencia"
    },
    {
        id: 28,
        componente: "Engranaje del sistema de transferencia (lado embrague)"
    },
    {
        id: 29,
        componente: "Engranaje del sistema de transferencia (lado cilindro)"
    }
];


// ------------------------------------------------------
// POSICIONES
// ------------------------------------------------------

// Aquí estarán las posiciones definitivas.
// x e y están en porcentaje.
//
// EJEMPLO:
//
// {
//     id: 13,
//     x: 44.63,
//     y: 42.00
// }

let puntosLubricacion = JSON.parse(
    localStorage.getItem("puntosLubricacion")
) || [];


// ------------------------------------------------------
// MODO UBICACIÓN
// ------------------------------------------------------

let modoUbicacion = false;


// ------------------------------------------------------
// CARGAR SELECTOR DE COMPONENTES
// ------------------------------------------------------

function cargarComponentes() {

    const selector = document.getElementById("selectorComponente");

    if (!selector) return;

    selector.innerHTML = `
        <option value="">Seleccionar componente...</option>
    `;

    componentes.forEach(item => {

        const option = document.createElement("option");

        option.value = item.id;

        option.textContent = `${item.id} - ${item.componente}`;

        selector.appendChild(option);

    });
}


// ------------------------------------------------------
// ACTIVAR / DESACTIVAR MODO UBICACIÓN
// ------------------------------------------------------

function activarModoUbicacion() {

    modoUbicacion = !modoUbicacion;

    const boton = document.getElementById("btnModoUbicacion");
    const mapa = document.getElementById("machineMap");

    if (modoUbicacion) {

        boton.innerText = "✅ Modo ubicación ACTIVADO";

        boton.classList.add("modo-activo");

        mapa.classList.add("modo-ubicacion");

    } else {

        boton.innerText = "📍 Modo ubicación";

        boton.classList.remove("modo-activo");

        mapa.classList.remove("modo-ubicacion");

    }
}


// ------------------------------------------------------
// CLICK SOBRE LA IMAGEN
// ------------------------------------------------------

function configurarMapa() {

    const imagen = document.getElementById("machineImage");

    if (!imagen) return;

    imagen.addEventListener("click", function(event) {

        if (!modoUbicacion) return;

        const selector = document.getElementById("selectorComponente");

        const idSeleccionado = Number(selector.value);

        if (!idSeleccionado) {

            alert("Primero selecciona el componente.");

            return;
        }


        // -----------------------------------------------
        // CALCULAR COORDENADAS
        // -----------------------------------------------

        const rect = imagen.getBoundingClientRect();

        const x = ((event.clientX - rect.left) / rect.width) * 100;

        const y = ((event.clientY - rect.top) / rect.height) * 100;


        // -----------------------------------------------
        // BUSCAR COMPONENTE
        // -----------------------------------------------

        const componente = componentes.find(
            item => item.id === idSeleccionado
        );

        if (!componente) return;


        // -----------------------------------------------
        // CREAR / ACTUALIZAR PUNTO
        // -----------------------------------------------

        const nuevoPunto = {

            id: componente.id,

            x: Number(x.toFixed(2)),

            y: Number(y.toFixed(2)),

            componente: componente.componente,

            estado: "green"

        };


        const indice = puntosLubricacion.findIndex(
            punto => punto.id === idSeleccionado
        );


        if (indice >= 0) {

            puntosLubricacion[indice] = nuevoPunto;

        } else {

            puntosLubricacion.push(nuevoPunto);

        }


        // -----------------------------------------------
        // GUARDAR
        // -----------------------------------------------

        localStorage.setItem(
            "puntosLubricacion",
            JSON.stringify(puntosLubricacion)
        );


        // -----------------------------------------------
        // MOSTRAR
        // -----------------------------------------------

        crearPuntos();


        // -----------------------------------------------
        // MOSTRAR COORDENADAS
        // -----------------------------------------------

        alert(
            `PUNTO ${componente.id}\n\n` +

            `${componente.componente}\n\n` +

            `X = ${x.toFixed(2)} %\n` +

            `Y = ${y.toFixed(2)} %`
        );

    });

}


// ------------------------------------------------------
// CREAR PUNTOS SOBRE LA IMAGEN
// ------------------------------------------------------

function crearPuntos() {

    const mapa = document.getElementById("lubricationPoints");

    if (!mapa) return;

    mapa.innerHTML = "";


    puntosLubricacion.forEach(punto => {

        const boton = document.createElement("button");

        boton.className = "lubrication-point";

        boton.classList.add(punto.estado || "green");

        boton.textContent = punto.id;

        boton.style.left = `${punto.x}%`;

        boton.style.top = `${punto.y}%`;


        boton.title = punto.componente;


        boton.addEventListener("click", function(event) {

            event.stopPropagation();

            mostrarDetalle(punto);

        });


        mapa.appendChild(boton);

    });

}


// ------------------------------------------------------
// MOSTRAR DETALLE
// ------------------------------------------------------

function mostrarDetalle(punto) {

    const panel = document.getElementById("detailPanel");

    if (!panel) {

        alert(
            `Punto ${punto.id}\n\n` +
            punto.componente
        );

        return;
    }


    panel.innerHTML = `

        <div class="detail-card">

            <div class="detail-number">
                PUNTO ${punto.id}
            </div>

            <h2>
                ${punto.componente}
            </h2>

            <div class="detail-row">
                <strong>Estado:</strong>
                <span class="${punto.estado}">
                    ● ${obtenerEstado(punto.estado)}
                </span>
            </div>

            <div class="detail-row">
                <strong>Coordenada X:</strong>
                ${punto.x} %
            </div>

            <div class="detail-row">
                <strong>Coordenada Y:</strong>
                ${punto.y} %
            </div>

        </div>

    `;
}


// ------------------------------------------------------
// ESTADO
// ------------------------------------------------------

function obtenerEstado(estado) {

    if (estado === "green") return "ACEPTABLE";

    if (estado === "yellow") return "PRÓXIMO A VENCER";

    if (estado === "red") return "VENCIDO";

    return "SIN ESTADO";
}


// ------------------------------------------------------
// COPIAR CÓDIGO
// ------------------------------------------------------

function copiarPuntos() {

    if (puntosLubricacion.length === 0) {

        alert("Todavía no has colocado puntos.");

        return;
    }


    const codigo = puntosLubricacion
        .sort((a, b) => a.id - b.id)
        .map(punto => {

            return `{
    id: ${punto.id},
    x: ${punto.x},
    y: ${punto.y},
    componente: "${punto.componente.replace(/"/g, '\\"')}",
    estado: "${punto.estado}"
}`;

        })
        .join(",\n\n");


    navigator.clipboard.writeText(codigo);


    alert(
        "Código copiado.\n\n" +
        "Ahora puedes pegarlo en tu app.js."
    );
}


// ------------------------------------------------------
// BORRAR TODAS LAS POSICIONES
// ------------------------------------------------------

function borrarPuntos() {

    if (
        !confirm(
            "¿Seguro que quieres borrar todas las posiciones?"
        )
    ) return;


    puntosLubricacion = [];

    localStorage.removeItem("puntosLubricacion");

    crearPuntos();

}


// ------------------------------------------------------
// INICIO
// ------------------------------------------------------

document.addEventListener(
    "DOMContentLoaded",
    function() {

        cargarComponentes();

        crearPuntos();

        configurarMapa();

    }
);
