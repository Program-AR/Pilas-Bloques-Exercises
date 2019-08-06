/// <reference path = "LaberintoLargo.ts" />

class LaberintoConQueso extends LaberintoLargo {

  private cuadriculaEsparsa: CuadriculaEsparsa

  public iniciar(): void {
    super.iniciar()
    this.cuadriculaEsparsa = this.getCuadricula() as CuadriculaEsparsa
    this.cuadriculaEsparsa.completarConObjetosRandom(new ConjuntoClases([QuesoAnimado]),
      { condiciones: [(casilla: Casilla) => casilla.hayAbajo() || casilla.hayDerecha()] })
    this.getAutomata().setZ(pilas.escena_actual().minZ() - 1)
  }

  public dameOpcionesCuadricula() {
    return { 'alto': 440, 'ancho': 400, 'largo_min': 3, 'largo_max': 15 }
  }

  public nombreFondo(): string {
    return 'fondo.laberinto.queso.png'
  }

  public estaResueltoElProblema(): boolean {
    return this.getAutomata().alFinalDelCamino() && this.contarActoresConEtiqueta('QuesoAnimado') == 0
  }

}
