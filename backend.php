<?php
include 'db_config.php';

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Manejar las operaciones CRUD
$action = $_GET['action'];

switch ($action) {
    case 'create':
        $nombre = $_POST['nombre'];
        $descripcion = $_POST['descripcion'];
        $precio = $_POST['precio'];

        $sql = "INSERT INTO productos (nombre, descripcion, precio) VALUES ('$nombre', '$descripcion', $precio)";
        if ($conn->query($sql) === TRUE) {
            echo "Producto creado correctamente";
        } else {
            echo "Error al crear el producto: " . $conn->error;
        }
        break;

    case 'read':
        $sql = "SELECT * FROM productos";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $productos = array();
            while($row = $result->fetch_assoc()) {
                $productos[] = $row;
            }
            echo json_encode($productos);
        } else {
            echo "0 resultados";
        }
        break;

    case 'update':
        $id = $_POST['id'];
        $nombre = $_POST['nombre'];
        $descripcion = $_POST['descripcion'];
        $precio = $_POST['precio'];

        $sql = "UPDATE productos SET nombre='$nombre', descripcion='$descripcion', precio=$precio WHERE id=$id";
        if ($conn->query($sql) === TRUE) {
            echo "Producto actualizado correctamente";
        } else {
            echo "Error al actualizar el producto: " . $conn->error;
        }
        break;

    case 'delete':
        $id = $_POST['id'];

        $sql = "DELETE FROM productos WHERE id=$id";
        if ($conn->query($sql) === TRUE) {
            echo "Producto eliminado correctamente";
        } else {
            echo "Error al eliminar el producto: " . $conn->error;
        }
        break;
}

// Cerrar conexión
$conn->close();
?>
