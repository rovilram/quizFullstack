# Quiz++ (FullStack MVC Version)

## INSTALACIÓN

1. Clonar repositorio: `git clone https://github.com/rovilram/quizFullstack`.
2. reconstituir dependencias npm: `npm install`.
3. Generar archivo .env con esta configuración:

```bash
#STATIC FRONTEND FILES SERVER
HTTP_STATIC_PORT = 8080
HTTP_STATIC_HOST = "localhost"

#API SERVER
HTTP_API_PORT = 3000
HTTP_API_HOST = "localhost"

#MONGODB SERVER
DB_HOST = "localhost"
DB_PORT = "27017"
DB_NAME = "quiz"

#GOOGLE AUTH
GOOGLE_AUTH_SECRET = "AAAAAAAAAAAA" #Tu auth Secret
GOOGLE_AUTH_CLIENT_ID = "TUAUTHCLIENTID.apps.googleusercontent.com"
```

4. Ejecutar script para recostituir la base de datos con las preguntas y respuestas predeterminadas: `npm run seeds`.
5. Levantar el servidor API con node: `node apiServer.js`
6. Levantar el servidor de ficheros html estáticos con node: `node staticFilesServer.js`

## CARACTERÍSTICAS

- Se hace **servidor API** en node para servir preguntas al frontend que habíamos hecho como ejercicio anterior del Quiz.
- Se **modifica el frontend** del ejercicio anterior del Quiz de forma que haga fetch para conseguir las preguntas desde back.
- Se hace **servidor de ficheros estáticos** html para el frontend de la aplicación.
- Se completa **CRUD** de la colección de preguntas:
  -CREATE pregunta,
  -READ pregunta y preguntas (ya los teníamos del primer punto),
  -UPDATE pregunta
  -DELETE pregunta
- Se hace (como Multi Page App) **frontend CRUD** para listar, editar, modificar y crear preguntas y se enlazan con fetch a nuestro backend,
- Se hace **sistema de autenticación** con JWT en back, que consta de los endpoints para signUp, signIn, signOut, que intercambia tokens con frontend dejando paso a la zona privada de administración (/admin) donde se gestionan las preguntas.
- Se hace front para el sistema de autenticación (solo se hace **pantalla de login**(signIn)) (si queremos crear nuevos usuarios de administración lo tenemos que hacer a través del endpoint _/user/signout_). Los usuarios deben ser como este:
  {
  user: 'user1@email.es',
  password: 'aA#00000',
  userType: 'admin',
  }
- Se añade como método de autenticación un **botón OAuth de Google**, el cual evita el que el administrador tenga que meter su usuario y contraseña.

## ENUNCIADO EJERCICIO

-------------------- PRERREQUISITOS --------------------

VERSIÓN 0) Quiz "solo frontend"/"serverless con Firebase"

(Entrega anterior para el tipo de usuario "Estudiante" con datos mockeeados, sean "hardcodeados" o de Firebase, según cada caso como se hubiera realizado previamente. En caso de que no se hubiera hecho con Firebase, no es necesario hacerlo ahora.)

-------------------- NUEVOS REQUISITOS --------------------

- VERSIÓN 1) Zona de Estudiante, aplicando MVC con Node.js y MongoDB

Se pide realizar el backend necesario para el Quiz del paso anterior, esto es:

- Crear una base de datos en MongoDB que almacene los datos (quitando los "hardcodeados"/de Firebase de la app front). El uso de un ODM (como Mongoose) es totalmente opcional, pero se recomienda empezar por el modelo de datos.

- Implementar una API REST en backend con Node y Express para comunicar la app front y MongoBD, de manera que la app front reciba los datos (y los pinte) de dicha BD, pasando por la API REST Node+Express, vía fetch con peticiones GET.

Nota: Tanto si en la versión 0 se hizo SPA (tal como se pidió) como si no, se recomienda mantenerla tal cual se hizo, para así intentar reciclar todo lo posible el manejo del DOM que se implementó en la versión frontend anterior.

- VERSIÓN 2) Zona de Profesor con CRUD completo, aplicando MVC con Node.js y MongoDB

Se pide ampliar la aplicación con las vistas en frontend suficientes para hacer un CRUD para las preguntas y respuestas, para un usuario de tipo "Profesor", así como los endpoints en backend necesarios que atiendan dichas nuevas vistas.

Para ello, se recomienda la siguiente propuesta de funcionalidades mínimas:

- READ Operation: Una vista maestro que liste todas las preguntas en la base de datos, donde al lado de cada pregunta haya un botón de "Editar pregunta" y otro de "Eliminar pregunta". Además, en esta vista maestro debe haber un único botón de "Nueva pregunta" arriba del todo, encima del listado de preguntas creadas.

- CREATE Operation: Al pinchar en el botón de "Nueva pregunta" de la vista anterior, aparecerá un formulario con todos los campos necesarios para poder crear una nueva pregunta, así como un botón de "Crear pregunta", que la almacenará en la base de datos, de manera que aparecerá en el listado del maestro de la vista anterior. En esta vista de "Nueva pregunta", también debería haber un botón de "Volver" al listado del maestro.

- UPDATE Operation: Al pinchar en uno de los botones de "Editar pregunta" de la vista maestro, aparecerá a modo de detalle el mismo formulario de la vista anterior (la de "Nueva pregunta"), solo que con todos los campos prerrellenados con los valores correspondientes para dicha pregunta. Igualmente, habrá un botón de "Modificar pregunta" que actualizará en BD los datos cambiados de la pregunta, y un botón "Volver" que regresará al maestro.

- DELETE Operation: Al pinchar en uno de los botones de "Eliminar pregunta" de la vista maestro, se pedirá al usuario mediante un mensaje de confirmación si está seguro de que desea eliminarla, y en caso afirmativo, se borrará de la BD. También debe actualizarse el listado del maestro para que no aparezca la pregunta recién eliminada.

Nota: Para facilitar el desarrollo, no se exige para esta nueva zona privada de Profesor que sea SPA, pudiendo ser MPA. Tampoco se pide expresamente que sea responsive.

- VERSIÓN 3) Autenticación de la Zona (privada) de Profesor y separación de la Zona (pública) de Estudiante

Se pide ampliar la aplicación con una vista previa inicial a las demás, que muestre dos posibles caminos: Estudiante o Profesor.

Para el primero, redigirá a la zona pública (Estudiante). Para el segundo, se mostrará un formulario de email y contraseña, que la aplicación debe verificar contra BD, redirigiendo en caso de tenerlo almacenado a la zona privada (Profesor).

Además, la aplicación debe ser capaz no solo de realizar esta redirección, sino también de realizar un proceso de autenticación/autorización completo, esto es, no debe permitir la entrada a la zona privada (por ejemplo, escribiendo la URL de la misma directamente a través de la barra del navegador) a ningún usuario que previamente no haya pasado por la verificación del login.

Por último, en la zona privada, debe haber un botón para "Cerrar sesión", esto es, para Salir de la Zona del Profesor previamente autenticado.

Nota: Para esta versión del proyecto, se recomienda hacer MPA para la nueva vista de selección de usuario, de manera que se encuentre en la raíz /, y que por ejemplo haya un botón para ir a la Zona Estudiante ( /quiz ) y el formulario para ir a la Zona Profesor ( /admin ). Toda la autenticación debe ser realizada con JWT.

- VERSIÓN 3.5 PLUS TURBO REMIX) Autenticación con OAuth

Se pide ofrecer al Profesor como alternativa a la autenticación por JWT con email y contraseña almacenados en BD, el poder hacerlo también con algún proveedor de OAuth (Google, Facebook, Twitter, GitHub, etc.). Aunque es posible hacerlo (para mayor facilidad) con el servicio de Firebase, se anima a hacerlo sin tal ayuda.
