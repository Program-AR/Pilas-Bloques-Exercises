¡Hola! :vulcan_salute: Este es un proyecto relacionado a [Pilas Bloques](https://pilasbloques.program.ar) :heart:. En el repositorio de ese proyecto encontrarás las guías sobre [cómo contribuir](https://github.com/Program-AR/pilas-bloques-app/blob/develop/CONTRIBUTING.md) y el [código de conducta](https://github.com/Program-AR/pilas-bloques-app/blob/develop/CODE_OF_CONDUCT.md), que son guías que aplican también a este proyecto.

Hi! :vulcan_salute: This is a project related to [Pilas Bloques](https://pilasbloques.program.ar) :heart:. In that project's repository you'll find the [contribution guidelines](https://github.com/Program-AR/pilas-bloques-app/blob/develop/CONTRIBUTING_en.md) and the [code of conduct](https://github.com/Program-AR/pilas-bloques-app/blob/develop/CODE_OF_CONDUCT_en.md) which also apply to this project.

# Pilas Bloques Exercises

Programming exercises for Pilas Bloques.

![Build Status](https://travis-ci.org/Program-AR/pilas-bloques-exercises.svg?branch=master)



## How to use?

First you have to install all dependencies for this project, you can do
this by running the following command:

```
npm install
```

You also need to install python3, to do this in Linux, run:

```
sudo apt-get install python3 python3-dev
```

Then, to start the compilation and open the browser in the demo page:

```
npm run start
```

However, this doesn't trigger a new compilation when a file is changed.
For this you have to start in another terminal:

```
npm run watch
```

## How does it look?

When the browser opens, you will see the first challenge directly like this:

![](imagenes/preview.jpg)


Note that challenges can be loaded using the ``?desafio`` parameter in the URL.

For example:


```
  [...]/visorEjercicios.html?desafio=AlimentandoALosPeces
  [...]/visorEjercicios.html?desafio=FutbolRobots
```

etc...
