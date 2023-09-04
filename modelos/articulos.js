// URL para acceder a la API
const url = './api/datos.php?tabla=articulos';

/**
 * Función asíncrona para obtener artículos 
 */ 
export async function obtenerArticulos() {
    let res = await fetch(`${url}&accion=seleccionar`);
    let datos = await res.json();
    if(res.status !== 200) {
        throw Error('Los datos no existen');
    }
    // console.log(datos);
    return datos;
}
