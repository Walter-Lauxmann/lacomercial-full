import { obtenerArticulos } from "../modelos/articulos";

document.addEventListener('DOMContentLoaded', () => {
    cargarArticulos();
})

async function cargarArticulos() {
  const articulos = await obtenerArticulos();
  const listado = document.getElementById("listado");
  for (let articulo of articulos) {
    listado.innerHTML += `
        <div class="col">
            <div class="card" style="width: 18rem;">
                <img src="imagenes/productos/${articulo.imagen}" class="card-img-top" alt="${articulo.nombre}">
                <div class="card-body">
                    <h5 class="card-title"><span name="spancodigo">${articulo.codigo}</span> - <span name="spannombre">${articulo.nombre}</span></h5>
                    <p class="card-text">
                        ${articulo.descripcion}<br>
                    </p>
                    <h5>$ <span name="spanprecio">${articulo.precio}</span></h5>
                    <input class="form-control" type="number" value="0" min="0" max="30" name="inputcantidad" onchange="calcularPedido()">
                </div>
            </div>
        </div>
    `;
  }
}

