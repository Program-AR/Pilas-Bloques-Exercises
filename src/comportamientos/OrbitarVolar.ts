/// <reference path = "ComportamientoAnimado.ts"/>

class OrbitarVolar extends ComportamientoAnimado {

  private angulo: number
  private radio: number
  private velocidad: number
  private pos_x: number

  elReceptorEstaFueraDePantalla(): boolean {
    return this.receptor.abajo >= pilas.arriba() || 
           this.receptor.izquierda >= pilas.derecha() ||
           this.receptor.derecha <= pilas.izquierda()
  }

  /**
   * El receptor puede orbitar.
   * 
   * @param radio
   * @param velocidad
   * 
  
   */
  protected orbitar(radio: number,
                    velocidad: number): void {

    if (!this.receptor.orbita) {
      this.receptor.orbita = true
      this.pos_x = this.receptor.x
      this.radio = radio
      this.velocidad = velocidad
      this.angulo = 0
      this.receptor.cargarAnimacion("recoger")
      //this.receptor.aprender(RotarContinuamente, { gradosDeAumentoStep: -2 } )
    }
    else
    {
      this.angulo += this.velocidad;
      this.radio += 0.5
      this.receptor.x = this.pos_x + (Math.cos(pilas.utils.convertir_a_grados(this.angulo)) * this.radio);
      this.receptor.y += 0.75

      if (this.elReceptorEstaFueraDePantalla()) {
        this.receptor.eliminar()
      }

    }
  }

  doActualizar(): boolean {
    super.doActualizar()
  
    this.orbitar(
      this.argumentos.radio,
      this.argumentos.velocidad
    )
    
    return this.elReceptorEstaFueraDePantalla()
  }

  implicaMovimiento(): boolean {
    return true
  }

}