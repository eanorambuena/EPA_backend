# EPA_backend
backend

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
