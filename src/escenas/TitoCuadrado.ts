/// <reference path = "./EscenaActividad.ts" />

class TitoCuadrado extends EscenaActividad {
  private cuadriculaEsparsa: CuadriculaEsparsa
  private cantidadFilas: number = 7
  private cantidadColumnas: number = 7
  private lamparines: Array<Lamparin> = []

  public iniciar(): void {
    this.setFondo(new Fondo('fondo.tito-cuadrado.png', 0, 0))
    var matriz = [
      ['T', 'T', 'T', 'T', 'T', 'T', 'T'],
      ['T', 'F', 'F', 'F', 'F', 'F', 'T'],
      ['T', 'F', 'F', 'F', 'F', 'F', 'T'],
      ['T', 'F', 'F', 'F', 'F', 'F', 'T'],
      ['T', 'F', 'F', 'F', 'F', 'F', 'T'],
      ['T', 'F', 'F', 'F', 'F', 'F', 'T'],
      ['T', 'T', 'T', 'T', 'T', 'T', 'T']
    ]
    this.setCuadricula(new CuadriculaEsparsa(0, 0, { ancho: 400, alto: 400 }, { grilla: 'casillas.violeta.png' }, matriz))
    this.cuadriculaEsparsa = this.getCuadricula() as CuadriculaEsparsa
    this.agregarLuces()

    this.setAutomata(new Tito(0, 0))
    this.cuadriculaEsparsa.agregarActorEnPerspectiva(this.getAutomata(), 0, 0)
    this.getAutomata().setEscala(this.getAutomata().getEscala() * 1.5)
  }

  private agregarLuces(): void {
    for (var i = 1; i < this.cantidadColumnas - 1; i++) {
      if (Math.random() < .5) {
        this.agregarLuz(0, i)
        //filaSuperior
      }
      if (Math.random() < .5) {
        this.agregarLuz(this.cantidadFilas - 1, i)
      }
      //filaInferior
    }

    for (var j = 1; j < this.cantidadFilas - 1; j++) {
      if (Math.random() < .5) {
        this.agregarLuz(j, 0)
      }
      if (Math.random() < .5) {
        this.agregarLuz(j, this.cantidadColumnas - 1)
      }
    }
  }

  private agregarLuz(fila: number, columna: number): void {
    var lamparin = new Lamparin(0, 0)
    this.lamparines.push(lamparin)
    this.cuadriculaEsparsa.agregarActor(lamparin, fila, columna)
  }

  public estaResueltoElProblema(): boolean {
    return this.lamparines.every(lamparin => lamparin.nombreAnimacionActual() == 'prendida')
  }

}
