# EPA_backend
backend

# Locally instantiate the database
Para instanciar de manera local la base de datos, se requieren seguir los siguientes pasos:
Primero que nada debemos crear nuestro archivo .env localmente en la raíz de EPA-backend, que debe ser el siguiente:
```
DB_USERNAME = epaowner
DB_PASSWORD = epapassword
DB_NAME = epachat
DB_HOST = 'localhost'
```
Una vez realizado esto, debemos entrar a postgresql con el superusuario por defecto:
```
sudo -U postgres psql
```
Una vez dentro, crear un usuario de tipo superuser de nombre "epaowner" y contraseña "epapassword":
```
CREATE USER epaowner WITH SUPERUSER PASSWORD 'epapassword';
```
Creado el usuario, debemos crear la base de datos con el usuario anteriormente creado:
```
CREATE DATABASE epachat OWNER epaowner;
```
Una vez creada la base de datos, debemos salir de postgresql:
```
\q
```
Ahora, debemos dirigirnos hacía la raíz de EPA_backend y escribir los siguientes comandos en la terminal:
```
yarn sequelize-cli db:drop      # Borrar base de datos del proyecto (opcional)
yarn sequelize-cli db:create    # Crear la base de datos del proyecto
yarn sequelize-cli db:migrate   # Realizamos las migraciones
yarn sequelize-cli db_seed:all  # Instanciar datos de semillas (opcional)
```
Una vez hechos los pasos anteriores, es posible que haya un error al querer hacer yarn dev. Para solucionarlo, en el archivo config.js debemos cambiar la linea de "ssl", donde en vez de tener todos los parametros que tiene encerrados por una llave, solo debe decir lo siguiente para las 3 bases de datos (development, test y porduction):
```
ssl: false
```
Lo anterior sucede principalmente porque la configuración de la base de datos está hecha para que funcione en linea, con las medidas de seguridad necesarias.

Por último, debemos escribir el siguiente comando en la raíz de EPA_backend:
```
yarn dev
```
De esta forma, podremos levantar la base de datos de manera local, la cual estará escuchando solicitudes en el puerto 3000 (http://localhost:3000).

# Users

### Get all users
Puedes encontrar todos los usuarios registrados utilizando /users endpoint.
```
[GET] https://epa-backend-1.onrender.com/users
```
Response:
```
[
    {
        "id": 2,
        "phoneNumber": "56987654321",
        "type": "user",
        "createdAt": "2024-06-14T02:25:05.900Z",
        "updatedAt": "2024-06-14T02:25:05.900Z"
    },
    // ...
]
```
### Get a single user
Puedes encontrar un determinado usuario agregando <id> como parámetro: /users/id
```
[GET] https://epa-backend-1.onrender.com/users/22
```
Response:
```
{
    "id": 22,
    "phoneNumber": "+56958632326",
    "type": "user",
    "createdAt": "2024-06-14T20:47:36.226Z",
    "updatedAt": "2024-06-14T20:47:36.226Z"
}
```
### Delete a user
Para eliminar un usuario debes agregar id como parámetro: /users/id
```
[DELETE] https://epa-backend-1.onrender.com/users/22
```
Response:
```
true
```
### Create a user
Puedes crear un nuevo usuario utilizando /signup endpoint. En la respuesta no se incluye la información del usuario, sólo se incluye un mensaje de confirmación, manteniendo la privacidad de los datos del usuario.
```
[POST] https://epa-backend-1.onrender.com/signup
```
Request:
```
{
    "phoneNumber": "+56987654321",
    "password": "1234abcd4321"
}
```
Response:
```
{
    "message": "User created"
}
```
### Login as a user
Puedes iniciar sesión como usuario utilizando /login endpoint. En la respuesta se incluye un token de autenticación que debes utilizar en las siguientes solicitudes.
```
[POST] https://epa-backend-1.onrender.com/login
```
Request:
```
{
    "phoneNumber": "+56987654321",
    "password": "1234abcd4321"
}
```
Response:
```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJ1c2VyIl0sImlhdCI6MTcxODM3NDM1OSwic3ViIjoiNiJ9.r6lvNBx08kA7kS6SPs2kzJnM7qLMXUZ_WxDxTHK0aao",
    "token_type": "Bearer",
    "expires_in": 86400
}
```
### See current user
Debido a que estamos creando un aplicación de chat, es importante poder acceder a la información del usuario actual. Puedes hacerlo utilizando /me endpoint.
```
[GET] https://epa-backend-1.onrender.com/me
```
Response:
```
{
    "id": 2,
    "phoneNumber": "+56987654321",
    "type": "user",
    "createdAt": "2024-06-14T02:25:05.900Z",
    "updatedAt": "2024-06-14T02:25:05.900Z"
}
```
### See all messages
Puedes encontrar todos los mensajes enviados utilizando /messages endpoint.
```
[GET] https://epa-backend-1.onrender.com/messages
```
Response:
```
[
    {
        "id": 1,
        "content": "Hola, ¿cómo estás?",
        "senderId": 2,
        "receiverId": 1,
        "createdAt": "2024-06-14T02:25:05.900Z",
        "updatedAt": "2024-06-14T02:25:05.900Z"
    },
    // ...
]
```
### See all messages within a conversation
Puedes encontrar todos los mensajes enviados en una conversación específica, definida por el id del chat utilizando /messages/<chatId> endpoint.
```
[GET] https://epa-backend-1.onrender.com/messages/1
```
Response:
```
[
    {
        "id": 1,
        "content": "Hola, ¿cómo estás?",
        "userId": 2,
        "chatId": 1,
        "state": "recieved",
        "createdAt": "2024-06-14T02:25:05.900Z",
        "updatedAt": "2024-06-14T02:25:05.900Z"
    },
    // ...
]
```
### Send a message
Puedes enviar un mensaje a un usuario/chat específico utilizando /messages endpoint.
```
[POST] https://epa-backend-1.onrender.com/messages
```
Request:
```
{
    "content": "Hola, Estoy bien, gracias por preguntar",
    "chatId": 1,
    "userId": 1,
}
```
Response:
```
{
    "id": 2,
    "content": "Hola, Estoy bien, gracias por preguntar",
    "userId": 1,
    "chatId": 1,
    "state": "sent",
    "createdAt": "2024-06-14T02:25:10.900Z",
    "updatedAt": "2024-06-14T02:25:10.900Z"
}
```
