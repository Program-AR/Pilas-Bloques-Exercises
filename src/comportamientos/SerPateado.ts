/// <reference path = "ComportamientoAnimado.ts"/>
/// <reference path = "../actores/ActorPateable.ts" />

class SerPateado extends ComportamientoAnimado {

  private _receptor: ActorPateable

  preAnimacion(): void {
    this._receptor = this.receptor as ActorPateable
  }

  doActualizar(): boolean {
    super.doActualizar()

    this._receptor.serPateado(
      this.argumentos.aceleracion,
      this.argumentos.elevacionMaxima,
      this.argumentos.gradosDeAumentoStep,
      this.argumentos.tiempoEnElAire
    )

    return this._receptor.estoyFueraDePantalla()
  }

  implicaMovimiento(): boolean {
    return true
  }

}