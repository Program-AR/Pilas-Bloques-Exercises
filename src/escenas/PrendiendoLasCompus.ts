/// <reference path = "./EscenaActividad.ts" />

class PrendiendoLasCompus extends EscenaActividad {
  private cantidadMaxColumnas: number = 12
  private cantidadMinColumnas: number = 4
  private cantidadMaxFilas: number = 10
  private cantidadMinFilas: number = 5
  private cantidadFilas: number
  private cantidadColumnas: number
  private ladoCasilla: number = 30
  private compus: Array<CompuAnimada> = []

  public iniciar(): void {
    this.cantidadFilas = Math.floor(this.cantidadMinFilas + (Math.random() * (this.cantidadMaxFilas - this.cantidadMinFilas)))
    this.cantidadColumnas = Math.floor(this.cantidadMinColumnas + (Math.random() * (this.cantidadMaxColumnas - this.cantidadMinColumnas)))

    this.setFondo(new Fondo('fondo.prendiendoLasCompus.png', 0, 0))
    this.setCuadricula(new Cuadricula(0, (this.ladoCasilla + 2) * 2, this.cantidadFilas, this.cantidadColumnas,
      { separacionEntreCasillas: 2 },
      { grilla: 'casilla.prendiendoLasCompus.png', alto: this.ladoCasilla, ancho: this.ladoCasilla }))

    this.setAutomata(new InstaladorAnimado(0, 0))
    this.getCuadricula().agregarActorEnPerspectiva(this.getAutomata(), 0, 0)
    this.completarConCompusEnLaterales()
  }

  private completarConCompusEnLaterales(): void {
    //Completo la primer y ultima fila
    for (var i = 1; i < this.cantidadColumnas - 1; ++i) {
      this.addCompu(0, i)
      this.addCompu(this.cantidadFilas - 1, i)
    }
    //Completo la primer y ultima columna
    for (var i = 1; i < this.cantidadFilas - 1; ++i) {
      this.addCompu(i, 0)
      this.addCompu(i, this.cantidadColumnas - 1)
    }

  }

  private addCompu(fila: number, columna: number): void {
    const compu = new CompuAnimada(0, 0)
    this.getCuadricula().agregarActor(compu, fila, columna)
    this.compus.push(compu)
  }

  public estaResueltoElProblema(): boolean {
    return this.compus.every(compu => compu.nombreAnimacionActual() === 'prendida')
  }

}
