/// <reference path = "./EscenaActividad.ts" />

class FutbolRobots extends EscenaActividad {
  private cuadriculaMultipleColumnas: CuadriculaMultiple
  private cantidadFilas: number = 8

  public iniciar(): void {
    this.setFondo(new Fondo('fondos.futbolRobots.png', 0, 0))

    this.setCuadricula(new CuadriculaMultiple(new DefinidorColumnasRandom(this.cantidadFilas, 6),
      0, -50, { separacionEntreCasillas: 5 }, { grilla: 'casilla.futbolRobots2.png', alto: 40, ancho: 40 }))

    this.cuadriculaMultipleColumnas = this.getCuadricula() as CuadriculaMultiple
    this.cuadriculaMultipleColumnas.cambiarImagenInicio('casilla.futbolRobots1.png')

    this.setAutomata(new RobotAnimado(0, 0))
    this.cuadriculaMultipleColumnas.agregarActor(this.getAutomata(), 0, 0)

    const casilla: Casilla = this.cuadriculaMultipleColumnas.casilla(0, 0)

    this.getAutomata().escalarAAlto(3.5 * casilla.getAlto())
    this.getAutomata().setAbajo(casilla.getY() - (0.25 * casilla.getAlto()))
    this.getAutomata().setRadioDeColision(this.getAutomata().getAlto() / 2.5)

    for (var fila = 0; fila < this.cantidadFilas; ++fila) {
      this.cuadriculaMultipleColumnas.agregarActor(new PelotaAnimada(0, 0), fila, this.cuadriculaMultipleColumnas.dameIndexUltimaPosicion(fila))
    }

    this.buildState()

  }

  private buildState(): void {
    this.setEstado(new EstadoParaContarBuilder(this, 'patear', this.cantidadFilas).estadoInicial())
  }

}
