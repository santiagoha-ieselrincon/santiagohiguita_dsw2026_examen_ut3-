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