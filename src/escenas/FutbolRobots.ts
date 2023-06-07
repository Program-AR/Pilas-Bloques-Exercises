/// <reference path = "EscenaActividad.ts" />
/// <reference path="../actores/ActorAnimado.ts"/>
/// <reference path="../actores/CuadriculaMultiple.ts"/>
/// <reference path = "EstadosDeEscena.ts" />

class FutbolRobots extends EscenaActividad {
  automata: ActorAnimado;
  fondo;
  cuadricula: CuadriculaMultiple;
  cantPateadas;
  cantidadFilas;

  iniciar() {
    this.fondo = this.obtenerFondo()
    this.cantidadFilas = 8;

    this.cuadricula = new CuadriculaMultiple(
      new DefinidorColumnasRandom(this.cantidadFilas, 6),
      0, -50,
      { separacionEntreCasillas: 5 },
      { grilla: this.imagenCasillas(), alto: 40, ancho: 40 })
    this.cuadricula.cambiarImagenInicio(this.imagenCasillasInicio());

    this.automata = this.obtenerAutomata()
    this.cuadricula.agregarActor(this.automata, 0, 0);
    this.automata.radio_de_colision = this.automata.alto / 2.5;
    
    for (var fila = 0; fila < this.cantidadFilas; ++fila) {
      this.cuadricula.agregarActor(new PelotaAnimada(0, 0), fila, this.cuadricula.dameIndexUltimaPosicion(fila))
    };
    this.ajustarAutomata()
    
    this.estado = new EstadoParaContarBuilder(this, 'patear', this.cantidadFilas).estadoInicial();
  }

  ajustarAutomata() {
    var casilla = this.cuadricula.casilla(0, 0);
    this.automata.escalarAAlto(3.5 * casilla.alto);
    this.automata.abajo = casilla.y - (0.25 * casilla.alto);
  }

  obtenerAutomata() {
    return new RobotAnimado(0, 0);
  }

  obtenerFondo() {
    return new Fondo('fondos.futbolRobots.png', 0, 0);
  }

  imagenCasillas() {
    return 'casilla.futbolRobots2.png'
  }

  imagenCasillasInicio() {
    return 'casilla.futbolRobots1.png'
  }
}
