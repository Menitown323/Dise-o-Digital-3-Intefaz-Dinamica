const elementos = document.querySelector("#elementos");

function crearimagen(event){
    console.log(event.target.value);
    elementos.innerHTML="";
    for(let i = 0; i< event.target.value; i++){
    const imagen = new Image();
    imagen.src = "../img/picahu.jpg";
    imagen.classList.add("imagen-nueva");
    elementos.appendChild(imagen);
    }
    /*const imagen = '<img src="img/picahu.jpg" class="imagen-nueva">'
    elementos.innerHTML = imagen*/

    /*const imagen = document.createElement("img");
    imagen.src = "../img/picahu.jpg";
    imagen.classList.add("imagen-nueva");
    elementos.appendChild(imagen);
    console.log(imagen);*/


}