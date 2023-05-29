import {articulos} from '../modelos/articulos';

const listado = document.getElementById('listado');
for(let articulo of articulos) {
    listado.innerHTML += `
        <div class="col">
            <div class="card" style="width: 18rem;">
                <img src="imagenes/productos/${articulo.imagen}" class="card-img-top" alt="${articulo.nombre}">
                <div class="card-body">
                    <h5 class="card-title"><span name="spancodigo">${articulo.codigo}</span> - <span name="spannombre">${articulo.nombre}</span></h5>
                    <p class="card-text">
                        Procesador: ${articulo.descripcion.procesador}<br>
                        Almacenamiento: ${articulo.descripcion.almacenamiento}<br>
                        Cámaras: ${articulo.descripcion.camaras}<br>
                        Pantalla: ${articulo.descripcion.pantalla}<br>
                    </p>
                    <h5>$ <span name="spanprecio">${articulo.precio}</span></h5>
                    <input class="form-control" type="number" value="0" min="0" max="30" name="inputcantidad" onchange="calcularPedido()">
                </div>
            </div>
        </div>
    `
}

