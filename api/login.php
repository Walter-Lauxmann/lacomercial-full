<?php
    require_once 'modelos.php'; //Requerimos el archivo de clases modelo.php
    // Tomamos los valores que vienen del POST en formato JSON
    $valores= $_POST; // Convertimos los valores JSON a Array Asociativo

    $usuario = "'".$valores['usuario']."'"; //Guardamos en la variable $usuario
    $password = "'".$valores['password']."'"; //Guardamos en la variable $password

    $usuarios = new Modelo('clientes');
    $usuarios->set_criterio("usuario=$usuario AND password=$password");
    $datos = $usuarios->seleccionar();
    echo $datos;
?>