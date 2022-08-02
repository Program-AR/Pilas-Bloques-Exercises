/// <reference path = "ElCangrejoAguafiestas.ts" />

class UnaFiestaArruinada extends ElCangrejoAguafiestas{
  cantidadGlobos = 1;

  matriz(){
    return [
      ['T','T','T','T','T'],
      ['F','F','T','F','F'],
      ['F','F','T','F','F'],
      ['F','F','T','F','F']]
  }

  agregarAutomata(){
    this.cuadricula.agregarActor(this.automata,0,this.cuadricula.cantColumnas-1);
  }

  completarColumnaConGlobos(columna, filas){
    filas.forEach(fila => this.agregarGlobo(this.cuadricula.casilla(fila, columna)));
    this.cantidadGlobos += 4;
  }

  completarConGlobos(){
    this.agregarGlobo(this.cuadricula.casilla(0,0));
    if(Math.random() > 0.5){
      this.completarColumnaConGlobos(2, [0,1,2,3]);
    }
  }
}
