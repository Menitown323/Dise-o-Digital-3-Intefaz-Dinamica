const formulario_producto_nuevo = document.querySelector("#formulario_producto_nuevo");

class Producto{
    constructor(id, nombre, descripcion, precio){
        this.Id = id;
        this.Nombre = nombre;
        this.Descripcion = descripcion;
        this.Precio = precio;
    }
    obtenerDatos(){
        console.log(this.Id);
        console.log(this.Nombre);
        console.log(this.Descripcion);
        console.log(this.Precio);
    }
}

function AgregarProducto(event){
    let lectorFormulario = new FormData(formulario_producto_nuevo);
    //console.log(lectorFormulario)
    const datos = Object.fromEntries(lectorFormulario.entries());
    const json = JSON.stringify(datos);
    console.log(json);

}