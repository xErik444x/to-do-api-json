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

| Ruta                   | Métodos            |
|------------------------|--------------------|
| `/api/v1/health`       | `GET`              |
| `/api/v1/task`         | `GET`, `POST`      |
| `/api/v1/task/:taskId` | `PUT`, `DELETE`    |
| `/api/v1/user/login`   | `POST`             |
| `/api/v1/docs`         | `GET`              |


## Autorización:

Primero, realiza una solicitud a `/api/v1/user/login` para obtener un token JWT. Utiliza este token como encabezado `Bearer` en las solicitudes posteriores.

#### Cuerpo de solicitud para `/api/v1/user/login`
```json
{
    "username": "name"
}
```
Respuesta:
```json
{
    "user": "name",
    "token": "eyJhbGci..."
}
```

#### Cuerpo de solicitud para `POST` y `PUT`

```json
{
    "name": "string",
    "description": "string"
}
```

## Pendientes
- [x] Agregar funcionalidad de Actualización (`PUT`)
- [x] Incluir pruebas unitarias para cada función del controlador
- [x] Implementar el uso de JWT de manera sencilla

## Url para testing:
https://to-do-api-json.onrender.com/api/v1/docs/
