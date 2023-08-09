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
            $valores = $_POST;
        }
        switch($_GET['accion']){
            case 'seleccionar':
                $datos= $tabla->seleccionar();
                echo $datos ;
                break;

            case 'insertar':                
                $tabla->insertar($valores);
                $mensaje .= 'Datos guardados';
                echo json_encode($mensaje);
                break;

            case 'actualizar':
                $tabla->actualizar($valores);

                break;

            case 'eliminar':
                $tabla->eliminar();
                break;
        }
    }
}
?>