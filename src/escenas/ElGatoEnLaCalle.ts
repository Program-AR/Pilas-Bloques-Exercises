/// <reference path = "./EscenaActividad.ts" />

class ElGatoEnLaCalle extends EscenaActividad {

  iniciar() {
    this.setFondo(new Fondo('fondo.gatoEnLaCalle.png', 0, 0))
    this.setAutomata(new GatoAnimado(0, -150))
    this.buildState()
  }

  private buildState(): void {
    // ver https://github.com/Program-AR/pilas-bloques/issues/187
    var stateBuilder = new BuilderStatePattern(this, 'inicial', false)
    stateBuilder.agregarEstado('posCorrecta', false)
    stateBuilder.agregarEstado('semiDormido1', false)
    stateBuilder.agregarEstado('semiDormido2', false)
    stateBuilder.agregarEstado('dormido', false)
    stateBuilder.agregarEstado('semiDespierto1', false)
    stateBuilder.agregarEstado('semiDespierto2', false)
    stateBuilder.agregarEstado('despierto', false)
    stateBuilder.agregarEstado('saludado', false)
    stateBuilder.agregarEstado('noResuelve', false)
    stateBuilder.agregarEstadoAceptacion('fin')

    stateBuilder.agregarTransicion('inicial', 'posCorrecta', 'avanzar')
    stateBuilder.agregarTransicion('posCorrecta', 'semiDormido1', 'acostarse')
    stateBuilder.agregarTransicion('posCorrecta', 'semiDormido2', 'cerrarOjos')
    stateBuilder.agregarTransicion('semiDormido1', 'dormido', 'cerrarOjos')
    stateBuilder.agregarTransicion('semiDormido2', 'dormido', 'acostarse')
    stateBuilder.agregarTransicion('dormido', 'dormido', 'soniar')
    stateBuilder.agregarTransicion('dormido', 'semiDespierto1', 'abrirOjos')
    stateBuilder.agregarTransicion('dormido', 'semiDespierto2', 'levantarse')
    stateBuilder.agregarTransicion('semiDespierto1', 'despierto', 'levantarse')
    stateBuilder.agregarTransicion('semiDespierto2', 'despierto', 'abrirOjos')
    stateBuilder.agregarTransicion('despierto', 'saludado', 'saludar')
    stateBuilder.agregarTransicion('saludado', 'fin', 'volver')
    this.setEstado(stateBuilder.estadoInicial())
  }
}
