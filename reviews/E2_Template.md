# Evaluación E2

## Comentarios Generales

<!-- Agregar comentarios generales sobre la entrega, si es necesario. -->

## Rúbrica

| Item                         | Puntaje Total | Puntaje Obtenido |
|------------------------------|---------------|------------------|
| **Base de datos (*)**        | 1             |         1         |
| **Deploy (*)**               | 1             |         1        |
| **Diagrama E/R (*)**         | 2             |         2       |
| **Conexión Frontend (*)**    | 2             |        1.5      |
| **Manejo de sesion (*)**     | 6             |        6          |
| **Sequelize**                | 4             |         4         |
| **API RESTful**              | 5             |         5        |
| **Documentación API**        | 4             |        2.4       |
| **Documentacion BDD**        | 3             |        0          |
| **GitFlow**                  | 3             |        3          |
| **Linter**                   | 2             |        2          |
| **Total**                    | 33            |       27.9           |

(*) Puntos escenciales para la entrega.

### Base de datos

| Item                                                     |Puntaje Total| Puntaje Obtenido |
|----------------------------------------------------------|-------------|------------------|
| **Existe la base de datos**                              | 1           | 1                |

### Deploy
<!-- Pueden borrar estos comentarios -->
Para obtener puntaje completo, la aplicación debe estar deployada.
No se aceptan entregas no deployadas
<!--  -->

| Item                                                     |Puntaje Total| Puntaje Obtenido |
|----------------------------------------------------------|-------------|------------------|
| **Esta deployada**                                       | 1           | 1                |


### Diagrama E/R
<!-- Pueden borrar estos comentarios -->
- 1 pto si el diagrama es lo suficientemente complejo (Según lo que hayan discutido con sus grupos)
- 1 pto si todas las entidades tiene PK o FK (si necesitan), 0.5 si faltan algunas
<!--  -->

| Item                                                     |Puntaje Total| Puntaje Obtenido |
|----------------------------------------------------------|-------------|------------------|
| **Complejidad del diagrama**                             | 1           | 1                |
| **PK y FK**                                              | 1           | 1                |
| **Total**                                                | 2           | 2                |


### Conexión Frontend
<!-- Pueden borrar estos comentarios -->
- 0.5 por cada CRUD conectado (GET, POST, PUT, DELETE), pueden ser de distintos modelos
<!--  -->

| Item                                                     |Puntaje Total| Puntaje Obtenido |
|----------------------------------------------------------|-------------|------------------|
| **GET**                                                  | 0.5         | 0.5                |
| **POST**                                                 | 0.5         | 0.5                |
| **PUT**                                                  | 0.5         | 0.5                |
| **DELETE**                                               | 0.5         | 0                |
| **Total**                                                | 2           | 1.5                |

### Manejo de sesion
<!-- Pueden borrar estos comentarios -->
- 1 por tener rutas protegidas en el back (uso de middleware), 0.5 si lo crean pero no lo usan
- 1 por contar con el endponint singup y que ingrese el usuario a la bdd, 0.5 solo si existe pero no funciona correctamente
- 1 por encriptar la contraseña (en el back)
- 1 pto por tener el endpoint login y que verifique la contraseña encriptada, 0.5 si no es funcional y solo existe
- 1 pto por verificar que el usuario existe
- 1 pto por crear el jwt y enviarlo
<!--  -->

| Item                                                     |Puntaje Total| Puntaje Obtenido |
|----------------------------------------------------------|-------------|------------------|
| **Rutas protegidas**                                     | 1           | 1                |
| **Signup**                                               | 1           | 1                |
| **Encriptar contraseña**                                 | 1           | 1                |
| **Login**                                                | 1           | 1                |
| **Verificar usuario**                                    | 1           | 1                |
| **JWT**                                                  | 1           | 1                |
| **Total**                                                | 6           | 6                |

### Sequelize
<!-- Pueden borrar estos comentarios -->
- 1 pto si coincide el diagrama E/R con el codigo, 0.5 si hay diferencias (cardinalidades, faltas entidades o relaciones, PK o FK)
- 1 pto si estan bien definido los atributos
- 1 pto si estan definidas correctamente las relaciones Belongs_to, has_many, etc. 0.5 si hay algunos malos, 0 si más del 50% esta malo
- 1 pto si se guardan correctamente en la BDD los datos
<!--  -->

| Item                                                     |Puntaje Total| Puntaje Obtenido |
|----------------------------------------------------------|-------------|------------------|
| **Coincide diagrama E/R con el codigo**                  | 1           | 1                |
| **Definicion de atributos**                              | 1           | 1                |
| **Relaciones**                                           | 1           | 1                |
| **Guardado en la BDD**                                   | 1           | 1                |
| **Total**                                                | 4           | 4                |

### API RESTful
<!-- Pueden borrar estos comentarios -->
- 1 pto por que existe y este activa ("escuchando")
- 0.5 por cada request que funcione (2 CRUD = 4 pto)
<!--  -->

| Item                                                     |Puntaje Total| Puntaje Obtenido |
|----------------------------------------------------------|-------------|------------------|
| **Existe y esta activa**                                 | 1           | 1                |
| **GET (x2)**                                             | 1           | 1                |
| **POST (x2)**                                            | 1           | 1                |
| **PUT (x2)**                                             | 1           | 1                |
| **DELETE (x2)**                                          | 1           | 1                |
| **Total**                                                | 5           | 5                |

### Documentación API
<!-- Pueden borrar estos comentarios -->
- 0.5 por documentar cada enpoint (Metodo, ruta, argumentos y TODAS (2XX, 4XX y 5XX) las respuestas)

<!--  -->

| Item                                                     |Puntaje Total| Puntaje Obtenido |
|----------------------------------------------------------|-------------|------------------|
| **GET (x2)**                                             | 0.5         | 0.3                |
| **POST (x2)**                                            | 0.5         | 0.3                |
| **PUT (x2)**                                             | 0.5         | 0.3                |
| **DELETE (x2)**                                          | 0.5         | 0.3                |
| **Total**                                                | 4           | 2.4                |

### Documentación BDD
<!-- Pueden borrar estos comentarios -->
- 1 por explicar como correr API e instalar paquetes, 0.5 si faltó uno, 0 si no tienen ninguno
- 1 por explicar como crear usuario, clave, BDD y migraciones en sequelize, 0.5 si falta algo, 0 si no tiene lo minimo (usuario, clave y createdb)
- 1 pto por colocar el .env en el readme
<!--  -->

| Item                                                     |Puntaje Total| Puntaje Obtenido |
|----------------------------------------------------------|-------------|------------------|
| **Como correr API e instalar paquetes**                  | 1           | 0                |
| **Como crear usuario, clave, BDD y migraciones**         | 1           | 0                |
| **.env**                                                 | 1           | 0                |
| **Total**                                                | 3           | 0                |

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
- 1 si Existe el archivo lint
- 1 si no hay errores, 0.5 si hay pocos ~10-15

<!--  -->

| Item                                                     |Puntaje Total| Puntaje Obtenido |
|----------------------------------------------------------|-------------|------------------|
| **Existe el archivo lint**                               | 1           | 1                |
| **Errores**                                              | 1           | 1                |
| **Total**                                                | 2           | 2                |

### Bonus Jest
<!-- Pueden borrar estos comentarios -->
- Coverage > 70%: 5 decimas
- Coverage > 50%: 3 decimas
- Coverage > 20%: 1 decima

| Item                                                     | Decimas |
|----------------------------------------------------------|---------|
| **Coverage**                                             |    0     |

---
## Consejos y Comentarios
Faltó la documentación de todas las respuestas de cada endpoint