/// <reference path = "./EscenaActividad.ts" />

class LaberintoLargo extends EscenaActividad {

  protected cantidadFilas: number = 8
  protected cantidadColumnas: number = 8

  public iniciar(): void {
    this.setFondo(new Fondo(this.nombreFondo(), 0, 0))
    this.setCuadricula(new CuadriculaParaRaton(0, 0, this.cantidadFilas, this.cantidadColumnas, this.dameOpcionesCuadricula(), { '->': 'casillaDerecha.png', '<-': 'casillaIzquierda.png', 'v': 'casillaAbajo.png', '^': 'casillaArriba.png' }).dameCamino())
    this.setAutomata(new RatonAnimado(0, 0))
    this.getCuadricula().agregarActor(this.getAutomata(), 0, 0)
    this.getAutomata().setEscala(this.getAutomata().getEscala() * 2)
    this.getAutomata().setX(this.getAutomata().getX() - 5)
  }

  public dameOpcionesCuadricula() {
    return { 'alto': 440, 'ancho': 400 }
  }

  public nombreFondo(): string {
    return 'fondo.laberinto.largo.png'
  }

  public estaResueltoElProblema(): boolean {
    return this.getAutomata().alFinalDelCamino()
  }

}
