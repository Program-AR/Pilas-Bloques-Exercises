/// <reference path = "EscenaActividad.ts" />
/// <reference path = "../actores/CuadriculaMultiple.ts" />
/// <reference path = "../actores/segundoCiclo/Capy/Tacho.ts" />
/// <reference path = "../actores/segundoCiclo/Capy/Papel.ts" />
/// <reference path = "../actores/segundoCiclo/Capy/Capy.ts" />

class ReciclandoPapeles extends EscenaActividad {
  cuadricula : CuadriculaMultiple;
  definidor: DefinidorColumnasFijo;
  automata;
  tachos;
  papeles;

  iniciar() {
    this.fondo = new Fondo('fondo.capy.png',0,0);
    this.definidor = new DefinidorColumnasFijo(5,[5,6,8,4,7]);
    this.cuadricula = new CuadriculaMultiple(
      this.definidor,
      0,0,
      {separacionEntreCasillas: 5},
      {grilla:'casilla.futbolRobots2.png', 
        cantFilas: 5,
        cantColumnas: 16,
        alto:45,ancho:45}
    );
    this.cuadricula.cambiarImagenInicio('casillainiciomono.png');

    var capy = new Capy()
    capy.escala *= 0.5;
    this.automata = new ActorCompuesto(0, 0, { subactores: [capy] });    
    this.cuadricula.agregarActor(this.automata, 0, 0);
    this.automata.escala *= 0.3;
    //this.automata.x -= 10;
    this.automata.y += 40;

    this.papeles=[]
    this.tachos=[]

    this.cuadricula.forEachFila((nroFila: number) => this.agregarTacho(nroFila))
    this.cuadricula.forEachFila((nroFila: number) => this.agregarPapel(nroFila))

  }

  agregarPapel(fila: number) {
    var elPapel = new Papel()
    this.cuadricula.agregarActor(elPapel, fila, 0)
    elPapel.aprender(Flotar, { Desvio: 2 });
    this.papeles.push( new ActorCompuesto(0, 0, { subactores: [elPapel] }));
    //this.papel.escala *= 0.8;
  }

  agregarTacho(fila: number) {
    var elTacho = new Tacho()
    this.cuadricula.agregarActor(elTacho, fila, this.definidor.tamanos[fila]-1)
    this.tachos.push( new ActorCompuesto(0, 0, { subactores: [elTacho] }));
    this.tachos.escala *= 0.8;
  }

  estaResueltoElProblema(){
    return this.hayTachosLlenosAlFinalDeLasFilas() && this.cuadricula.cantFilas === this.cantidadDeTachosLlenos() && !this.cantidadDePapelesSinLevantar();
  }

  hayTachosLlenosAlFinalDeLasFilas(){
    return this.tachos.every( tacho => tacho.subactores[0].estaLleno() );
  }

  cantidadDePapelesSinLevantar(): number {
    var cant: number = 0;
    this.papeles.forEach( papel => cant += papel.subactores[0].vivo );
    return cant;
  }

  cantidadDeTachosLlenos(): number {
    var cant: number = 0;
    this.tachos.forEach( tacho => cant += tacho.subactores[0].estaLleno() );
    return cant;
  }

  ultimasCasillas(){
    return this.cuadricula.filterCasillas(casilla => casilla.esFin());
  }

  actualizar(): void {
    super.actualizar();    
    if( !this.tachos[this.automata.casillaActual().nroFila].subactores[0].estaLleno() && 
        this.automata.tieneAlgoEnLaMano() &&
        this.automata.casillaActual() === this.tachos[this.automata.casillaActual().nroFila].subactores[0].casillaActual() )
      this.tachos[this.automata.casillaActual().nroFila].subactores[0].llenar();
  }
}
