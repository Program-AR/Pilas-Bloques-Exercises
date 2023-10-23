/// <reference path = "EscenaActividad.ts" />
/// <reference path = "../actores/CuadriculaMultiple.ts" />
/// <reference path = "../actores/segundoCiclo/Capy/Tacho.ts" />
/// <reference path = "../actores/segundoCiclo/Capy/Papel.ts" />
/// <reference path = "../actores/segundoCiclo/Capy/Capy.ts" />

class ReciclandoPapeles extends EscenaActividad {
  cuadricula : CuadriculaMultiple;
  definidor: DefinidorColumnasFijo;

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
    
    
    var capy = new Capy();
    this.cuadricula.agregarActorEnPerspectiva(capy, 0, 0);
    this.automata = new ActorCompuesto(0, 0, { subactores: [capy] });    
    //this.automata.escala *= 3.2;
    //this.automata.x -= 10;
    this.automata.y += 30;
/*
    this.automata = new Capy()
    this.cuadricula.agregarActorEnPerspectiva(this.automata, 0, 0);
*/

    this.cuadricula.forEachFila((nroFila: number) => this.agregarTacho(nroFila))
    this.cuadricula.forEachFila((nroFila: number) => this.agregarPapel(nroFila))

    /*
    var elTacho = new Tacho();
    this.cuadricula.agregarActor(elTacho, this.cuadricula.cantFilas - 1, 0);
    this.tacho = new ActorCompuesto(0, 0, { subactores: [elTacho] });
    this.tacho.escala *= 0.9;
    this.tacho.y -= 20;
    this.tacho.x += 10;      
    */
  }

  agregarPapel(fila: number) {
    var elPapel = new Papel()
    this.cuadricula.agregarActor(elPapel, fila, 0)
    elPapel.aprender(Flotar, { Desvio: 2 });
    var papel = new ActorCompuesto(0, 0, { subactores: [elPapel] });
    papel.escala *= 0.8;
  }

  agregarTacho(fila: number) {
    var elTacho = new Tacho()
    this.cuadricula.agregarActor(elTacho, fila, this.definidor.tamanos[fila]-1)
    var tacho = new ActorCompuesto(0, 0, { subactores: [elTacho] });
    tacho.escala *= 0.8;
  }

  estaResueltoElProblema(){
    return this.hayTachosLlenosAlFinalDeLasFilas()  && this.cuadricula.cantFilas === this.cantidadObjetosConEtiqueta("TachoLleno");
  }

  hayTachosLlenosAlFinalDeLasFilas(){
    return this.ultimasCasillas().every( casilla => casilla.tieneActorConEtiqueta('TachoLleno') );
  }

  ultimasCasillas(){
    return this.cuadricula.filterCasillas(casilla => casilla.esFin());
  }


}
