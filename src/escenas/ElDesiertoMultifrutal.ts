/// <reference path = "EscenaActividad.ts" />
/// <reference path = "../../node_modules/pilasweb/dist/pilasweb.d.ts"/>


class ElDesiertoMultiFrutal extends EscenaActividad {


  iniciar() {
    this.fondo = new Fondo('fondo.toto.png', 0, 0);
    this.cuadricula = new CuadriculaMultiple(
      new DefinidorColumnasFijo(6, [5, 1, 5, 1, 1, 5]),
      0, 0,
      { separacionEntreCasillas: 3 },
      { grilla: 'casilla.desiertoMultifrutal2.png', alto: 60, ancho: 60 }
    );

    this.completarConFrutas()
    this.colorearPrimeraColumna()

    this.automata = new MarcianoAnimado(0, 0);
    this.cuadricula.agregarActorEnPerspectiva(this.automata, 0, 0, true);
    this.automata.escala *= 2;

  }

  colorearPrimeraColumna() {
    const filasTotales = [0, 1, 2, 3, 4, 5]

    filasTotales.forEach(fila => this.cuadricula.casilla(fila, 0).cambiarImagen('casilla.desiertoMultifrutal1.png'))
  }

  completarConFrutas() {
    const filasALlenar = [0, 2, 5]
    filasALlenar.forEach(fila => this.completarFilaConFrutas(fila))
  }

  completarFilaConFrutas(fila: number) {
    const columnasTotales = [1, 2, 3, 4]
    const columnaConFrutaAsegurada = columnasTotales[Math.floor(Math.random() * columnasTotales.length)]
    this.agregarFrutaEn(fila, columnaConFrutaAsegurada)

    const columnasConPosiblesFrutas = columnasTotales.filter(columna => columna !== columnaConFrutaAsegurada)

    columnasConPosiblesFrutas.forEach(columna => { if (Math.random() < 0.5) this.agregarFrutaEn(fila, columna) })
  }

  agregarFrutaEn(fila: number, columna: number) {
    this.cuadricula.agregarActor(this.frutaAleatoria(), fila, columna)
  }

  frutaAleatoria(): ActorAnimado {
    return Math.random() < 0.5 ? new NaranjaAnimada(0, 0) : new ManzanaAnimada(0, 0)
  }

  estaResueltoElProblema() {
    return this.contarActoresConEtiqueta('NaranjaAnimada') == 0 && this.contarActoresConEtiqueta('ManzanaAnimada') == 0
  }

}
