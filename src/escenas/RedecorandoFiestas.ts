/// <reference path = "UnaFiestaArruinada.ts" />

class RedecorandoFiestas extends UnaFiestaArruinada{
  cantidadGlobos = 0;

  matriz(){
    return [
      ['F','F','F','T','T','T','T'],
      ['T','T','T','T','F','T','F'],
      ['T','F','F','T','F','T','F'],
      ['T','F','F','T','F','T','F'],
      ['T','F','F','T','F','F','F']]
  }

  randomColumn(cantidad){
    return Math.floor(Math.random() * cantidad);
  }

  completarConGlobos(){
    var columnas = 
      [{columna:0, filas:[1,2,3,4]},
      {columna:3, filas:[1,2,3,4]},
      {columna:5, filas:[0,1,2,3]}]

    var index
    var columna

    [3, 2].forEach(cantidad => {
      index = this.randomColumn(cantidad);
      columna = columnas[index];
      this.completarColumnaConGlobos(columna.columna, columna.filas);
      columnas.splice(index, 1);
    });

    if(Math.random() > 0.5){
      this.completarColumnaConGlobos(columnas[0].columna, columnas[0].filas);
    } 

  }
}