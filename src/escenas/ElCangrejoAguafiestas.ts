/// <reference path = "./EscenaActividad.ts" />

class ElCangrejoAguafiestas extends EscenaActividad {

  public iniciar(): void {
    this.setFondo(new Fondo('fondo.cangrejo_aguafiestas.png', 0, 0))

    var matriz = [
      ['T', 'T', 'T', 'T', 'T', 'T'],
      ['T', 'F', 'F', 'F', 'F', 'T'],
      ['T', 'T', 'T', 'T', 'T', 'T'],
      ['T', 'F', 'F', 'F', 'F', 'T'],
      ['T', 'T', 'T', 'T', 'T', 'T']]

    this.setCuadricula(new CuadriculaEsparsa(0, 15, { alto: 360, ancho: 400 }, { grilla: 'casilla.cangrejo_aguafiestas.png' }, matriz))
    this.completeSceneWithBallons()

    this.setAutomata(new CangrejoAnimado(0, 0))
    this.getAutomata().setEscala(this.getAutomata().getEscala() * 1.2)
    this.getCuadricula().agregarActor(this.getAutomata(), 0, 0)
    this.buildState()
  }
  
	private buildState(): void {
    this.setEstado(new EstadoParaContarBuilder(this, 'explotar', 18).estadoInicial())
	}

  private completeSceneWithBallons(): void {
    this.getCuadricula().forEachCasilla(c => { if (!c.esEsquina()) this.addBallon(c) })
  }

  private addBallon(grid: Casilla) {
    var balloon = new GloboAnimado()
    this.getCuadricula().agregarActorEnCasilla(balloon, grid, false)
    balloon.y += 20
    balloon.escala *= 0.8
    balloon.aprender(Flotar, { Desvio: 5 })
  }

}
