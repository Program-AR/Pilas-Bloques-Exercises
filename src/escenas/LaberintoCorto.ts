/// <reference path = "../escenas/LaberintoLargo.ts"/>

class LaberintoCorto extends LaberintoLargo {

  iniciar() {
    const aDerecha: boolean = Math.random() < 0.5;
    this.cantidadFilas = aDerecha ? 1 : 2;
    this.cantidadColumnas = aDerecha ? 2 : 1;
    super.iniciar();
  }

  public nombreFondo(): string {
    return 'fondo.laberinto.corto.png';
  }

  public dameOpcionesCuadricula() {
    return { 'alto': 200, 'ancho': 200 };
  }

}
