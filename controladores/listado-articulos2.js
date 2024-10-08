import {
  seleccionarArticulos,
  insertarArticulos,
  actualizarArticulos,
  eliminarArticulos,
} from "../modelos/articulos";

// Listado
const listado = document.querySelector("#listado"); // getElementById("listado")



// Alerta
const alerta = document.querySelector("#alerta");

// Formulario
const formulario = document.querySelector("#formulario");
const formularioModal = new bootstrap.Modal(
  document.querySelector("#formularioModal")
);
const btnNuevo = document.querySelector("#btnNuevo");

// Inputs
const inputCodigo = document.querySelector("#codigo");
const inputNombre = document.querySelector("#nombre");
const inputDescripcion = document.querySelector("#descripcion");
const inputPrecio = document.querySelector("#precio");
const inputImagen = document.querySelector("#imagen");

// Imagen del formulario
const frmImagen = document.querySelector("#frmimagen");

// Variables
let buscar = "";
let opcion = "";
let id;
let mensajeAlerta;

let articulos = [];
let articulosFiltrados = [];
let articulo = {};

// Control de usuario
let usuario = "";
let logueado = false;

const controlUsuario = () => {
  // function controlUsuario() {}
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

document.addEventListener("DOMContentLoaded", async () => {
  controlUsuario();
  articulos = await obtenerArticulos();
  filtrarPorNombre('');
  console.log(articulos); 
  mostrarArticulos();
});

/**
 * Obtiene los artículos
 */
async function obtenerArticulos() {
  articulos = await seleccionarArticulos();  
  return articulos;
}

/**
 * Filtra los artículos por nombre
 * @param n
 * @return articulos
 */
function filtrarPorNombre(n) {
  articulosFiltrados = articulos.filter(items => items.nombre.includes(n));
  console.log(articulosFiltrados);
  return articulosFiltrados;
}

/**
 * Muestra los artículos
 */
function mostrarArticulos() {   
  listado.innerHTML = "";
  articulosFiltrados.map(articulo => {
      listado.innerHTML += `
                  <div class="col">
                    <div class="card" style="width:18rem;">
                        <img src="imagenes/productos/${articulo.imagen ?? "nodisponible.png"}" alt="${articulo.nombre}" class="card-img-top">
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
                        <div class="card-footer ${logueado?'d-flex':'none'} justify-content-center">
                            <button type="button" class="btnEditar btn btn-primary">Editar</button>
                            <button type="button" class="btnBorrar btn btn-danger">Borrar</button>
                            <input type="hidden" class="idArticulo" value="${articulo.id}">
                        </div>
                    </div>
                </div>
                `;
  })
};

/**
 * Filtro de datos
 */
const botonesFiltros = document.querySelectorAll('#filtros button');
botonesFiltros.forEach(boton => {
  
  boton.addEventListener('click', e => {
    boton.classList.add('active');
    boton.setAttribute("aria-current","page"); 
    botonesFiltros.forEach(otroBoton => {
      if (otroBoton !== boton) {
        otroBoton.classList.remove('active');
        otroBoton.removeAttribute("aria-current");
      }
    });
    buscar = boton.innerHTML;
    if(buscar == 'Todos') {
      buscar = '';
    }
    filtrarPorNombre(buscar);
    mostrarArticulos();
    
  })
});


/**
 * Ejecuta el evento submit del formulario
 */
formulario.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevenimos la acción por defecto
  const datos = new FormData(formulario); // Guardamos los datos del formulario
  switch (opcion) {
    case "insertar":
      mensajeAlerta = `Datos guardados`;
      insertarArticulos(datos);
      break;
    case "actualizar":
      mensajeAlerta = `Datos actualizados`;
      actualizarArticulos(datos, id);
      break;
  }
  insertarAlerta(mensajeAlerta, "success");
  mostrarArticulos();
});

/**
 * Ejecuta el evento click del Botón Nuevo
 */
btnNuevo.addEventListener("click", () => {
  // Limpiamos los inputs
  inputCodigo.value = null;
  inputNombre.value = null;
  inputDescripcion.value = null;
  inputPrecio.value = null;
  inputImagen.value = null;
  frmImagen.src = "./imagenes/productos/nodisponible.png";

  // Mostramos el formulario
  formularioModal.show();

  opcion = "insertar";
});

/**
 * Define el mensaje de alerta
 * @param mensaje el mensaje a mostrar
 * @param tipo el tipo de alerta
 */
const insertarAlerta = (mensaje, tipo) => {
  const envoltorio = document.createElement("div");
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
  elemento.addEventListener(evento, (e) => {
    if (e.target.closest(selector)) {
      manejador(e);
    }
  });
};

/** 
 * Ejecutamos la función on para el botón Editar 
*/ 
on(document, 'click', '.btnEditar', e => {
    const cardFooter = e.target.parentNode; // Guardamos el elemento padre del botón
    id = cardFooter.querySelector('.idArticulo').value; // Obtenemos el id del artículo
    articulo = articulos.find(item => item.id == id); // Buscamos el articulo a editar

    // Asignamos los valores a los input del formulario
    inputCodigo.value = articulo.codigo;
    inputNombre.value = articulo.nombre;
    inputDescripcion.value = articulo.descripcion;
    inputPrecio.value = articulo.precio;
    frmImagen.src = `./imagenes/productos/${articulo.imagen??'nodisponible.png'}`;
    
    formularioModal.show(); // Mostramos el formulario
    opcion = 'actualizar';
})

/**
 *  Ejecutamos la función on para el botón Borrar
 */
on(document, "click", ".btnBorrar", (e) => {
  const cardFooter = e.target.parentNode; // Guardamos el elemento padre del botón
  id = cardFooter.querySelector(".idArticulo").value; // Obtenemos el id del artículo
  articulo = articulos.find(item => item.id == id); // Buscamos el articulo a editar

  let aceptar = confirm(`¿Realmente desea eliminar a ${articulo.nombre}`); // Pedimos confirmación para eliminar
  if (aceptar) {
    eliminarArticulos(id);
    insertarAlerta(`${articulo.nombre}  borrado`, "danger");
    mostrarArticulos();
  }
});
