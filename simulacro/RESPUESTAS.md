## ¿Cómo se instala y arranca tu proyecto?
El proyecto se instala haciendo un `git clone` en local y copiando el código del proyecto original _(en mi caso "Las Divinas")_. Ahora dentro de `/simulacro` podemos ejecutar `npm run dev` `npm run build` y `npm start`

## ¿Dónde se configura el puerto y cómo llega ese valor hasta el arranque del servidor?
En el archivo `.env` declaramos `PORT=4000` es luego en el archivo `config/env.ts` donde usamos loadEnvFile para extraer las variables declaradas.

```ts
process.loadEnvFile();

export const env = {
  PORT: Number(process.env.PORT ?? 3000),
  NODE_ENV: process.env.NODE_ENV ?? 'development',
};
```

Luego en `server.ts` importamos la constante `env` que incluye las variables de entorno necesarias

## ¿Por qué se sube a GitHub el .env.example y se excluye .env?
Las variables de entorno suelen tener datos privados como API Keys, contraseñas o valores de configuración que no se deberían de publicar.

## Diferencias entre nuevo recorrido del update de documents y el del error centralizado anterior
Anteriormente se tenía un comportamiento que requería de que los datos se enviaran de una forma específica. Con la nueva versión el cambio más grande es que no estamos creando errores y devolvemos una respuesta con código 400.

## ¿Cambiar NODE_ENV desactiva automáticamente el logger?
No, cambiar la variable de NODE_ENV únicamente afecta al mensaje que se muestra en el console.log de server.ts

## ¿Qué diferencias observas en la respuesta al error inesperado?
En el proyecto se utilizan errores de ripo AppError, ResourceNotFoundError y Error básicos.

## ¿Qué diferencias observas en los registros del manejador de errores?

## ¿Qué instrucciones de tu código explican esos resultados?
El código de cada error por ejemplo en los controladores lanzan errores con sus parámetros (códigos, mensajes, etc.) correspondientes

## Qué esperabas que sucediera antes de probarlo.
**Primera:** Se lanza el recurso de NotFound y no accede al flujo normal de la app
**Segunda:** Se registra la línea en consola pero no procede con el flujo normal

## Qué sucedió realmente.
**Primera:** Se lanzó el error de NotFound
**Segunda:** Se quedó esperando por una respuesta a la petición del endpoint

## Qué respuesta recibiste o si la petición quedó esperando.
**Primera:** `{"requestId":"7a57fb08-cbbc-49e0-807f-a094c6a7a239","method":"GET","path":"/api/v1/admin/documents","status":404,"durationMs":7,"timestamp":"2026-11-25T18:00:45.209Z"}`
**Segunda:** Se quedó esperando

## Qué parte del flujo explica el resultado.
**Primera:** Como da igual la ruta del endpoint, siempre va a saltar el error se daña el comienzo del flujo
**Segunda:** Al no seguir con la ejecución de los middlewares, se queda en un limbo la petición al no cerrar el flujo

## Cómo lo corregiste.
**Primera:** Se pone el resgistro en su posición correcta, después de todos los enrutamientos.
**Segunda:** Se vuelve a llamar a `next()`

## indica qué middleware y funciones intervienen, dónde se genera la respuesta y si se ejecuta errorHandler
- Consulta de un documento existente:
  - Se utiliza documentsRouter
  - Se usan las funciones getById del controlador y del servicio
  - No hay error
- Consulta de un documento inexistente:
  - Se utiliza documentsRouter
  - Se usan las funciones getById del controlador y del servicio
  - Sí se ejecuta errorHandler
- Petición a una URL que no existe:
  - Se utiliza el notFound
  - Se utiliza la función notFound
  - No hay error (pero si se envía una respuesta HTTP 404)
- Creación de un aviso con JSON bien formado, pero título inválido:
  - Se utiliza noticeRouter
  - Se utiliza la función create del controlador
  - Se lanza un AppError por el título
- Petición con un cuerpo JSON mal formado:
  - Salta el error al ejecutar express.json()
  - No llega a ejecutar una función del middleware
  - Se ejecuta el errorhandler que recibe un error de sintaxis por el json del body
- Actualización de un documento con un título vacío, utilizando la respuesta directa del controlador:
  - Se utiliza el documentsRouter
  - Se usa la función update del controlador y del servicio
  - No salta error

## Distingue la entrada al logger de la ejecución de su callback asociado al evento finish
### ¿Por qué este notFound no llama a next()?

Cuando un controlador llama a next(err), ¿por qué no se ejecuta el notFound que está registrado a continuación?
¿Por qué el manejador de errores necesita cuatro parámetros aunque no use el último?
¿Qué diferencia hay entre una ruta inexistente y un recurso inexistente?
¿Por qué el logger utiliza el evento finish para registrar el estado de la respuesta?
¿Para qué sirve requestId? Muestra registros de una misma petición que puedas relacionar mediante él.
¿Es obligatorio separar router, controlador y servicio para desarrollar con Express? Justifica qué aporta esa separación.
¿Qué ocurre con los avisos creados cuando reinicias el servidor? ¿Por qué?
