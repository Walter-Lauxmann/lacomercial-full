import { seleccionarArticulos, insertarArticulos, actualizarArticulos, eliminarArticulos } from "../modelos/articulos";

// Alerta
const alerta = document.querySelector('#alerta');

// Formulario
const formulario = document.querySelector('#formulario');
const formularioModal = new bootstrap.Modal(document.querySelector('#formularioModal'));
const btnNuevo = document.querySelector('#btnNuevo');

// Inputs
const inputCodigo = document.querySelector("#codigo");
const inputNombre = document.querySelector("#nombre");
const inputDescripcion = document.querySelector("#descripcion");
const inputPrecio = document.querySelector("#precio");
const inputImagen = document.querySelector("#imagen");

// Imagen del formulario
const frmImagen = document.querySelector("#frmimagen");

// Variables
let opcion = '';
let id;
let mensajeAlerta;

// Control de usuario
let usuario = "";
let logueado = false;

const controlUsuario = () => { // function controlUsuario() {}
    if (sessionStorage.getItem("usuario")) {
      usuario = sessionStorage.getItem("usuario");
      logueado = true;
    }
  
    if (logueado) {
      btnNuevo.style.display = "inline";
    } else {
      btnNuevo.style.display = "none";
    }
  };

document.addEventListener("DOMContentLoaded", () => {
    controlUsuario();
    mostrarArticulos();
});

/**
 * Obtiene los artículos y los muestra
 */
async function mostrarArticulos() {
  const articulos = await seleccionarArticulos();
  console.log(articulos);
  const listado = document.querySelector("#listado"); // getElementById("listado")
  listado.innerHTML = '';
  for (let articulo of articulos) {
    if(logueado) {
        listado.innerHTML += `
                  <div class="col">
                    <div class="card" style="width:18rem;">
                        <img src="imagenes/productos/${articulo.imagen??'nodisponible.png'}" alt="${articulo.nombre}" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title">
                                <span name="spancodigo">${articulo.codigo}</span> - <span name="spannombre">${articulo.nombre}</span>
                            </h5>
                            <p class="card-text">
                                ${articulo.descripcion}.
                            </p>
                            <h5>$ <span name="spanprecio">${articulo.precio}</span></h5>
                            <input type="number" name="inputcantidad" class="form-control" value="0" min="0" max="30" onchange="calcularPedido()">
                        </div>
                        <div class="card-footer d-flex justify-content-center">
                            <a class="btnEditar btn btn-primary">Editar</a>
                            <a class="btnBorrar btn btn-danger">Borrar</a>
                            <input type="hidden" class="idArticulo" value="${articulo.id}">
                            <input type="hidden" class="imagenArticulo" value="${articulo.imagen??'nodisponible.png'}">
                        </div>
                    </div>
                </div>
                `;
    } else {
        listado.innerHTML += `
                  <div class="col">
                    <div class="card" style="width:18rem;">
                        <img src="imagenes/productos/${articulo.imagen??'nodisponible.png'}" alt="${articulo.nombre}" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title">
                                <span name="spancodigo">${articulo.codigo}</span> - <span name="spannombre">${articulo.nombre}</span>
                            </h5>
                            <p class="card-text">
                                ${articulo.descripcion}.
                            </p>
                            <h5>$ <span name="spanprecio">${articulo.precio}</span></h5>
                            <input type="number" name="inputcantidad" class="form-control" value="0" min="0" max="30" onchange="calcularPedido()">
                        </div>
                    </div>
                </div>
                `;
    }
  }
}

/**
 * Ejecuta el evento submit del formulario
 */
formulario.addEventListener('submit', function(e) {
    e.preventDefault();     // Prevenimos la acción por defecto
    const datos = new FormData(formulario); // Guardamos los datos del formulario
    switch(opcion) {
        case 'insertar':
            mensajeAlerta = `Datos guardados`;
            insertarArticulos(datos);                        
            break;
        case 'actualizar':
            mensajeAlerta = `Datos actualizados`;
            actualizarArticulos(datos, id);
            break;
    }
    insertarAlerta(mensajeAlerta, 'success');
    mostrarArticulos();
})

/**
 * Ejecuta el evento click del Botón Nuevo
 */
btnNuevo.addEventListener('click', () => {
    // Limpiamos los inputs
    inputCodigo.value = null;
    inputNombre.value = null;
    inputDescripcion.value = null;
    inputPrecio.value = null;
    inputImagen.value = null;
    frmImagen.src = './imagenes/productos/nodisponible.png';

    // Mostramos el formulario
    formularioModal.show();

    opcion = 'insertar';
});

/**
 * Define el mensaje de alerta
 * @param mensaje el mensaje a mostrar
 * @param tipo el tipo de alerta
 */
const insertarAlerta = (mensaje, tipo) => {
    const envoltorio = document.createElement('div');
    envoltorio.innerHTML = `
    <div class="alert alert-${tipo} alert-dismissible" role="alert">
        <div>${mensaje}</div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `;
    alerta.append(envoltorio);
};

/** 
 * Función on para determinar en qué elemento se realiza un evento 
 * @param elemento el elemento al que se sealiza el evento 
 * @param evento el evento realizado
 * @param selector el selector seleccionado
 * @param manejador el método que maneja el evento
 */
const on = (elemento, evento, selector, manejador) => {
    elemento.addEventListener(evento, e => {
        if (e.target.closest(selector)) {
            manejador(e);
        }
    })
}

/** 
 * Ejecutamos la función on para el botón Editar 
 */
on(document, 'click', '.btnEditar', e => {
    const cardFooter = e.target.parentNode; // Guardamos el elemento padre del botón
    // Obtenemos los datos del artículo seleccionado
    id = cardFooter.querySelector('.idArticulo').value;
    const codigo = cardFooter.parentNode.querySelector('span[name=spancodigo]').innerHTML;
    const nombre = cardFooter.parentNode.querySelector('span[name=spannombre]').innerHTML;
    const descripcion = cardFooter.parentNode.querySelector('.card-text').innerHTML;
    const precio = cardFooter.parentNode.querySelector('span[name=spanprecio]').innerHTML;
    const imagen = cardFooter.querySelector('.imagenArticulo').value;
    // Asignamos los valores a los input del formulario
    inputCodigo.value = codigo;
    inputNombre.value = nombre;
    inputDescripcion.value = descripcion;
    inputPrecio.value = precio;
    frmImagen.src = `./imagenes/productos/${imagen}`;
    formularioModal.show(); // Mostramos el formulario
    opcion = 'actualizar';

})

/**
 *  Ejecutamos la función on para el botón Borrar
 */
on(document, 'click', '.btnBorrar', e => {
    const cardFooter = e.target.parentNode; // Guardamos el elemento padre del botón
    id = cardFooter.querySelector('.idArticulo').value; // Obtenemos el id del artículo
    const nombre = cardFooter.parentNode.querySelector('span[name=spannombre]').innerHTML; // Obtenemos el nombre del artículo
    let aceptar = confirm(`¿Realmente desea eliminar a ${nombre}`); // Pedimos confirmación para eliminar
    if (aceptar) {
        eliminarArticulos(id);
        insertarAlerta(`${nombre}  borrado`, 'danger');
        mostrarArticulos();
    }
})