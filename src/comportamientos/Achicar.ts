/// <reference path = "ComportamientoAnimado.ts"/>

class Achicar extends ComportamientoAnimado {

  private velocidad: number
  private contador: number

  elReceptorSeAchico(): boolean {
    return this.receptor.getAncho() <= 1
  }

  /**
   * El receptor e puede achicar.
   * 
   * @param velocidad - La velocidad con la que se achicará.
   */
  protected achicar(velocidad: number): void {

    if (!this.receptor.seAchica) {
      this.receptor.seAchica = true
      this.velocidad = velocidad
      this.contador = 0
      this.receptor.cargarAnimacion("recoger")
    }

    else {
      this.contador = (this.contador + this.velocidad) 
      this.receptor.setAlto(this.receptor.getAlto() - this.contador);
      this.receptor.setAncho(this.receptor.getAncho() - this.contador);
      
      if (this.elReceptorSeAchico()) {
        this.receptor.eliminar()
      }

    }
  }

  doActualizar(): boolean {
    super.doActualizar()

    this.achicar(
      this.argumentos.velocidad
    )
    
    return this.elReceptorSeAchico()
  }

  implicaMovimiento(): boolean {
    return true
  }

}