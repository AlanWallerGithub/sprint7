SPRINT 7

Este sprint usa Node.js v21.5.0

Para ejecutar el chat, llamad:

```sh
npm start
```

En la carpeta:

```sh
./typescript-version/dist/backend
```

La web se ejecutará en localhost:3000/

Las rutas disponibles al usuario son las siguientes:

   - GET "/": Al llamar esta ruta, se accede a la web.
   - POST "/": Para registrar un nuevo usuario. Se requiere un body como este: {"info":["nombrePrueba","passwordPrueba"]}.
   - POST "/login": Para entrar como usuario. Se requiere este body: {"info":["nombrePrueba","passwordPrueba"]}


Una vez hecho el login, se requerirá autenticación GoogleAuth.
Una vez en el chat, podrás escribir mensajes en la casilla "Message": 

![screenshot 30](https://github.com/AlanWallerGithub/sprint7/assets/140154835/ac990159-a88b-43c7-bb94-d4890dae0c40)

Podras cambiar de sala con la casilla "Room":

![screenshot 31](https://github.com/AlanWallerGithub/sprint7/assets/140154835/0e74cb17-e5f7-4d49-ac08-bb3f3f910c25)

Ver la lista de salas a las que has entrado:

![screenshot 32](https://github.com/AlanWallerGithub/sprint7/assets/140154835/f67cf607-b8e2-49d5-b403-57ddfce54ae1)

Y ver los mensajes tuyos y de los demas en el titulo de la sala:

![screenshot 33](https://github.com/AlanWallerGithub/sprint7/assets/140154835/2d738973-70e7-4851-b3ae-37e04eeacd3b)



