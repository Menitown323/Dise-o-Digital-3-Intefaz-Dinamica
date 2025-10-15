import { GestorVideojuegos } from './gestorVideojuegos.js';

export class ControladorVista {
    constructor(gestorVideojuegos) {
        this.gestor = gestorVideojuegos;
        this.contenedorElementos = document.querySelector('#contenedor_elementos_juegos');
        this.formulario = document.querySelector('#formulario_agregar');
        this.mensajeError = document.querySelector('#mensaje_error');
        this.videojuegoEditando = null;
    }

    // Inicializa el controlador
    inicializar() {
        this.actualizarVista();
        this.configurarEventos();
    }

    // Configura los event listeners
    configurarEventos() {
        document.querySelector('#boton_agregar').addEventListener('click', () => {
            this.manejarAgregarOActualizar();
        });
    }

    // Maneja agregar o actualizar videojuego
    manejarAgregarOActualizar() {
        const datosFormulario = this.obtenerDatosFormulario();
        
        if (!datosFormulario) return;

        try {
            if (this.videojuegoEditando) {
                this.gestor.actualizar(this.videojuegoEditando.id, datosFormulario);
                this.videojuegoEditando = null;
                this.mostrarMensaje('Videojuego actualizado correctamente', 'exito');
                document.querySelector('#boton_agregar').textContent = 'Agregar';
            } else {
                this.gestor.agregar(datosFormulario);
                this.mostrarMensaje('Videojuego agregado correctamente', 'exito');
            }
            
            this.limpiarFormulario();
            this.actualizarVista();
        } catch (error) {
            this.mostrarMensaje(error.message, 'error');
        }
    }

    // Obtiene datos del formulario
    obtenerDatosFormulario() {
        const titulo = document.querySelector('input[name="titulo"]').value.trim();
        const descripcion = document.querySelector('input[name="descripcion"]').value.trim();
        const plataforma = document.querySelector('input[name="plataforma"]').value.trim();

        if (!titulo || !descripcion || !plataforma) {
            this.mostrarMensaje('Todos los campos son obligatorios', 'error');
            return null;
        }
        
        return { titulo, descripcion, plataforma };
    }

    // Actualiza la vista con los videojuegos
    actualizarVista() {
        this.contenedorElementos.innerHTML = '';
        const videojuegos = this.gestor.obtenerLista();
        
        videojuegos.forEach(videojuego => {
            this.crearElementoVista(videojuego);
        });
    }

    // Crea elemento HTML para un videojuego
    crearElementoVista(videojuego) {
        const elemento = document.createElement('div');
        elemento.classList.add('elemento-lista-juegos');
        elemento.setAttribute('data-id', videojuego.id);

        elemento.innerHTML = `
            <h2>${videojuego.titulo}</h2>
            <p><strong>Descripción:</strong> ${videojuego.descripcion}</p>
            <p><strong>Plataforma:</strong> ${videojuego.plataforma}</p>
            <div class="contenedor-botones">
                <button class="editar" data-id="${videojuego.id}">Editar</button>
                <button class="eliminar" data-id="${videojuego.id}">Eliminar</button>
            </div>
        `;

        elemento.querySelector('.editar').addEventListener('click', () => {
            this.iniciarEdicion(videojuego.id);
        });

        elemento.querySelector('.eliminar').addEventListener('click', () => {
            this.eliminarVideojuego(videojuego.id);
        });

        this.contenedorElementos.appendChild(elemento);
    }

    // Inicia edición de videojuego
    iniciarEdicion(id) {
        try {
            const videojuego = this.gestor.obtenerPorId(id);
            this.videojuegoEditando = videojuego;
            
            document.querySelector('input[name="titulo"]').value = videojuego.titulo;
            document.querySelector('input[name="descripcion"]').value = videojuego.descripcion;
            document.querySelector('input[name="plataforma"]').value = videojuego.plataforma;
            
            document.querySelector('#boton_agregar').textContent = 'Actualizar';
        } catch (error) {
            this.mostrarMensaje(error.message, 'error');
        }
    }

    // Elimina videojuego preguntar
    eliminarVideojuego(id) {
        try {
            this.gestor.eliminar(id);
            this.mostrarMensaje('Videojuego eliminado correctamente', 'exito');
            this.actualizarVista();
        } catch (error) {
            this.mostrarMensaje(error.message, 'error');
        }
    }

    // Limpia formulario
    limpiarFormulario() {
        this.formulario.reset();
    }

    // Muestra mensajes
    mostrarMensaje(mensaje, tipo = 'info') {
        this.mensajeError.textContent = mensaje;
        this.mensajeError.hidden = false;
        this.mensajeError.className = `mensaje ${tipo}`;
        
        setTimeout(() => {
            this.mensajeError.hidden = true;
        }, 5000);
    }
}