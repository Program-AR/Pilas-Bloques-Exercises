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
            
            setTimeout(() => {
                var escena = pilas.mundo.gestor_escenas.escena;
                var automata = escena.automata;
                automata.decir('Hola, seas bienvenido terrícola.');
                automata.decir('Este es un ejemplo de como crear una escena con una maquina de estado.');
                automata.decir('Voy a avanzar tres casillas hacia la derecha y voy a apretar aquel botón rojo.');
                automata.decir('Al presionarlo, pasara de estar apagado a encendido, y pondra en funcionamiento mi fabrica.');
                automata.avanzarUnaCasillaALaDerecha();
                automata.avanzarUnaCasillaALaDerecha();
                automata.avanzarUnaCasillaALaDerecha();
                automata.apretarBoton();
                automata.decir('Genial!, ahora con la fabrica en funcionamiento, podre comenzar a trabajar!.');
                automata.decir('Gracias por la ayuda terrícola, hasta la próxima!');
            }, 500);
           
            `,
        params: {}
    },
    EscenaConObjetosYContador: {
        code:
            `// esta escena muestra como recolectar y contar objetos.

            var contadorDeTuercas;
            var contadorDeReparaciones;

            // Definimos un comportamiento para disminuir el contador.
            class DisminuirContador extends Interactuar {
                
                constructor(args) {
                    super(args);
                    this.contador = args.contador
                }
                
                alInteractuar() {
                    this.contador.disminuir();
                }
                
            }

            // Definimos un comportamiento para aumentar el contador.
            class AumentarContador extends Interactuar {
                
                constructor(args) {
                    super(args);
                    this.contador = args.contador
                }
                
                alInteractuar() {
                    this.contador.aumentar();
                }
                
            }
            
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
                    this.definirAnimacion('contar', [1], 20);
                    this.definirAnimacion('apretar', [12, 6, 5, 5, 5, 5, 5, 6, 12, 13], 6);
                    this.definirAnimacion('SerAnimado', [0, 1, 2, 3, 4, 3, 2, 1], 20);
                    this.agregarEtiqueta('Alien', [1], 1);
                }
            
                // El alíen avanza una posición a la derecha.
                avanzarUnaCasillaALaDerecha() {
                    this.hacer_luego(MoverACasillaDerecha);
                }
                
                // El alien recolecta una tuerca del suelo.
                recolectarTuerca() {
                    this.hacer_luego(Recolectar, {'etiqueta':'Tuerca', 'mensajeError':'No hay una tuerca aquí'});
                    this.hacer_luego(AumentarContador, {
                        etiqueta:'Alien',
                        nombreAnimacion: 'contar',
                        mensajeError:'No hay una tuerca aquí',
                        contador : contadorDeTuercas
                    });
                }
            
                /* Desencadena una interacción con la nave, que: 
                   * Si existe una nave junto al alíen, utilizara una tuerca.
                   * Si no hay un nave, el alíen nos indicara que no hay una nave aquí.
                */
                ponerTuercaEnNave() {
                   this.hacer_luego(AumentarContador, {
                       etiqueta: 'Nave',
                       nombreAnimacion: 'apretar',
                       mensajeError: 'No hay una nave aquí',
                       contador : contadorDeReparaciones
                   });
                   this.hacer_luego(DisminuirContador, {
                       etiqueta:'Alien',
                       nombreAnimacion: 'contar',
                       mensajeError:'No hay una tuerca aquí',
                       contador : contadorDeTuercas
                   });
                }
            
                // El alíen dira un dialogo.
                decir(dialogo) {
                    this.hacer_luego(Decir, { mensaje: dialogo });
                }
            
            }
            
            class Tuerca extends ActorAnimado {
                
                constructor(x,y){
                    super(x, y, {grilla: 'tuerca.png', cantColumnas:1});
                    this.agregarEtiqueta('Tuerca', [1], 1);
                }
                
            }
            
            class Nave extends ActorAnimado {
                constructor(x = 0, y = 0) {
                    super(x, y, {grilla: 'naveAnimada.png', cantColumnas:4, cantFilas: 1});
                    this.definirAnimacion("parado", new Cuadros(0).repetirVeces(30).concat([1]), 4, true);
                    this.agregarEtiqueta('Nave', [1], 1);
                }
                
            }
            
            // Definimos la clase Contador, para poder contar tuercas en esta escena.
            class Contador extends ActorAnimado { 
                
                constructor(x, y, etiqueta, texto) {
                    super(x, y, {grilla: 'invisible.png', cantColumnas:1});
                    this.agregarEtiqueta('etiqueta', [1], 1);
                    Trait.toObject(ObservadoConDisminuir, this);
                    this.cantidad = 0;
                    this.registrarObservador(new Tablero(x, y, { texto: texto }));
                    this.changed();
                }
                
                disminuir() {
                    this.cantidad -= 1;
                    this.changed();
                }

                aumentar() {
                    this.cantidad += 1;
                    this.changed();
                }
                
            }
            
            class FlotarAlEstarReparado extends Flotar {
                
                actualizar() {
                    if(contadorDeReparaciones && contadorDeReparaciones.cantidad === 3){
                        super.actualizar();
                    }
                }
                
            }
            
            class EscenaConAlienYBoton extends EscenaActividad {
            
                iniciar() {
            
                    // agregamos un fondo a la escena.
                    this.fondo = new Fondo('fondos.alien-inicial.png', 0, 0);
            
                    this.cuadricula = new Cuadricula(-25, -200, 1, 4,
                        { alto: 25, ancho: (pilas.opciones.ancho * 0.8) },
                        { grilla: 'invisible.png', cantColumnas: 1 });
            
                    this.fondoCuadricula = new Actor('camino-alien-boton.png', this.cuadricula.x, this.cuadricula.y);
                    this.fondoCuadricula.ancho = this.cuadricula.ancho;
            
		            
                    // Agregamos una nave a la escena.
                    this.nave = new Nave(0, 0);
                    this.nave.derecha = this.cuadricula.derecha + 200;
                    this.nave.abajo = this.cuadricula.arriba - 10;
                    this.nave.aprender(FlotarAlEstarReparado, {Desvio: 5});
            
                    // Agregamos un alíen, definiendolo como nuestro autómata principal.
                    this.automata = new Alien(0, 0);
                    this.cuadricula.agregarActorEnPerspectiva(this.automata, 0, 0, false);
                    
                    // Agregamos 3 tuercas a la escena.
                    for(var i = 0; i<3; i++){
			            var tuerca = new Tuerca(0,0);
			            this.cuadricula.agregarActorEnPerspectiva(tuerca, 0, i + 1, false);
			            tuerca.aprender(Vibrar, {'gradosDeAumentoStep':2, 'tiempoVibracion':40});
		            }
		            
		            contadorDeTuercas = new Contador(40,-227, "ContadorDeTuercas","Tuercas");
		            contadorDeReparaciones = new Contador(145,-227, "ContadorDeReparaciones","Reparaciones");
		            
                }
            
            }
            
            // Ponemos en escena la escena que acabamos de crear.
            pilas.mundo.gestor_escenas.cambiar_escena(new EscenaConAlienYBoton());
            
            setTimeout(() => {
                var escena = pilas.mundo.gestor_escenas.escena;
                var automata = escena.automata;
                automata.decir('Hola, de nuevo terrícola.');
                automata.decir('Este es un ejemplo de como interactuar con múltiples objetos, junto a un contador.');
                automata.decir('¿Ves aquellas tuercas de allí?. Las necesito para reparar mi Nave.');
                automata.decir('Avanzare 3 pasos a la derecha tomando cada una de ellas.');
                automata.avanzarUnaCasillaALaDerecha();
                automata.recolectarTuerca();
                automata.avanzarUnaCasillaALaDerecha();
                automata.recolectarTuerca();
                automata.avanzarUnaCasillaALaDerecha();
                automata.recolectarTuerca();
                automata.ponerTuercaEnNave();
                automata.ponerTuercaEnNave();
                automata.ponerTuercaEnNave();
                automata.decir('Perfecto! la nave esta completamente reparada. Ahora podre viajar por la galaxia!');
                automata.decir('Gracias por tu ayuda terricola, Hasta la próxima!');
            }, 500);
           
            
           
            `,
        params: {}
    },
    Dubaventuras: {
        code:
            `// esta escena muestra el proceso de construccion actual de tableros en pilas bloques.

                        
            class Duba extends ActorAnimado {

                constructor() {
		            super(0,0,{grilla: 'actor.duba.png', cantColumnas: 10, cantFilas: 15});
		            this.definirAnimacion("parado",
				        new Cuadros(0).repetirVeces(16)
				        .concat([33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52])
				        .concat(new Cuadros(0).repetirVeces(30))
				        .concat([33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52])
				        .concat(new Cuadros(0).repetirVeces(30))
				        .concat([33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52])
				        .concat(new Cuadros(0).repetirVeces(16))
				        .concat([0,1,2,3,4,5,6,7,8,9,10,11,11,12,12,13,14,15,16,17,18,19,19,20,21,22,23,23,23,24,25,26,27,27,28,29,30,31,31,31,31,31,32])
				        .concat(new Cuadros(0).repetirVeces(5)),
			            12, true);
		            this.definirAnimacion("correr", [0,53,54,55,56,57,58,59,60,0], 36);
		            this.definirAnimacion("correrChocando", [0,53,54,55,56,57,58,59,60,76,77,78,79,80,81,82,83,84,85,86,87,88,88,89,90,90], 12);
		            this.definirAnimacion("comerChurrasco",[0,0,61,62,63,64,65,65,65,65,66,67,68,69,70,71,72,73,74,75], 12);
		            this.definirAnimacion("obstaculo", [91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,128,128,128,128], 12);
		            this.definirAnimacion("error",[129,130,131,132,133,134,135,136,137,138,139,140,141,142,142,142,142], 12);
	           }
	           
	            // Duba dira un dialogo.
	           decir(dialogo) {
	               this.hacer_luego(Decir, { mensaje: dialogo, });
	           }
	           
	           moverACasillaDerecha() {
	               this.hacer_luego(MoverACasillaDerecha, {});   
	           }
	           
	           comerChurrasco() {
	               this.hacer_luego(Recolectar, {etiqueta:"Churrasco", nombreAnimacion: "comerChurrasco", animacionInteractuadoMientras: "desaparecer"});   
	           }
	           
            }
            
            class EscenaDuba extends EscenaDesdeMapa {
	            
	            clasesDeActoresInvolucrados() {
	                return [Duba, Churrasco, FlechaEscenarioAleatorio];
	            }

	            pathFondo() {
		            return 'fondo.duba.png';
	            }

	            imagenesAdicionales(){
		            return Casilla.imagenesPara('duba').concat(Obstaculo.imagenesPara('duba'));
                }   	
	            
	            constructor(especificacion, opciones, posFinal) {
	                super();
		            this.initDesdeUnaOVariasDescripciones(especificacion, opciones);

		            if (posFinal) {
			            this.xFinal = posFinal[0];
			            this.yFinal = posFinal[1];
		            }
		            
	            }
	            
	            ajustarGraficos() {
		            this.automata.escala *= this.escalaSegunCuadricula(1.6);
		            this.automata.setY(this.automata.getY() + this.automata.getAlto() / 8);

		            this.obtenerActoresConEtiqueta("Churrasco").forEach(churrasco => {
			            churrasco.aprender(Flotar, { Desvio: 5 });
			            churrasco.escala *= this.escalaSegunCuadricula(1.2) * 0.85;
		            });

		            this.obtenerActoresConEtiqueta("Obstaculo").forEach(obstaculo => {
			        obstaculo.escala *= this.escalaSegunCuadricula(1.1);
		            });
	            }
	            
	            mapearIdentificadorAActor(id, nroFila, nroColumna) {
		            switch(id) {
			            case 'A': return this.automata;
			            case 'O': return this.obtenerObstaculo(nroFila, nroColumna);
			            case 'P': return new Churrasco();
			            default: throw new Error("El identificador '" + id +"' no es válido en una escena de Duba.");
		            }
	            }
	            
	            obtenerAutomata() {
		            return new Duba();
	            }
	            
	            obtenerObstaculo(fila, columna) {
		            let archivosObstaculos = ["obstaculo.duba1.png", "obstaculo.duba2.png", "obstaculo.duba3.png", "obstaculo.duba4.png"];
		            return new Obstaculo(archivosObstaculos, (fila + 1) + (fila + 1) * (columna + 1));
	                
	            }
	           
                estaResueltoElProblema() {
                    return (this.contarActoresConEtiqueta("Churrasco")) === 0 && (this.xFinal === undefined || this.automata.casillaActual().sos(this.xFinal, this.yFinal));
                    
                }
                
                archivoFondo() {
		            return "fondo.duba.png";
	            }
	
	            cuadriculaX() {
		            return 0;
	            }
	
	            cuadriculaY() {
		            return -20;
	            }
	            
	            opsCuadricula() {
		            return { ancho: 340, alto: 380 };
	            }
	            
	            opsCasilla() {
		            return {
			            grilla: 'casillas.duba.png',
			            cantFilas: 1,
			            cantColumnas: 16,
			            bordesDecorados: true,
			            relAspecto: 1,
		            };
	            }

            }
            
            // Ponemos en escena la escena que acabamos de crear.
            pilas.mundo.gestor_escenas.cambiar_escena(new EscenaDuba("[O,O,O,O,O,O],\
                                                                      [O,-,-,-,O,-],\
                                                                      [-,A,-,-,P,-],\
                                                                      [-,-,-,O,-,-],\
                                                                      [O,O,O,O,-,O],"));
            var escena;
            var automata;
            var narrador;

            setTimeout(() => {
                escena = pilas.mundo.gestor_escenas.escena;
                automata = escena.automata;
                automata.moverACasillaDerecha();
                automata.moverACasillaDerecha();
                automata.moverACasillaDerecha();
                automata.comerChurrasco() ;
            }, 500);
           
            `,
        params: {}
    },
}