import { Videojuego } from "./definiciones.js";
import { GestorVideojuegos } from "./gestorVideojuegos.js";
import { ControladorVista } from "./controladorVista.js";
import { convertir_de_JSON_a_Objeto } from "./ayudas.js";

/**
 * Función principal que inicializa la aplicación
 */
async function inicializarAplicacion() {
    try {
        // Inicializar gestor
        const gestorVideojuegos = new GestorVideojuegos();
        
        // Cargar datos desde JSON
        const datosJSON = await convertir_de_JSON_a_Objeto('./js/videojuegos.json');
        const videojuegos = datosJSON.map(item => 
            new Videojuego(item.id, item.titulo, item.descripcion, item.plataforma || 'No especificada')
        );
        
        gestorVideojuegos.cargarListaVideojuegos(videojuegos);
        
        // Inicializar controlador de vista
        const controladorVista = new ControladorVista(gestorVideojuegos);
        controladorVista.inicializar();
        
        console.log('Aplicación inicializada correctamente');
    } catch (error) {
        console.error('Error al inicializar la aplicación:', error);
        document.querySelector('#mensaje_error').textContent = 'Error al cargar la aplicación: ' + error.message;
        document.querySelector('#mensaje_error').hidden = false;
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', inicializarAplicacion);