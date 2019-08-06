/// <reference path = "./EscenaActividad.ts" />

class TitoEnciendeLuces extends EscenaActividad {
  private lamparines: Array<Lamparin> = []

  public iniciar(): void {
    this.setFondo(new Fondo('fondos.estrellas.png', 0, 0))
    this.setCuadricula(new Cuadricula(0, 0, 5, 6,
      { separacionEntreCasillas: 5 },
      { grilla: 'casilla.grisoscuro.png', cantColumnas: 1, alto: 50, ancho: 50 }))

    //se cargan las luces
    var cant = 0
    var fila = 3
    var col = 0
    while (cant < 4) {
      this.agregarLuz(fila, col)
      fila -= 1
      col += 1
      cant += 1
    }
    cant = 0
    fila = 4
    col = 2
    while (cant < 4) {
      this.agregarLuz(fila, col)
      fila -= 1
      col += 1
      cant += 1
    }

    // se crea el automata
    this.setAutomata(new Tito(0, 0))
    this.getCuadricula().agregarActorEnPerspectiva(this.getAutomata(), 4, 0)
    this.getAutomata().escalarAAncho(this.getCuadricula().anchoCasilla() * 1.5)
  }

  private agregarLuz(fila: number, columna: number): void {
    var lamparin = new Lamparin(0, 0)
    this.lamparines.push(lamparin)
    this.getCuadricula().agregarActor(lamparin, fila, columna)
  }

  public estaResueltoElProblema(): boolean {
    return this.lamparines.every((lamparin: Lamparin) => lamparin.nombreAnimacionActual() == 'prendida')
  }
}
