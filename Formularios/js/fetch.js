const url_api = "https://pokeapi.co/api/v2/pokemon";

// Función que llama a la API principal
function conexionFetch() {
  fetch(url_api)
    .then(respuesta => {
      if (respuesta.ok) {
        return respuesta.json();
      } else {
        throw new Error("Error en la petición: " + respuesta.status);
      }
    })
    .then(datos => {
      datos.results.forEach(pokemon => {
        // Llamar a cada URL de Pokémon
        peticionAJAX(pokemon.url);
      });
    })
}

// Función AJAX que obtiene cada Pokémon individual
function peticionAJAX(url) {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', url, true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      const datos = JSON.parse(xhr.responseText);
      crearPokemon(datos);
    } else {
      console.error("Error en la petición AJAX: ", xhr.status);
    }
  };
  xhr.send();
}

// Crea tarjeta de cada Pokémon
function crearPokemon(pokemon) {
  console.log(pokemon.name);
  console.log(pokemon.sprites);

  const contenedor = document.createElement('div');
  contenedor.classList.add('contenedor'); // usa la clase que tienes en tu CSS

  const imagen = document.createElement('img');
  imagen.src = pokemon.sprites.front_default;
  imagen.classList.add('imagen-pokemon');
  contenedor.appendChild(imagen);

  const nombre = document.createElement('p');
  nombre.textContent = pokemon.name;
  contenedor.appendChild(nombre);

  // Agregamos al div pokemones en vez de body directamente
  document.getElementById('pokemones').appendChild(contenedor);
}
