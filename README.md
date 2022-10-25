This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Ejecutar el proyecto en desarrollo

1. Clonar el proyecto desde Github.
2. Instalar las dependencias del proyecto ejecutando el siguente comando en la terminal del directorio del proyecto: `yarn install` o `yarn update`
3. Abrir el archivo `.env.template` y copiar el contenido sobre un nuevo archivo llamado `.env` ubicado en la raiz del proyecto.
4. Llenar las variables de entorno con llaves personales.
5. Levantar el proyecto con el siguiente comando: `yarn run dev` o `yarn dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Compilación para producción

1. Asergurarse que no queden variables mal definidas o cualquier cosa que moleste a Typescript ya que es un lenguaje estricto
2. Compilar el proyecto corriendo el comando: `yarn build`
3. Para testear la aplicación en modo de producción ejecutar el comando: `yarn start`

