# Evaluación E3

## Comentarios Generales

<!-- Agregar comentarios generales sobre la entrega, si es necesario. -->

## Rúbrica

| Item                         | Puntaje Total | Puntaje Obtenido |
|------------------------------|---------------|------------------|
| **Finalizacion CRUDs**       | 4             |        4          |
| **Finalizacion vistas**      | 4             |        4          |
| **Conexion cliente-servidor**| 5             |        5          |
| **Websockets**               | 3             |        0          |
| **Usuario administrador**    | 3             |        3          |
| **Deploy**                   | 1             |        1          |
| **Documentación API**        | 3             |        3          |
| **Documento de diseño**      | 1             |        1          |
| **GitFlow**                  | 3             |        3          |
| **Linter**                   | 1             |        1          |
| **Total**                    | 28            |        25          |


### Finalización CRUDs
<!-- Pueden borrar estos comentarios -->
- 2 pto por > 50% endpoint, es decir si tienen 3 entidades, son 4 endpoints por cada uno = 12. Si hay endpoints que no se utilizan deben argumentarlo
- 3 por tener un >= 80%
- 4 todo completo

<!--  -->

| Item                                                     |Puntaje Total| Puntaje Obtenido |
|----------------------------------------------------------|-------------|------------------|
| **CRUDs**                                                | 4           | 4                |

### Finalización vistas
<!-- Pueden borrar estos comentarios -->
 Debe contar con todas las vistas finalizadas, esto quiere decir que deben ser todas responsivas y tener un diseño acorde a lo que aparece a su documento de diseño
Descontar 0.5 por cada vista faltante, 0.5 si no es responsiva
- 1 pto por interfaz principal
- 1 pto por pagina de inicio
- 1 pto por pagina de login/singup
- 1 pto por pagina de instrucciones

<!--  -->

| Item                                                     |Puntaje Total| Puntaje Obtenido |
|----------------------------------------------------------|-------------|------------------|
| **Vistas**                                               | 4           | 4                |

### Conexión cliente-servidor
<!-- Pueden borrar estos comentarios -->
Deben estar conectados todos los CRUDs al backend
- 5 pto si estan todos conectados y se desplegan correctamente (no hay errores en consola 4XX, 5XX)
- 4 pto si faltan algunos CRUDs (más del 80% conectado o con algunos errores)
- 2 pto si faltan varios CRUDs (más del 50% conectado o con errores)
- 1 pto si faltan la mayoría de los CRUDs (más del 30% conectado o con errores) 
<!--  -->

| Item                                                     |Puntaje Total| Puntaje Obtenido |
|----------------------------------------------------------|-------------|------------------|
| **Conexión**                                             | 5           | 5                |

### Websockets
<!-- Pueden borrar estos comentarios -->
Puede ser un chat, un sistema de notificaciones, etc.
- 3 pto si se conecta correctamente y se actualiza en tiempo real
- 1 pto si se conecta correctamente pero no se actualiza en tiempo real
<!--  -->

| Item                                                     |Puntaje Total| Puntaje Obtenido |
|----------------------------------------------------------|-------------|------------------|
| **Websockets**                                           | 3           | 0                |

### Usuario administrador
<!-- Pueden borrar estos comentarios -->
- 1 pto si existe el usuario administrador (deben verificar que en el JWT se envie el rol), 0.5 si el usuario existe pero no se envia el rol
- 1 pto si cuenta con la vista de administrador
- 1 pto si puede acceder a endpoints protegidos

Descontar 0.5 punto si no tienen vista protegida, es decir, que no se puede acceder a ella sin estar logeado. En caso de intentar ingresar, debe mostrar un mensaje de error (401)
Descontar 1 punto si no se puede acceder a los endpoints protegidos, es decir, que no se puede acceder a ellos sin estar logeado. En caso de intentar ingresar, debe mostrar un mensaje de error (401)
<!--  -->

| Item                                                     |Puntaje Total| Puntaje Obtenido |
|----------------------------------------------------------|-------------|------------------|
| **Existe el usuario administrador**                      | 1           | 1                |
| **Vista de administrador**                               | 1           | 1                |
| **Acceso a endpoints protegidos**                        | 1           | 1                |
| **Total**                                                | 3           | 3                |

### Deploy
<!-- Pueden borrar estos comentarios -->
Para obtener puntaje completo, la aplicación debe estar deployada.
No se aceptan entregas no deployadas
<!--  -->

| Item                                                     |Puntaje Total| Puntaje Obtenido |
|----------------------------------------------------------|-------------|------------------|
| **Esta deployada**                                       | 1           | 1                |

### Documentación API
<!-- Pueden borrar estos comentarios -->
Debe contener todo esto cada endpoint:
- Metodo 
- ruta
- argumentos
- Todas (2XX, 4XX y 5XX) las respuestas

Asiganr puntaje de la siguiente manera:
- 3 ptos si tiene todos los puntos documentados
- 2 ptos si faltan algunos puntos (al menos 80% completado) o falta parte de los puntos de arriba (falta maximo 1)
- 1 pto si faltan varios puntos (al menos 50% completado) o falta parte de los puntos de arriba (faltan 2 o más)

<!--  -->

| Item                                                     |Puntaje Total| Puntaje Obtenido |
|----------------------------------------------------------|-------------|------------------|
| **Documentación API**                                    | 3           | 3                |


### Documento de diseño
<!-- Pueden borrar estos comentarios -->
- 1 pto si el documento de diseño esta actualizado y acorde a lo programado

<!--  -->

| Item                                                     |Puntaje Total| Puntaje Obtenido |
|----------------------------------------------------------|-------------|------------------|
| **Documento de diseño**                                  | 1           | 1                |

### Gitflow
<!-- Pueden borrar estos comentarios -->
- 1 por seguir la guia de platanus de commits
- 1 por utilizar branches. Si utilizan unicamente main y develop, 0.5
- 1 por el uso de PR. Si las PR no tienen nombres correctos, es decir, utilizan el mismo nombre que el commit, 0.5
<!--  -->

| Item                                                     |Puntaje Total| Puntaje Obtenido |
|----------------------------------------------------------|-------------|------------------|
| **Commits**                                              | 1           | 1                |
| **Branches**                                             | 1           | 1                |
| **PR**                                                   | 1           | 1                |
| **Total**                                                | 3           | 3                |

### Linter
<!-- Pueden borrar estos comentarios -->
- 1 si no hay errores, 0.5 si hay pocos ~10-15

<!--  -->

| Item                                                     |Puntaje Total| Puntaje Obtenido |
|----------------------------------------------------------|-------------|------------------|
| **Errores**                                              | 1           | 1                |
| **Total**                                                | 1           | 1                |


### Bonus Selenium
<!-- Pueden borrar estos comentarios -->
- Testea el login y singup, navegación entre rutas y realizar una accion de la aplicacion (jugar, agregar algo al calendario, etc): 5 decimas
- Testear el login y singup o realiza una jugada: 3 decimas
- Testea login o singup: 1 decima

| Item                                                     | Decimas |
|----------------------------------------------------------|---------|
| **Testeo**                                               |    0     |

---
## Consejos y Comentarios
