export let exercises = {

    EscenaConMaquinaDeEstado: {
        code:
            `// esta escena muestra como crear una escena que contenga una maquina de estados.
            class Alien extends ActorAnimado {

                constructor(x, y) {
                    super(x, y, { grilla: 'alienAnimado.png', cantColumnas: 14 });
                    this.definirAnimacion('parado', new Cuadros(13).repetirVeces(50)
                        .concat([12, 13, 11, 12, 11, 13])
                        .concat(new Cuadros(13).repetirVeces(30))
                        .concat([9, 9, 9, 9, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8]), 4, true);
                    this.definirAnimacion('hablar', [12, 13, 11, 12, 11, 13], 15);
                    this.definirAnimacion('recoger', [12, 10, 10, 12], 6);
                    this.definirAnimacion('correr', [0, 1, 2, 3, 4, 3, 2, 1], 20);
                    this.definirAnimacion('apretar', [12, 6, 5, 5, 5, 5, 5, 6, 12, 13], 6);
                    this.definirAnimacion('SerAnimado', [0, 1, 2, 3, 4, 3, 2, 1], 20);
                    this.agregarEtiqueta('Alien', [1], 1);
                }
            
                // El alíen avanza una posición a la derecha.
                avanzarUnaCasillaALaDerecha() {
                    this.hacer_luego(MoverACasillaDerecha);
                }
            
                /* Desencadena una interacción con el botón, que: 
                   * Si existe un botón junto al alíen, se realizara una transición hacia el estado prendida.
                   * Si no hay un botón, el alíen nos indicara un error.
                */
                apretarBoton() {
                    this.hacer_luego(Interactuar, {
                        etiqueta: 'Boton',
                        nombreAnimacion: 'apretar',
                        animacionInteractuadoAlFinal: 'prendida',
                        mensajeError: 'No hay un botón aquí',
                        idTransicion: 'apretarBoton'
                    });
                }
            
                // El alíen dira un dialogo.
                decir(dialogo) {
                    this.hacer_luego(Decir, { mensaje: dialogo });
                }
            
            }
            
            class Boton extends ActorAnimado {
            
                constructor(x, y) {
                    super(x, y, { grilla: 'botonAnimado.png', cantColumnas: 2 });
                    this.definirAnimacion('apagada', [0], 1);
                    this.definirAnimacion('prendida', [1], 1);
                    this.agregarEtiqueta('Boton', [1], 1);
                }
            
            }
            
            class EscenaConAlienYBoton extends EscenaActividad {
            
                iniciar() {
            
                    // definimos un estado.
                    this.estado = this.armarEstado();
            
                    // agregamos un fondo a la escena.
                    this.fondo = new Fondo('fondos.alien-inicial.png', 0, 0);
            
                    this.cuadricula = new Cuadricula(-25, -200, 1, 4,
                        { alto: 25, ancho: (pilas.opciones.ancho * 0.8) },
                        { grilla: 'invisible.png', cantColumnas: 1 });
            
                    this.fondoCuadricula = new Actor('camino-alien-boton.png', this.cuadricula.x, this.cuadricula.y);
                    this.fondoCuadricula.ancho = this.cuadricula.ancho;
            
                    // Agregamos un alíen, definiendolo como nuestro autómata principal.
                    this.automata = new Alien(0, 0);
                    this.cuadricula.agregarActorEnPerspectiva(this.automata, 0, 0, false);
            
                    // Agregamos un botón a la escena.
                    this.boton = new Boton(0, 0);
                    this.boton.derecha = this.cuadricula.derecha + 25;
                    this.boton.abajo = this.cuadricula.arriba;
                }
            
                /* Creamos el estado para la escena:
                 * Su estado inicial, por ejemplo 'botonApagado'.
                 * Su estado de aceptación, por ejemplo 'botonEncendido'.
                 * Agregamos transiciones de estado, por ejemplo apretarBoton' transiciona de 'botonApagado' a 'botonEncendido'.
                */
                armarEstado() {
                    let stateBuilder = new BuilderStatePattern(this, 'botonApagado');
                    stateBuilder.agregarEstadoAceptacion('botonEncendido');
                    stateBuilder.agregarTransicion('botonApagado', 'botonEncendido', 'apretarBoton');
                    return stateBuilder.estadoInicial();
                }
            
            }
            
            // Ponemos en escena la escena que acabamos de crear.
            pilas.mundo.gestor_escenas.cambiar_escena(new EscenaConAlienYBoton());
            
            var escena;
            var automata;

            setTimeout(() => {
                var escena = pilas.mundo.gestor_escenas.escena;
                var automata = escena.automata;
                automata.decir('Hola, seas bienvenido terrícola.');
                automata.decir('Este es un ejemplo de como crear una escena con una maquina de estado.');
                automata.decir('Voy a avanzar tres casillas hacia la derecha y voy a apretar aquel botón rojo.');
                automata.decir('Al presionarlo, pasara de estar apagado a encendido.');
                automata.avanzarUnaCasillaALaDerecha();
                automata.avanzarUnaCasillaALaDerecha();
                automata.avanzarUnaCasillaALaDerecha();
                automata.apretarBoton();
                automata.decir('Voy a avanzar tres casillas hacia la derecha y voy a apretar aquel botón rojo.');
                automata.decir('Gracias por colaborar con el equipo de pilas bloques. Hasta la próxima!');
            }, 500);
           
            `,
        params: {}
    },
}