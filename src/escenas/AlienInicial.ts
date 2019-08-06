/// <reference path = "./EscenaActividad.ts" />

class AlienInicial extends EscenaActividad {
  private gridBackground: Actor
  private button: ActorAnimado

  public iniciar(): void {
    this.setFondo(new Fondo('fondos.alien-inicial.png', 0, 0))

    this.setCuadricula(new Cuadricula(-25, -200, 1, 4,
      { alto: 25, ancho: (pilas.opciones.ancho * 0.8) },
      { grilla: 'invisible.png', cantColumnas: 1 }))

    this.gridBackground = new Actor("camino-alien-boton.png", this.getCuadricula().getX(), this.getCuadricula().getY())
    this.gridBackground.setAncho(this.getCuadricula().getAncho())

    this.setAutomata(new AlienAnimado(0, 0))
    this.getCuadricula().agregarActorEnPerspectiva(this.getAutomata(), 0, 0, false)

    this.button = new BotonAnimado(0, 0)
    this.button.setDerecha(this.getCuadricula().getDerecha() + 25)
    this.button.setAbajo(this.getCuadricula().getArriba())

    this.buildState()
  }

  private buildState(): void {
    const stateBuilder = new BuilderStatePattern(this, 'botonApagado')
    stateBuilder.agregarEstadoAceptacion('botonEncendido')
    stateBuilder.agregarTransicion('botonApagado', 'botonEncendido', 'apretarBoton')
    this.setEstado(stateBuilder.estadoInicial())
  }

}
