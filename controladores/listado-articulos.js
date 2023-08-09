import { obtenerArticulos } from "../modelos/articulos";

const url = './api/datos.php?tabla=articulos';

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

document.addEventListener("DOMContentLoaded", () => {
    mostrarArticulos();
});

/**
 * Obtiene los artículos y los muestra
 */
async function mostrarArticulos() {
  const articulos = await obtenerArticulos();
  console.log(articulos);
  const listado = document.querySelector("#listado"); // getElementById("listado")
  listado.innerHTML = '';
  for (let articulo of articulos) {
    listado.innerHTML += `
              <div class="col">
                <div class="card" style="width:18rem;">
                    <img src="imagenes/productos/${articulo.imagen}" alt="${articulo.nombre}" class="card-img-top">
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

/**
 * Ejecuta el evento submit del formulario
 */
formulario.addEventListener('submit', function(e) {
    e.preventDefault();     // Prevenimos la acción por defecto
    const datos = new FormData(formulario); // Guardamos los datos del formulario
    fetch(url + '&accion=insertar', {
        method: 'POST',
        body: datos
    })
    .then(res => res.json())
    .then(data => {
        insertarAlerta(data, 'success');
        mostrarArticulos();
    })
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

    // Mostramos el formulario
    formularioModal.show();
})

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
}