# blog-crud

# 0 Viene de proyectos anteriores

https://github.com/Bootcamp-web/fastify-crud-mongodb

# 1 Desplegar en docker
## 1º Comprobar que tenemos instalado docker, sino instalarlo
~~~bash
docker --version
Docker version 20.10.12, build e91ed57
~~~

https://www.docker.com/
https://docs.docker.com/get-started/

## 2º Crear achivo `Dockerfile`
Como nuestro proyecto funciona con node hay que añadir a la imagen de docker la version de node 
~~~
FROM node:17-alpine3.14
~~~
Que copie todo el proyecto en donde lo vamos a ejecutar
~~~
COPY . /app
~~~
Directorio donde va a arrancar
~~~
WORKDIR /app
~~~

Ejecuta:
~~~
RUN npm install

RUN npm run build
~~~
Seteamos varible de env
~~~
ENV PORT 3000

~~~
Se va a ejecutar desde aquí
~~~
CMD [ "node","./dist/server.js" ]
~~~
## 3º Cambiamos el archivo `config.ts` y el `server.ts`
- `config.ts`
~~~ts
export const PORT = (process.env.PORT || 3000) as number;
export const DB_URL = (process.env.DB_URL || "DB_URL=mongodb://localhost:27017/blog") as string
~~~
- `server.ts`
~~~ts
server.listen(PORT, "0.0.0.0")
~~~

## 4º Construir y compilar la imagen imagen de docker
~~~bash
docker build -t <your_app_name> .
~~~
~~~bash
docker run <your_app_name>
~~~

## 5º Comprobamos que nuestra app funciona en local
~~~bash
npm run build
~~~
Con esto nos debería crear la carpeta dist que la debemos meter en el `.ignore`
Cambiamos el `package.json`
~~~
"start": "node dist/server.js",
~~~
~~~
npm run start
~~~
## 6º Creamos app en heroku y login con heroku

~~~
heroku login
docker ps
heroku container:login
heroku container:push web --app <your_app_name_heroku>
heroku container:release web --app <your_app_heroku>
~~~
# 2 Cofigurar base de datos
https://www.mongodb.com/atlas/database