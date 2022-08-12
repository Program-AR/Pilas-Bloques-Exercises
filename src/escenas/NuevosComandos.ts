/// <reference path = "AlienInicial.ts" />

class NuevosComandos extends AlienInicial {
  iniciar() {
    super.iniciar()
    this.automata.y -= 20
    this.automata.x -= 11
  }

  agregarCuadricula() {
    this.cuadricula = new CuadriculaEsparsa(0, 0, { alto: 300, ancho: 250, separacionEntreCasillas: 5 },
      { grilla: 'casilla.alien_curva.png' }, this.matriz());
    this.colorearPrimeraColumna()
  }

  matriz() {
    return [
      ['T', 'T', 'T'],
      ['T', 'F', 'T'],
      ['T', 'F', 'F'],
      ['T', 'T', 'T'],
      ['T', 'F', 'T']
    ]
  }

  armarEstado() {
    return new EstadoParaContarBuilder(this, 'apretarBoton', 5).estadoInicial();
  }

  agregarBotones() {
    [0, 1, 3, 4].forEach(y => this.agregarBoton(2, y))
    this.agregarBoton(0, 4)
  }

  agregarBoton(x, y) {
    const boton = new BotonAnimado(0, 0)
    this.cuadricula.agregarActorEnPerspectiva(boton, y, x, false)
    boton.escala *= 0.83
    boton.x += 30
    boton.y -= 28.5
  }

  colorearPrimeraColumna() {
    [0, 1, 2, 3, 4].forEach(fila => this.cuadricula.casilla(fila, 0).cambiarImagen('casillas.alien_inicial.png'))
  }


}
