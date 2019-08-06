/// <reference path = "./EscenaActividad.ts" />

/**
 * @class SuperViaje
 *
 */
class SuperViaje extends EscenaActividad {

  private superHeroe: any

  public iniciar(): void {
    this.setFondo(new FondoAnimado('fondo.elSuperviaje.png', pilas.derecha(), 0))
    this.setAutomata(new Superheroe())
    this.getAutomata().aprender(Flotar, { Desvio: 10 })

    this.superHeroe = this.getAutomata()
    this.superHeroe.totalKM = 15 + Math.round(Math.random() * 30)
    this.superHeroe.restantesKM = this.superHeroe.totalKM

    this.superHeroe.kmsTotales = function () {
      return this.totalKM
    }

    this.crearTablero()

    this.superHeroe.fraseAlVolar = function () {
      this.restantesKM--
      if (this.restantesKM == 0) return "¡Llegué!"
      if (this.restantesKM == 1) return "¡Falta 1 kilometro!"
      if (this.restantesKM < 0) throw new ActividadError("Ya llegué, ¡no debo seguir volando!")

      return "¡Faltan " + this.restantesKM + " kilometros!"
    }
  }

  private crearTablero(): void {
    Trait.toObject(Observado, this.getAutomata())
    var tablero = new Tablero(0, 210, { texto: "Kilómetros a recorrer", atributoObservado: 'kmsTotales' })
    this.superHeroe.registrarObservador(tablero)
  }

  public estaResueltoElProblema(): boolean {
    return this.superHeroe.restantesKM === 0
  }

}
