/// <reference path = "ComportamientoAnimado.ts"/>

class SerPateado extends ComportamientoAnimado {

  private aceleracion: number
  private alturaOriginal: number
  private contador: number
  private elevacionMaxima: number
  private tiempoEnElAire: number

  elReceptorEstaFueraDePantalla(): boolean {
    return this.receptor.izquierda >= pilas.derecha()
  }

  /**
   * El receptor es pateado.
   * 
   * @param aceleracion - La aceleracion que tendra al ser pateado.
   * @param elevacionMaxima - La elevación maxima que tendra al ser pateado.
   * @param gradosDeAumentoStep - Los grados de aumento.
   * @param tiempoEnElAire - El tiempo que permanecera en el aire.
   */
  protected patear(aceleracion: number, elevacionMaxima: number, gradosDeAumentoStep: number, tiempoEnElAire: number): void {

    if (!this.receptor.pateado) {
      this.receptor.pateado = true
      this.aceleracion = aceleracion
      this.elevacionMaxima = elevacionMaxima
      this.tiempoEnElAire = tiempoEnElAire
      this.contador = Math.random() * 3
      this.alturaOriginal = this.receptor.y
      this.receptor.cargarAnimacion("patear")
      this.receptor.aprender(RotarContinuamente, { gradosDeAumentoStep })
    }

    else {
      this.contador = (this.contador + this.aceleracion) % 256 // para evitar overflow

      if (this.receptor.y < this.alturaOriginal + this.elevacionMaxima && this.tiempoEnElAire > 0) {
        //subiendo
        this.receptor.y += this.contador
      }

      if (this.tiempoEnElAire > 0) {
        //en el aire
        this.tiempoEnElAire -= 1
      }

      if (this.tiempoEnElAire <= 0) {
        //bajando
        if (this.receptor.y > this.alturaOriginal) {
          this.receptor.y -= this.contador
        }
      }
      this.receptor.x += this.contador

      if (this.elReceptorEstaFueraDePantalla()) {
        this.receptor.eliminar()
      }

    }
  }

  doActualizar(): boolean {
    super.doActualizar()

    this.patear(
      this.argumentos.aceleracion,
      this.argumentos.elevacionMaxima,
      this.argumentos.gradosDeAumentoStep,
      this.argumentos.tiempoEnElAire
    )

    return this.elReceptorEstaFueraDePantalla()
  }

  implicaMovimiento(): boolean {
    return true
  }

}