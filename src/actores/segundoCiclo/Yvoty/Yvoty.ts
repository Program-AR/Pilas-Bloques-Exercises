/// <reference path="../../ActorAnimado.ts"/>
/// <reference path="../../../comportamientos/ComportamientoAnimado.ts"/>

class Yvoty extends ActorAnimado {
	static _grilla = 'actor.yvoty.png'

	constructor() {
		super(0, 0, { cantColumnas: 10, cantFilas: 8 });

		this.definirAnimacion("parado",
			new Cuadros(4).repetirVeces(1).
				concat([5, 6, 7, 8, 7, 6, 5]).
				concat(new Cuadros(9).repetirVeces(7)).
				concat([4, 5, 6, 7, 8, 7, 6, 5]).
				concat(new Cuadros(9).repetirVeces(16)).
				concat([10, 11, 12]).
				concat([4, 5, 6, 7, 8, 7, 6, 5]).
				concat(new Cuadros(9).repetirVeces(7)).
				concat([4, 5, 6, 7, 8, 7, 6, 5]).
				concat(new Cuadros(9).repetirVeces(16)).
				concat([10, 11, 12]).
				concat(new Cuadros(9).repetirVeces(11)).
				concat([13, 14, 14]).
				concat(new Cuadros(15).repetirVeces(15)).
				concat([14, 14, 13, 12]).
				concat(new Cuadros(9).repetirVeces(9))
			, 20, true);
		this.definirAnimacion("correr", [52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71], 20);
		this.definirAnimacion("correrChocando", [52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71], 20)
		this.definirAnimacion("obstaculo", [20, 21, 21, 22, 23, 24, 24, 24, 24, 25, 26, 27, 28, 29, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28], 12)
		this.definirAnimacion("error", [30, 30, 30, 30, 30, 30, 30, 31, 32, 33, 34, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 36, 36, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37], 12)
		this.definirAnimacion("recoger", [0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 20);
		this.definirAnimacion("usarCelu", [38, 38, 38, 39, 39, 40, 40, 40, 41, 42, 43, 41, 43, 42, 42, 42, 44, 45, 46, 47, 46, 42, 42, 42, 45, 46, 46, 46, 45, 44, 48, 48, 48, 49, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 51, 51, 38, 38, 38, 38, 38, 38, 38], 20);
		this.definirAnimacion("sacarFoto", [38, 38, 38, 39, 39, 40, 40, 40, 40, 72, 72, 72, 72, 72, 72, 72, 72, 72, 72, 40, 40, 40, 40], 20);
		this.definirAnimacion("escribir", [16, 16, 17, 17, 18, 18, 18, 19, 19, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18], 20);
	}
}
