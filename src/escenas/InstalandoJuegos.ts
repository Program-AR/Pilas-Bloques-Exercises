/// <reference path = "./EscenaActividad.ts" />

class InstalandoJuegos extends EscenaActividad {

  public iniciar(): void {
    this.setFondo(new Fondo('fondos.biblioteca.png', 0, 0))

    this.setCuadricula(new Cuadricula(20, -50, 1, 4, { alto: 100, ancho: 400 },
      { grilla: 'invisible.png', cantColumnas: 1 }))

    for (var i = 1; i <= 3; ++i) {
      this.getCuadricula().agregarActor(new CompuAnimada(0, 0), 0, i)
    }

    this.setAutomata(new InstaladorAnimado(0, 0))
    this.getCuadricula().agregarActor(this.getAutomata(), 0, 0)
    this.getAutomata().setEscala(1)
    this.getAutomata().setX(-170)
    this.getAutomata().setY(-70)

    this.buildState()
  }

  private buildState(): void {
    var stateBuilder = new BuilderStatePattern(this, 'inicial')
    stateBuilder.agregarEstadosPrefijados('prendido', 1, 3)
    stateBuilder.agregarEstadosPrefijados('escritoA', 1, 3)
    stateBuilder.agregarEstadosPrefijados('escritoB', 1, 3)
    stateBuilder.agregarEstadosPrefijados('escritoC', 1, 3)
    stateBuilder.agregarEstadosPrefijados('juegoInstalado', 1, 3)
    stateBuilder.agregarEstadosPrefijados('maquinaApagada', 1, 3)
    stateBuilder.agregarEstadoAceptacion('todoInstalado')
    stateBuilder.agregarTransicionesIteradas('prendido', 'escritoA', 'escribirA', 1, 3, 1, 3)
    stateBuilder.agregarTransicionesIteradas('escritoA', 'escritoB', 'escribirB', 1, 3, 1, 3)
    stateBuilder.agregarTransicionesIteradas('escritoB', 'escritoC', 'escribirC', 1, 3, 1, 3)
    stateBuilder.agregarTransicionesIteradas('escritoC', 'juegoInstalado', 'instalar', 1, 3, 1, 3)
    stateBuilder.agregarTransicionesIteradas('juegoInstalado', 'maquinaApagada', 'apagar', 1, 2, 1, 2)
    stateBuilder.agregarTransicion('juegoInstalado3', 'todoInstalado', 'apagar')
    stateBuilder.agregarTransicion('inicial', 'prendido1', 'prender')
    stateBuilder.agregarTransicion('maquinaApagada1', 'prendido2', 'prender')
    stateBuilder.agregarTransicion('maquinaApagada2', 'prendido3', 'prender')
    stateBuilder.agregarError('inicial', 'instalar', 'Primero hay que prender la computadora')
    stateBuilder.agregarError('inicial', 'escribirA', 'Primero hay que prender la computadora')
    stateBuilder.agregarError('inicial', 'escribirB', 'Primero hay que prender la computadora')
    stateBuilder.agregarError('inicial', 'escribirC', 'Primero hay que prender la computadora')
    stateBuilder.agregarErrorAVariosEstadosDeSalida('maquinaApagada', 'instalar', 'Primero hay que prender la computadora', 1, 3)
    stateBuilder.agregarErrorAVariosEstadosDeSalida('maquinaApagada', 'escribirC', 'Primero hay que prender la computadora', 1, 3)
    stateBuilder.agregarErrorAVariosEstadosDeSalida('maquinaApagada', 'escribirA', 'Primero hay que prender la computadora', 1, 3)
    stateBuilder.agregarErrorAVariosEstadosDeSalida('maquinaApagada', 'escribirB', 'Primero hay que prender la computadora', 1, 3)
    stateBuilder.agregarErrorAVariosEstadosDeSalida('prendido', 'escribirC', 'Esa no es la clave correcta', 1, 3)
    stateBuilder.agregarErrorAVariosEstadosDeSalida('prendido', 'escribirB', 'Esa no es la clave correcta', 1, 3)
    stateBuilder.agregarErrorAVariosEstadosDeSalida('escritoA', 'escribirC', 'Esa no es la clave correcta', 1, 3)
    stateBuilder.agregarErrorAVariosEstadosDeSalida('escritoA', 'escribirA', 'Esa no es la clave correcta', 1, 3)
    stateBuilder.agregarErrorAVariosEstadosDeSalida('escritoB', 'escribirB', 'Esa no es la clave correcta', 1, 3)
    stateBuilder.agregarErrorAVariosEstadosDeSalida('escritoB', 'escribirA', 'Esa no es la clave correcta', 1, 3)

    this.setEstado(stateBuilder.estadoInicial())
  }

}