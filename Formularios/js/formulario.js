const formulario_producto_nuevo = document.querySelector("#formulario_producto_nuevo");
let productos = [];
let src_imagen_producto = "";

class Producto{
    constructor(id, imagen, nombre, descripcion, precio){
        this.Imagen = imagen;
        this.Id = id;
        this.Nombre = nombre;
        this.Descripcion = descripcion;
        this.Precio = precio;
    }
    obtenerDatos(){
        console.log(this.Id);
        console.log(this.Imagen);
        console.log(this.Nombre);
        console.log(this.Descripcion);
        console.log(this.Precio);
    }
}

function AgregarProducto(event){
    let lectorFormulario = new FormData(formulario_producto_nuevo);
    //console.log(lectorFormulario)
    const datos = Object.fromEntries(lectorFormulario.entries());
    console.log(datos);
    if(datos.Nombre = "" && datos. Descripcion != "" && datos.Precio != null) {
    productos.push(new Producto(productos.length+1,src_imagen_producto,datos.Nombre,datos.Descripcion,datos.Precio));
    productos.forEach(producto => {
        producto.ObtenerDatos();
    });
    }
    //const json = JSON.stringify(datos);
   // console.log(json);

}

function obtenerImagen(event){
    const file = event.target.files[0];
    console.log(file);
    if(file.type === "image/jpeg" || file.type === "image/png"){
        console.log(file.name);
        const lector = new FileReader();
        lector.onload = (event) =>{
            src_imagen_producto = event.target.result;
            document.querySelector("#imagen-file").src = event.target.result;
        }
        lector.readAsDataURL(file);
    }
}