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