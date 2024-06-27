document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formulario-producto');
    const listadoProductos = document.getElementById('listado-productos');

    formulario.addEventListener('submit', function(event) {
        event.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const descripcion = document.getElementById('descripcion').value;
        const precio = document.getElementById('precio').value;

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'backend.php?action=create', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onload = function() {
            if (xhr.status === 200) {
                alert(xhr.responseText);
                cargarProductos();
            } else {
                console.error('Error al agregar producto');
            }
        };
        xhr.send(`nombre=${nombre}&descripcion=${descripcion}&precio=${precio}`);
    });

    function cargarProductos() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'backend.php?action=read', true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                const productos = JSON.parse(xhr.responseText);
                listadoProductos.innerHTML = '';
                productos.forEach(function(producto) {
                    listadoProductos.innerHTML += `
                        <div class="producto">
                            <h3>${producto.nombre}</h3>
                            <p>${producto.descripcion}</p>
                            <p>Precio: $${producto.precio}</p>
                            <button onclick="editarProducto(${producto.id})">Editar</button>
                            <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
                        </div>
                    `;
                });
            } else {
                console.error('Error al cargar productos');
            }
        };
        xhr.send();
    }

    window.eliminarProducto = function(id) {
        if (confirm('¿Estás seguro de eliminar este producto?')) {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'backend.php?action=delete', true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.onload = function() {
                if (xhr.status === 200) {
                    alert(xhr.responseText);
                    cargarProductos();
                } else {
                    console.error('Error al eliminar producto');
                }
            };
            xhr.send(`id=${id}`);
        }
    }

    window.editarProducto = function(id) {
        const nuevoNombre = prompt('Nuevo nombre del producto:');
        if (nuevoNombre) {
            const nuevaDescripcion = prompt('Nueva descripción del producto:');
            const nuevoPrecio = prompt('Nuevo precio del producto:');
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'backend.php?action=update', true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.onload = function() {
                if (xhr.status === 200) {
                    alert(xhr.responseText);
                    cargarProductos();
                } else {
                    console.error('Error al actualizar producto');
                }
            };
            xhr.send(`id=${id}&nombre=${nuevoNombre}&descripcion=${nuevaDescripcion}&precio=${nuevoPrecio}`);
        }
    }

    cargarProductos();
});
