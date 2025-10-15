/*
import { Videojuego } from "./definiciones.js";
import { GestorVideojuegos } from "./gestorVideojuegos.js";
//import { EliminarVideojuegoPorID } from "./gestorVideojuegos.js"
const formulario = document.querySelector("#formulario_agregar");
const contenedor_elementos = document.querySelector('#contenedor_elementos_juegos');
let videojuegos = [
    new Videojuego(1, "The Legend of Zelda: Tears of the Kingdom", "Explora los cielos de Hyrule con nuevas habilidades y un vasto mundo abierto lleno de secretos."),
    new Videojuego(2, "Hollow Knight", "Un metroidvania oscuro y desafiante ambientado en un reino subterráneo lleno de insectos y misterios."),
    new Videojuego(3, "Red Dead Redemption 2", "Vive la historia de un forajido en el salvaje oeste con un mundo realista y emocional."),
    new Videojuego(4, "Elden Ring", "Un mundo abierto de fantasía oscura creado por FromSoftware con desafíos épicos y libertad total."),
    new Videojuego(5, "Cyberpunk 2077", "Explora Night City, una megaciudad futurista llena de tecnología, crimen y decisiones morales."),
    new Videojuego(6, "Minecraft", "Construye, explora y sobrevive en un mundo infinito hecho completamente de bloques."),
    new Videojuego(7, "Overwatch 2", "Shooter por equipos donde héroes únicos luchan en intensas batallas multijugador."),
    new Videojuego(8, "God of War: Ragnarök", "Acompaña a Kratos y Atreus en una épica aventura nórdica para enfrentar el fin del mundo."),
    new Videojuego(9, "Assassin’s Creed Mirage", "Vuelve a los orígenes de la saga con sigilo, parkour y una narrativa ambientada en Bagdad."),
    new Videojuego(10, "Hades", "Un roguelike lleno de acción en el que escapas del inframundo luchando contra dioses y monstruos."),
    new Videojuego(11, "The Witcher 3: Wild Hunt", "Embárcate con Geralt de Rivia en una búsqueda épica para encontrar a Ciri en un mundo lleno de monstruos."),
    new Videojuego(12, "Among Us", "Juego social donde debes descubrir quién es el impostor dentro de la tripulación espacial."),
    new Videojuego(13, "Celeste", "Plataformas precisas que narran una historia sobre superación personal y salud mental."),
    new Videojuego(14, "Horizon Forbidden West", "Explora tierras postapocalípticas llenas de criaturas robóticas y tribus misteriosas."),
    new Videojuego(15, "Cuphead", "Un juego de disparos con estética de caricaturas clásicas y combates contra jefes desafiantes."),
    new Videojuego(16, "Dead Space Remake", "Terror espacial en una nave infestada de necromorfos, con una atmósfera intensa y visuales modernos."),
    new Videojuego(17, "Genshin Impact", "Juego de rol de mundo abierto con exploración, combates elementales y una historia envolvente."),
    new Videojuego(18, "Starfield", "Explora el espacio, crea tu nave y vive aventuras intergalácticas con cientos de planetas por descubrir."),
    new Videojuego(19, "Terraria", "Aventura sandbox en 2D con exploración, construcción, combate y jefes épicos."),
    new Videojuego(20, "Little Nightmares II", "Un inquietante juego de plataformas y terror psicológico con una atmósfera sombría.")
];
 //llenar con 10 elementos
 

const obtener_datos_formulario = (event)=>{
    console.log("funcion para obtener datos");
    const datos_formulario = new FormData(formulario);//Lee el formulario y obtiene los datos
    const datos = Object.fromEntries(datos_formulario.entries());//Convertimos en objeto
    try{
        if(!datos.titulo || !datos.descripcion){
            throw new Error('No se han ingresado los datos');
        }
        //aqui hace la logica para crear los videojuegos
        
    videojuegos.push(new Videojuego(videojuegos.let+1,datos.titulo, datos.descripcion));

    
    if (videojuegos.length > 0){
        const ultimo_videojuego = videojuegos[videojuegos.length -1];
        crearElementoVista(ultimo_videojuego.titulo, ultimo_videojuego.descripcion);
        //crearElementoVista(videojuegos[0].titulo, videojuegos[0].descripcion);    
    }

    eliminar_videojuego(videojuegos.length);

    }catch(error){
        document.querySelector("#mensaje_error").hidden = false;
        document.querySelector("#mensaje_error").textContent = error.message;
    }
};

function eliminar_videojuego(id){
    const videojuego_a_eliminar = videojuegos.filter(videojuego => videojuego.id === id);
    try{
        if(!videojuego_a_eliminar){
            throw new Error('No se puede eliminar el juego ya que no existe');
        }
        videojuegos.splice();
        console.log('puedo eliminar el juego');

    }catch(error){
    console.log(error)
    }    
}

export const crearElementoVista = (titulo_videojuego, descripcion_videojuego) =>{
 
   const elemento = document.createElement('div');
   elemento.classList.add("elemento-lista-juegos");
 
   const titulo = document.createElement('h1');
   titulo.textContent = titulo_videojuego;
 
   const descripcion = document.createElement('p');
   descripcion.textContent = descripcion_videojuego;
   
   const boton_editar = document.createElement('button');
   boton_editar.classList.add('editar');
   boton_editar.textContent = 'Editar';
   
   const boton_eliminar = document.createElement('button');
   boton_eliminar.classList.add('eliminar');
   boton_eliminar.textContent = 'Eliminar';

   elemento.appendChild(titulo);
   elemento.appendChild(descripcion);
   elemento.appendChild(boton_editar);
   elemento.appendChild(boton_eliminar);
   contenedor_elementos.appendChild(elemento);
 
};


document.querySelector("#boton_agregar").addEventListener('click', ()=>{
    obtener_datos_formulario();
});*/