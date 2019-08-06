/// <reference path = "./EscenaActividad.ts" />

class PrendiendoLasFogatas extends EscenaActividad {
  private cantidadFilas: number = 7
  private cantidadColumnas: number = 7
  private fogatas: Array<FogataAnimada> = []

  public iniciar(): void {
    this.setFondo(new Fondo('fondo.BosqueDeNoche.png', 0, 0))

    let matriz = [
      ['T', 'T', 'T', 'T', 'T', 'T', 'T'],
      ['T', 'F', 'F', 'F', 'F', 'F', 'T'],
      ['T', 'F', 'F', 'F', 'F', 'F', 'T'],
      ['T', 'F', 'F', 'F', 'F', 'F', 'T'],
      ['T', 'F', 'F', 'F', 'F', 'F', 'T'],
      ['T', 'F', 'F', 'F', 'F', 'F', 'T'],
      ['T', 'T', 'T', 'T', 'T', 'T', 'T']
    ]

    this.setCuadricula(new CuadriculaEsparsa(0, 0, { ancho: 400, alto: 400 }, { grilla: 'casillas.violeta.png' }, matriz))

    this.agregarFogatas()
    this.setAutomata(new ScoutAnimado(0, 0))
    this.getCuadricula().agregarActorEnPerspectiva(this.getAutomata(), 0, 0)
  }

  private agregarFogatas(): void {

    for (var i = 1; i < this.cantidadColumnas - 1; i++) {
      if (Math.random() < .5) {
        this.agregarFogata(0, i)
        //filaSuperior
      }
      if (Math.random() < .5) {
        this.agregarFogata(this.cantidadFilas - 1, i)
      }
      //filaInferior
    }

    for (var j = 1; j < this.cantidadFilas - 1; j++) {

      if (Math.random() < .5) {
        this.agregarFogata(j, 0)
      }

      if (Math.random() < .5) {
        this.agregarFogata(j, this.cantidadColumnas - 1)
      }
    }
  }

  private agregarFogata(fila: number, columna: number): void {
    let fogata = new FogataAnimada(0, 0)
    this.getCuadricula().agregarActor(fogata, fila, columna)
    this.fogatas.push(fogata)
  }

  public estaResueltoElProblema(): boolean {
    return this.fogatas.every((fogata: FogataAnimada) => (fogata.nombreAnimacionActual() === 'prendida'))
  }

}
