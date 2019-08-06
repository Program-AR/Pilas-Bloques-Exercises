/// <reference path = "./EscenaActividad.ts" />
/// <reference path = "./EstadosDeEscena.ts" />
/// <reference path = "../actores/AlienAnimado.ts" />
/// <reference path = "../actores/BotonAnimado.ts" />
/// <reference path = "../actores/Cuadricula.ts" />

class AlienInicial extends EscenaActividad {
  private fondoCuadricula: Actor
  private boton: ActorAnimado

  public iniciar(): void {
    this.setEstado(this.armarEstado())
    this.setFondo(new Fondo('fondos.alien-inicial.png', 0, 0))

    this.setCuadricula(new Cuadricula(-25, -200, 1, 4,
      { alto: 25, ancho: (pilas.opciones.ancho * 0.8) },
      { grilla: 'invisible.png', cantColumnas: 1 }))

    this.fondoCuadricula = new Actor("camino-alien-boton.png", this.getCuadricula().getX(), this.getCuadricula().getY())
    this.fondoCuadricula.setAncho(this.getCuadricula().getAncho())

    this.setAutomata(new AlienAnimado(0, 0))
    this.getCuadricula().agregarActorEnPerspectiva(this.getAutomata(), 0, 0, false)

    this.boton = new BotonAnimado(0, 0)
    this.boton.derecha = this.getCuadricula().derecha + 25
    this.boton.abajo = this.getCuadricula().arriba
  }

  private armarEstado(): EstadoConTransicion {
    var stateBuilder = new BuilderStatePattern(this, 'botonApagado')
    stateBuilder.agregarEstadoAceptacion('botonEncendido')
    stateBuilder.agregarTransicion('botonApagado', 'botonEncendido', 'apretarBoton')
    return stateBuilder.estadoInicial()
  }

}
