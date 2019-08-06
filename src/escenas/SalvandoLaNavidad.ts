/// <reference path = "./EscenaActividad.ts" />

class SalvandoLaNavidad extends EscenaActividad {
  private cuadriculaMultiple: CuadriculaMultiple

  public iniciar(): void {
    this.setFondo(new Fondo('fondo.salvandonavidad.png', 0, 0))

    this.setCuadricula(new CuadriculaMultiple(new DefinidorColumnasFijo(5, [5, 6, 8, 4, 7]), 0, 0,
      { separacionEntreCasillas: 5 },
      { grilla: 'casilla.futbolRobots2.png', alto: 40, ancho: 40 }
    ))
    
    this.cuadriculaMultiple = this.getCuadricula() as CuadriculaMultiple
    this.cuadriculaMultiple.cambiarImagenInicio('casillainiciomono.png')
    this.setAutomata(new PapaNoelAnimado(0, 0))
    this.cuadriculaMultiple.agregarActorEnPerspectiva(this.getAutomata(), 0, 0)
    this.getAutomata().setEscala(this.getAutomata().getEscala() * 1.8)
  }

  estaResueltoElProblema() {
    return this.hayRegalosAlFinalDeLasFilas() && this.cuadriculaMultiple.cantFilas === this.cantidadObjetosConEtiqueta("RegaloAnimado")
  }

  public hayRegalosAlFinalDeLasFilas(): boolean {
    return this.ultimasCasillas().every(casilla => casilla.tieneActorConEtiqueta('RegaloAnimado'))
  }

  public ultimasCasillas(): Array<any> {
    return this.cuadriculaMultiple.filterCasillas((casilla: Casilla) => casilla.esFin())
  }

}
