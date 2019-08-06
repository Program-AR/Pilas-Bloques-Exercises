/// <reference path = "./EscenaActividad.ts" />

class ElPlanetaDeNano extends EscenaActividad {
  private cantidadInicial: number
  private cantidadFilas: number = 4
  private cantidadColumnas: number = 5
  private secuenciaCaminata: Secuencia
  private tablero: Tablero

  public iniciar(): void {
    this.setFondo(new Fondo('fondos.elPlanetaDeNano.png', 0, 0))
    this.setCuadricula(new Cuadricula(0, 0,
      this.cantidadFilas, this.cantidadColumnas,
      { alto: 300, ancho: 300, separacionEntreCasillas: 3 },
      { grilla: 'casillas.elPlanetaDeNano.png' }))

    this.setAutomata(new NanoAnimado(0, 0))
    this.getCuadricula().agregarActor(this.getAutomata(), this.cantidadFilas - 1, 0)
    this.getAutomata().setEscala(this.getAutomata().getEscala() * 1.8)
    this.getAutomata().setY(this.getAutomata().getY() + 15)

    this.tablero = new Tablero(150, 220, { texto: "Bananas" })
    this.secuenciaCaminata = new Secuencia({ 'secuencia': [new MoverACasillaIzquierda({})] })
    this.secuenciaCaminata.iniciar(this.getAutomata())

    this.completarConBananas()
    this.cantidadInicial = this.contarActoresConEtiqueta('BananaAnimada')

  }

  public actualizar(): void {
    super.actualizar()
    if (this.tablero) {
      this.tablero.setearValor(this.cantidadRecolectadas())
    }
  }

  private cantidadRecolectadas(): number {
    return this.cantidadInicial - this.contarActoresConEtiqueta('BananaAnimada')
  }

  private completarConBananas(): void {
    const cantidad = [2, 4, 1, 3]
    for (var i = 0; i < this.cantidadFilas; i++) {
      for (var j = 1; j <= cantidad[i]; j++) {
        this.getCuadricula().agregarActor(new BananaAnimada(0, 0), i, j)
      }
    }
  }

  public estaResueltoElProblema(): boolean {
    return this.contarActoresConEtiqueta('BananaAnimada') == 0
  }

}
