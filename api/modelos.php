<?php  
require_once("config.php"); // Incluímos el archivo de configuración con las constantes

/* Establecemos los encabezados de la conexión */
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER['REQUEST_METHOD'];
if($method == "OPTIONS") {
    die();
}

/* Clase Conexion */
class Conexion{ 
    // Definimos la propiedad _db
    protected $_db; 
    // Creamos el constructor con la conexión a la Base de Datos
    public function __construct(){ 
        $this->_db = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME); 
        // Si se produce un error de conexión, muestra un mensaje de error
        if ( $this->_db->connect_errno ){ 
            echo "Fallo al conectar a MySQL: ". $this->_db->connect_error; 
            return;     
        } 
        // Establecemos el conjunto de caracteres utf8
        $this->_db->set_charset(DB_CHARSET);
        $this->_db->query("SET NAMES 'utf8'"); 
    } 
} 
/* Fin de la clase conexion */

/* Clase Modelo basada en Conexion */
class Modelo extends Conexion{
    protected $tabla;          // nombre de la tabla
    protected $id= 0;          // id del registro
    protected $criterio= '';   // criterio para las consultas
    protected $orden= 'id';    // campo de ordenamiento
    protected $campos= '*';    // lista de campos
    protected $limite= 0;       // cantidad de registros
    protected $json= true;     // resultados en formato JSON

    public function __construct($t){ 
        parent::__construct(); 
        $this->tabla= $t;
    }

    // Métodos Getter
    public function get_id(){
        return $this->id;
    }
    public function get_criterio(){
        return $this->criterio;
    }
    public function get_orden(){
        return $this->orden;
    }
    public function get_campos(){
        return $this->campos;
    }
    public function get_limite(){
        return $this->limite;
    }
    public function get_json(){
        return $this->json;
    }

    // Métodos Setter
    public function set_id($id){
        $this->id = $id;
    }
    public function set_criterio($criterio){
        $this->criterio = $criterio;
    }
    public function set_orden($orden){
        $this->orden = $orden;
    }
    public function set_campos($campos){
        $this->campos = $campos;
    }
    public function set_limite($limite){
        $this->limite = $limite;
    }
    public function set_json($json){
        $this->json = $json;
    }

    // Método de conexión 
    public function conexion(){
        return $this->_db;
    }

    /**
     * Método de selección.
     * Selecciona los registros de una tabla
     * y los devuelve en formato JSON
     * @return datos los datos en formato JSON
     */
    public function seleccionar() {
        // SELECT * FROM articulos WHERE nombre LIKE '%samsung%' ORDER BY id LIMIT 10
        $sql = "SELECT $this->campos FROM $this->tabla";
        // Si el criterio NO es igual a NADA
        if($this->criterio != '') {
            $sql .= " WHERE $this->criterio"; // DONDE criterio
        }
        // Agregamos el ordenamiento
        $sql .= " ORDER BY $this->orden";
        // Si el límite es mayor que cero
        if($this->limite > 0) {
            $sql .= " LIMIT $this->limite";
        }
        // echo $sql . '<br>'; // Mostramos la instrucción SQL resultante
        // Ejecutamos la consulta y la guardamos en $resultado
        $resultado = $this->_db->query($sql);
        // Obtenemos el resultado en array asociativo y lo transformamos a JSON
        $datos = json_encode($resultado->fetch_all(MYSQLI_ASSOC));
        // Retornamos los datos
        return $datos;
    }

    /**
     * Método de inserción de datos
     * Inserta registros en una tabla
     * @param valores : los valores a insertar
     */
    public function insertar($valores){
        // INSERT INTO productos(codigo,nombre,descripcion,precio,stock,imagen, id_proveedor)
        // VALUES ('201','Motorola G9', 'Un gran teléfono', '45000','10','motorolag9.jpg','1')
        $atributos='';
        $datos='';
        unset($valores->id);
        // Para cada $valores como $key => $value
        foreach ($valores as $key => $value) {
            $value= "'".$value."'"; // Agregamos apóstrofe (') antes y después de cada $value
            $atributos .= $key.","; // Agregamos a la variable $campo el $key y una coma (,)
            $datos .= $value.",";  // Agregamos a la variable $datos el $value y una coma (,)
        }        
        $atributos= substr($atributos,0,strlen($atributos)-1); // Quitamos el último caracter (,) a $atributos
        $datos= substr($datos,0,strlen($datos)-1);    // Quitamos el último caracter (,) a $datos
        // Guardamos en la variable $sql la instrucción INSERT
        $sql="INSERT INTO $this->tabla($atributos) VALUES($datos)"; // INSERTAR DENTRO de $tabla en los ($atributos) los VALORES de ($datos)
        // echo $sql.'<br />'; // Mostramos la instrucción sql resultante
        $this->_db->query($sql); // Ejecutamos la consulta
    }

    /**
     * Método para la actualización de datos 
     * Modifica los registros de una tabla
     * @param valores : los valores a modificar
     */ 
    public function actualizar($valores){
        // UPDATE articulos SET precio = '35600' WHERE id='10'
        $sql="UPDATE $this->tabla SET "; // ACTUALIZAR $tabla ESTABLECIENDO
        // Para cada $valores como $key => $value
        foreach ($valores as $key => $value) {
            // Agregamos a la instrucción los campos ($key) y los valores ($value)
            $sql .= $key."='".$value."',"; 
        }
        $sql= substr($sql,0,strlen($sql)-1); // Quitamos el último caracter (,) a $sql
        // Agregamos a la instrucción el criterio
        $sql .= " WHERE $this->criterio"; // DONDE $criterio
        // echo $sql.'<br />'; // Mostramos la instruccón sql resultante
        $this->_db->query($sql); // Ejecutamos la consulta
    }

    /**
     * Método para la eliminación de datos 
     * Elimina los registros de una tabla
     */ 
    public function eliminar(){
        // DELETE FROM articulos WHERE id='10'
        // Guardamos en la variable $sql la instrucción DELETE
        $sql="DELETE FROM $this->tabla WHERE $this->criterio"; // ELIMINAR DESDE $tabla DONDE $criterio
        $this->_db->query($sql); // Ejecutamos la consulta
    }
}
?> 