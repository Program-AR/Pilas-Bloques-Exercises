/// <reference path = "./EscenaActividad.ts" />

class ElDetectiveChaparro extends EscenaActividad {
  private culpable: Sospechoso

  public iniciar(): void {
    this.setFondo(new Fondo('fondo.detective.png', 0, 0))
    this.setCuadricula(new Cuadricula(0, -30, 1, 7, { ancho: 400, alto: 400 }, { grilla: 'invisible.png', cantColumnas: 1 }))

    Sospechoso.reiniciarDisfraces()

    const nroCulpable: number = Math.floor(Math.random() * 7)
    const suspectValues: Array<number> = [0, 1, 2, 3, 4, 5, 6]

    suspectValues.forEach(pos => {
      var sospechoso = new Sospechoso()
      this.getCuadricula().agregarActor(sospechoso, 0, pos, false)

      if (pos === nroCulpable) {
        this.culpable = sospechoso
      }

    })

    this.culpable.hacerCulpable()
    this.setAutomata(new Detective())
    this.getCuadricula().agregarActor(this.getAutomata(), 0, Math.floor(Math.random() * 7), false)
    this.getAutomata().setY(-100)
    this.getAutomata().aprender(Flotar, {})
  }

  public estaResueltoElProblema(): boolean {
    return this.getAutomata().casillaActual() === this.culpable.casillaActual() && this.culpable.teEncontraron()
  }

}

class SacarDisfraz extends Decir {

  public iniciar(detective: Detective): void {
    this.argumentos.receptor = detective.obtenerActorBajoLaLupa()
    this.argumentos.receptor.sacarDisfraz()
    this.argumentos.mensaje = this.argumentos.receptor.mensajeAlSacarDisfraz()
    super.iniciar(detective)
  }

}
