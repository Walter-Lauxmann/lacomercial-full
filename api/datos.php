<?php
require_once 'modelos.php'; //Requerimos el archivo de clases modelo.php

$mensaje = '';

if(isset($_GET['tabla'])){  // Si está seteada GET['tabla']
    $tabla= new Modelo($_GET['tabla']); // Creamos el objeto $tabla desde la clase Modelo
    if(isset($_GET['criterio'])){
        $tabla->set_criterio($_GET['criterio']);
    }
    if(isset($_GET['id'])){     // Si está seteada GET['id']
        if($_GET['id'] != '0'){ // Si GET['id'] NO es igual a 0
            $tabla->set_criterio("id=".$_GET['id']); // Establecemos el criterio a id= al id seteado
        }
    }
    
    if(isset($_GET['accion'])){ // Si está seteada GET['accion']
        if($_GET['accion'] == 'insertar' || $_GET['accion'] == 'actualizar'){ // Si la accion es insertar o actualizar
            $valores = $_POST; // Tomamos lo que viene del post
        }
        // Subida de imágenes
        if(                                       // si
            isset($_FILES) &&                      // está seteado $_FILES Y
            isset($_FILES['imagen']) &&            // está seteado $_FILES['imagen'] Y
            !empty($_FILES['imagen']['name'] &&    // NO está vacío $_FILES['imagen']['name'] Y
            !empty($_FILES['imagen']['tmp_name'])) // NO está vacío $_FILES['imagen']['tmp_name']
            ) {
            if(is_uploaded_file($_FILES['imagen']['tmp_name'])) {
                $tmp_nombre = $_FILES['imagen']['tmp_name'];
                $nombre = $_FILES['imagen']['name'];
                $destino = '../imagenes/productos/' . $nombre;

                if(move_uploaded_file($tmp_nombre, $destino)) {
                    $mensaje .= "Archivo subido correctmente a " . $destino . "<br>";
                    $valores['imagen'] = $nombre;
                } else {
                    $mensaje .= "Error: No se ha podido subir el archivo enviado";
                    unlink(ini_get('upload_tmp_dir').$_FILES['imagen']['tmp_name']);
                }
            } else {
                $mensaje .="Error: El archivo encontrado no fue procesado por la subida correctamente.<br>";
            }
        }

        switch($_GET['accion']) {               // Según la accion
            case 'seleccionar':                     // En caso que sea 'seleccionar'
               $datos = $tabla->seleccionar();      // Ejecutamos el método seleccionar()
                echo $datos;                        // Devolvemos los datos
                break;
                
            case 'insertar':                        // En caso que sea 'insertar'                
                $tabla->insertar($valores);         // Ejecutamos el método insertar()
                $mensaje .= 'Datos guardados';      // Creamos un mensaje
                echo json_encode($mensaje);         // Mostramos el mensaje
                break;

            case 'actualizar':                      // En caso que sea 'actualizar'                
                $tabla->actualizar($valores);       // Ejecutamos el método actualizar()
                $mensaje .= 'Datos actualizados';   // Creamos un mensaje
                echo json_encode($mensaje);         // Mostramos el mensaje
                break;

            case 'eliminar':                        // En caso que sea 'eliminar'
                $tabla->eliminar();                 // Ejecutamos el método eliminar
                $mensaje = 'Registro eliminado';    // Creamos un mensaje
                echo json_encode($mensaje);         // Mostramos el mensaje
                break;
        }
    }
}
?>