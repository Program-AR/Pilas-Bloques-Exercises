/// <reference path = "./EscenaActividad.ts" />

class AlimentandoALosPeces extends EscenaActividad {
  private columnSize: number
  private rowSize: number
  private food: AlimentoAnimado

  public iniciar(): void {
    this.rowSize = 4
    this.columnSize = 5

    this.setFondo(new Fondo('fondo.alimentando_peces.png.png', 0, 0))
    this.setCuadricula(new Cuadricula(0, 0, this.rowSize, this.columnSize,
      { ancho: 328, alto: 262 }, { grilla: 'invisible.png', cantColumnas: 1 }))

    this.setAutomata(new BuzoAnimado(0, 0))
    this.getCuadricula().agregarActor(this.getAutomata(), this.rowSize - 1, 0)
    this.getAutomata().aprender(Flotar, { Desvio: 2 })

    this.food = new AlimentoAnimado(0, 0)
    this.getCuadricula().agregarActor(this.food, 1, this.columnSize - 1)
    this.setFood()
    this.buildState()
  }

  private buildState(): void {
    var stateBuilder = new BuilderStatePattern(this, 'no tengo comida ni peces alimentados')
    stateBuilder.agregarEstado('tengoLaComida')
    stateBuilder.agregarEstadosPrefijados('alimentado', 1, 6)
    stateBuilder.agregarEstadoAceptacion('alimentado7')
    stateBuilder.agregarTransicion('no tengo comida ni peces alimentados', 'tengoLaComida', 'recogerComida')
    stateBuilder.agregarTransicion('tengoLaComida', 'alimentado1', 'alimentarPez')
    stateBuilder.agregarTransicionesIteradas('alimentado', 'alimentado', 'alimentarPez', 1, 6, 2, 7)
    stateBuilder.agregarError('no tengo comida ni peces alimentados', 'alimentarPez', 'Debés recolectar primero el alimento')
    this.setEstado(stateBuilder.estadoInicial())
  }

  private setFood(): void {
    this.getCuadricula().agregarActor(new PezAnimado(0, 0), this.rowSize - 1, 1)
    this.getCuadricula().agregarActor(new PezAnimado(0, 0), this.rowSize - 1, 2)
    this.getCuadricula().agregarActor(new PezAnimado(0, 0), this.rowSize - 1, 3)
    this.getCuadricula().agregarActor(new PezAnimado(0, 0), 0, 0)
    this.getCuadricula().agregarActor(new PezAnimado(0, 0), 0, 1)
    this.getCuadricula().agregarActor(new PezAnimado(0, 0), 0, 2)
    this.getCuadricula().agregarActor(new PezAnimado(0, 0), 0, 3)
  }

}
