# Front End Proyecto 3
Front End para el Proyecto Final de Bases de Datos Avanzadas.
Realizado con AngularJS y Bootstrap, empaquetado con Webpack.

## Como ejecutarlo
Debe tener instalado [Webpack](https://www.npmjs.com/package/webpack) y [Live-Server](https://www.npmjs.com/package/live-server)
~~~~
npm install -g webpack
~~~~
~~~~
npm install -g live-server
~~~~

Primero debe compilar todos los archivos JS en un único archivo con webpack:
~~~~
webpack
~~~~
Luego puede ejecutar el front-end con live-server:
~~~~
live-server
~~~~
El servidor estará corriendo en 127.0.0.1:8080.
Lo anterior ejecutará Webpack en watchmode, lo que significa que estará en constante ejecución, recompilando cada vez que detecte algún cambio, si no desea que eso pase, desactive la bandera watch del webpack.config.js:
```javascript
module.exports = {
    entry: path.resolve(__dirname, "index.js"),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bdaBundle.js'
    },
    watch: false,
    ...
```
