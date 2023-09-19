Estaba aburrido un viernes por la noche y dije, porqué no hacer una simple api de tareas:

# Lista de Tareas Pendientes
Esta es una simple aplicación de lista de tareas pendientes que te permite agregar y eliminar tareas. La aplicación almacena los datos en un archivo JSON para que puedas mantener un registro de tus tareas.

## Funciones

- **Agregar Tarea:** Puedes agregar nuevas tareas a tu lista especificando el nombre y descripcion de la tarea. La aplicación asignará automáticamente un identificador único a cada tarea.

- **Eliminar Tarea:** Si has completado una tarea o deseas eliminarla por cualquier motivo, puedes hacerlo proporcionando el identificador de la tarea.

- **Actualizar Tarea:** Puedes cambiar nombre y descripción de cada tarea por su id.

## Uso

1. Clona este repositorio en tu máquina local.

2. Instala las dependencias utilizando npm: npm i

3. En el .env se encuentra el token para validar el jwt, este se genera mediante: `require('crypto').randomBytes(64).toString('hex')`

4. Inicialo con: npm run start

## Rutas
|         path          |      methods      |
|---------------------- | ----------------- |
|   '/api/v1/health'    |     [ 'GET' ]     |
|    '/api/v1/task'     | [ 'GET', 'POST' ] |
| '/api/v1/task/:taskId' |  [ 'PUT', 'DELETE' ]  |
| '/api/v1/user/login'  │     [ 'POST' ]  |

## Autorizacion:
primero pegar al login, eso devuelve el jwt a usar en bearer.


## body request Post & Put
```
{
    "name": "string",
    "description": "string"
}
```

## to do
* ~~Agregar Update / Put~~
* ~~Agregar pruebas unitarias para cada función del controlador~~
* ~~Agregar el uso de un jwt de manera simple~~
