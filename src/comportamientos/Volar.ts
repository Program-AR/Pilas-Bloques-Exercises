/// <reference path = "ComportamientoAnimado.ts"/>

class Volar extends ComportamientoAnimado {

  private aceleracion: number
  private alturaOriginal: number
  private contador: number

  elReceptorEstaFueraDePantalla(): boolean {
    return this.receptor.abajo >= pilas.arriba()
  }

  /**
   * El receptor puede volar.
   * 
   * @param aceleracion - La aceleracion que tendra al volar.
   * @param gradosDeAumentoStep - Los grados de aumento al rotar.
   
   */
  protected volar(aceleracion: number, 
                  gradosDeAumentoStep: number): void {

    if (!this.receptor.observada) {
      this.receptor.observada = true
      this.aceleracion = aceleracion
      this.contador = Math.random() * 3
      this.alturaOriginal = this.receptor.y
      this.receptor.cargarAnimacion("recoger")
      this.receptor.aprender(RotarContinuamente, { gradosDeAumentoStep })
    }

    else {
      this.contador = (this.contador + this.aceleracion) % 256 // para evitar overflow
      
      this.receptor.y += this.contador

      if (this.elReceptorEstaFueraDePantalla()) {
        this.receptor.eliminar()
      }

    }
  }

  doActualizar(): boolean {
    super.doActualizar()

    this.volar(
      this.argumentos.aceleracion,
      this.argumentos.gradosDeAumentoStep
    )
    
    return this.elReceptorEstaFueraDePantalla()
  }

  implicaMovimiento(): boolean {
    return true
  }

}