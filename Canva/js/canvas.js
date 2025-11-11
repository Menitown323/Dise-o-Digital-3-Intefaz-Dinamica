import { Circulo, Cuadrado, Linea, Sticker } from "./figuras.js";

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

let trazoIniciado = false;
let urlSticker = null;

const figuras = [];
let figura = null;

let opcion = "lapiz";

let posicionesCursor = {
    iniciales: { x: 0, y: 0 },
    actuales: { x: 0, y: 0 },
    finales: { x: 0, y: 0 }
};


function getConfig() {
    return {
        linea: document.querySelector("#color_linea").value,
        relleno: document.querySelector("#color_relleno").value,
        grosor: parseInt(document.querySelector("#grosor_linea").value),
        conRelleno: document.querySelector("#con_relleno").checked
    };
}

document.querySelector("#boton_circulo").addEventListener("click", () => opcion = "circulo");
document.querySelector("#boton_cuadrado").addEventListener("click", () => opcion = "cuadrado");
document.querySelector("#boton_lapiz").addEventListener("click", () => opcion = "lapiz");
document.querySelector("#boton_linea").addEventListener("click", () => opcion = "linea");
document.querySelector("#boton_sticker").addEventListener("click", () => opcion = "sticker");
document.querySelector("#boton_borrador").addEventListener("click", () => opcion = "borrador");

document.querySelector("#boton_limpiar").addEventListener("click", () => {
    figuras.length = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

document.querySelector("#boton_deshacer").addEventListener("click", () => {
    figuras.pop();
    renderizarFiguras();
});

canvas.addEventListener("mousedown", event => {
    trazoIniciado = true;
    posicionesCursor.iniciales = registrarPosicionCursor(event);

    if (opcion === "lapiz" || opcion === "borrador") {
        const cfg = getConfig();

        figura = new Linea(
            posicionesCursor.iniciales.x,
            posicionesCursor.iniciales.y,
            posicionesCursor.iniciales.x,
            posicionesCursor.iniciales.y,
            opcion === "borrador" ? "white" : cfg.linea,
            cfg.grosor
        );

        figuras.push(figura);
    }
});

canvas.addEventListener("mousemove", event => {
    posicionesCursor.actuales = registrarPosicionCursor(event);

    if (!trazoIniciado) return;

    const cfg = getConfig();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    renderizarFiguras();

    switch (opcion) {
        case "lapiz":
        case "borrador":
            figura.fin_x = posicionesCursor.actuales.x;
            figura.fin_y = posicionesCursor.actuales.y;

            figura = new Linea(
                figura.fin_x,
                figura.fin_y,
                figura.fin_x,
                figura.fin_y,
                opcion === "borrador" ? "white" : cfg.linea,
                cfg.grosor
            );

            figuras.push(figura);
            renderizarFiguras();
            break;

        case "cuadrado":
            figura = new Cuadrado(
                posicionesCursor.iniciales.x,
                posicionesCursor.iniciales.y,
                posicionesCursor.actuales.x,
                posicionesCursor.actuales.y,
                cfg.linea,
                cfg.conRelleno ? cfg.relleno : "transparent",
                cfg.grosor
            );
            figura.dibujar(ctx);
            break;

        case "circulo":
            figura = new Circulo(
                posicionesCursor.iniciales.x,
                posicionesCursor.iniciales.y,
                posicionesCursor.actuales.x,
                posicionesCursor.actuales.y,
                cfg.linea,
                cfg.conRelleno ? cfg.relleno : "transparent",
                cfg.grosor
            );
            figura.dibujar(ctx);
            break;

        case "linea":
            figura = new Linea(
                posicionesCursor.iniciales.x,
                posicionesCursor.iniciales.y,
                posicionesCursor.actuales.x,
                posicionesCursor.actuales.y,
                cfg.linea,
                cfg.grosor
            );
            figura.dibujar(ctx);
            break;

        case "sticker":
            if (!urlSticker) return;

            figura = new Sticker(
                posicionesCursor.iniciales.x,
            posicionesCursor.iniciales.y,
            posicionesCursor.actuales.x,
            posicionesCursor.actuales.y,
            urlSticker
            );

            figura.dibujar(ctx);
            break;

    }
});

canvas.addEventListener("mouseup", event => {
    trazoIniciado = false;
    posicionesCursor.finales = registrarPosicionCursor(event);

    const cfg = getConfig();

    switch (opcion) {
        case "cuadrado":
            figura = new Cuadrado(
                posicionesCursor.iniciales.x,
                posicionesCursor.iniciales.y,
                posicionesCursor.finales.x,
                posicionesCursor.finales.y,
                cfg.linea,
                cfg.conRelleno ? cfg.relleno : "transparent",
                cfg.grosor
            );
            break;

        case "circulo":
            figura = new Circulo(
                posicionesCursor.iniciales.x,
                posicionesCursor.iniciales.y,
                posicionesCursor.finales.x,
                posicionesCursor.finales.y,
                cfg.linea,
                cfg.conRelleno ? cfg.relleno : "transparent",
                cfg.grosor
            );
            break;

        case "linea":
            figura = new Linea(
                posicionesCursor.iniciales.x,
                posicionesCursor.iniciales.y,
                posicionesCursor.finales.x,
                posicionesCursor.finales.y,
                cfg.linea,
                cfg.grosor
            );
            break;

        case "sticker":
            if (!urlSticker) return;

            figura = new Sticker(
                posicionesCursor.iniciales.x,
                posicionesCursor.iniciales.y,
                posicionesCursor.finales.x,
                posicionesCursor.finales.y,
                urlSticker
            );
            break;


        default:
            figura = null;
    }

    if (figura) figuras.push(figura);
    renderizarFiguras();
});

function registrarPosicionCursor(event) {
    return {
        x: event.offsetX,
        y: event.offsetY
    };
}

function renderizarFiguras() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    figuras.forEach(f => f.dibujar(ctx));
}

document.querySelector("#seleccionar_imagen").addEventListener("change", CargarImagen);

function CargarImagen(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== "image/png" && file.type !== "image/jpeg") return;

    const lector = new FileReader();
    lector.onload = e => {
        urlSticker = e.target.result;
        document.querySelector("#imagen-seleccionada-preview").style.backgroundImage =
            `url(${urlSticker})`;
    };
    lector.readAsDataURL(file);
}
