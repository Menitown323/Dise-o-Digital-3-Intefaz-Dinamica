const url_api = "https://pokeapi.co/api/v2/pokemon";


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
        peticionAJAX(pokemon.url);
      });
    })
}

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


function crearPokemon(pokemon) {
  console.log(pokemon.name);
  console.log(pokemon.sprites);
  console.log(pokemon.types);

  const contenedor = document.createElement('div');
  contenedor.classList.add('contenedor'); 

  const imagen = document.createElement('img');
  imagen.src = pokemon.sprites.front_default;
  imagen.classList.add('imagen-pokemon');
  contenedor.appendChild(imagen);

  const nombre = document.createElement('p');
  nombre.textContent = "Nombre: " + pokemon.name;
  contenedor.appendChild(nombre);

  const tipo = document.createElement('p');
  tipo.textContent = "Tipos: " + pokemon.types.map(type => type.type.name).join(", ");
  contenedor.appendChild(tipo);

  document.getElementById('pokemones').appendChild(contenedor);
}
