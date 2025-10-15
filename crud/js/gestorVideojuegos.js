export class GestorVideojuegos {
    constructor() {
        this.listaVideojuegos = [];
    }

    /**
     * Obtiene la lista completa de videojuegos
     */
    obtenerLista() {
        try {
            if (!this.listaVideojuegos) {
                throw new Error('La lista de videojuegos no ha sido inicializada');
            }
            return this.listaVideojuegos;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    /**
     * Obtiene un videojuego por su ID

     */
    obtenerPorId(id) {
        try {
            if (!this.listaVideojuegos) {
                throw new Error('La lista de videojuegos no ha sido inicializada');
            }
            
            const videojuego = this.listaVideojuegos.find(v => v.id === id);
            if (!videojuego) {
                throw new Error(`No se encontró un videojuego con el id: ${id}`);
            }
            return videojuego;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    /**
     * Agrega un nuevo videojuego a la lista
     */
    agregar(videojuego) {
        try {
            if (!this.listaVideojuegos) {
                throw new Error('La lista de videojuegos no se ha inicializado');
            }
            if (!videojuego) {
                throw new Error('El videojuego enviado es nulo');
            }
            if (!videojuego.titulo || !videojuego.descripcion || !videojuego.plataforma) {
                throw new Error('Todos los campos son obligatorios');
            }
            
            // Generar ID único
            const nuevoId = this.listaVideojuegos.length > 0 
                ? Math.max(...this.listaVideojuegos.map(v => v.id)) + 1 
                : 1;
            videojuego.id = nuevoId;
            
            this.listaVideojuegos.push(videojuego);
            return videojuego;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    /**
     * Actualiza los datos de un videojuego existente
     */
    actualizar(id, nuevosDatos) {
        try {
            if (!this.listaVideojuegos) {
                throw new Error('No se ha inicializado la lista de videojuegos');
            }
            
            const indice = this.listaVideojuegos.findIndex(v => v.id === id);
            if (indice === -1) {
                throw new Error('No se ha encontrado el ID en la lista de videojuegos');
            }
            
            // Validar campos obligatorios
            if (!nuevosDatos.titulo || !nuevosDatos.descripcion || !nuevosDatos.plataforma) {
                throw new Error('Todos los campos son obligatorios');
            }
            
            this.listaVideojuegos[indice] = { ...this.listaVideojuegos[indice], ...nuevosDatos };
            return this.listaVideojuegos[indice];
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    /**
     * Elimina un videojuego por su ID
     */
    eliminar(id) {
        try {
            if (!this.listaVideojuegos) {
                throw new Error('No se ha cargado la lista de videojuegos');
            }
            
            const indice = this.listaVideojuegos.findIndex(v => v.id === id);
            if (indice === -1) {
                throw new Error(`No se ha encontrado el elemento con el ID: ${id}`);
            }
            
            this.listaVideojuegos.splice(indice, 1);
            return true;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    /**
     * Carga una lista de videojuegos
     */
    cargarListaVideojuegos(arreglo_videojuegos) {
        this.listaVideojuegos = arreglo_videojuegos;
    }
}