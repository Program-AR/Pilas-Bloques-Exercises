/// <reference path="../../ActorAnimado.ts"/>
/// <reference path="../../../comportamientos/ComportamientoAnimado.ts"/>e

class Manic extends ActorAnimado {
	static _grilla = 'actor.manic.png'

	constructor() {
		super(0, 0, { cantColumnas: 10, cantFilas: 9 });
		this.definirAnimacion("parado",
			new Cuadros(32).repetirVeces(18)
				.concat([33, 34, 34, 32, 32, 32, 32, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 44, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32])
				.concat(new Cuadros(32).repetirVeces(18))
				.concat([33, 34, 34, 32, 32, 32, 32, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 44, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32])
				.concat([32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 33, 34, 34, 32, 32, 32, 32, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 44, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32])
				.concat([32]),
			20, true);
		this.definirAnimacion("correr", [0, 1, 2, 3, 4, 5, 6, 7, 6, 5, 6, 7, 6, 5, 6, 7, 7], 20);
		this.definirAnimacion("correrChocando", [0, 1, 2, 3, 4, 5, 6, 7, 6, 5, 6, 7, 6, 5, 6, 7, 7], 12)
		this.definirAnimacion("obstaculo", [8, 8, 9, 9, 10, 10, 11, 11, 11, 12, 13, 14, 14, 16, 15, 14, 14], 12)
		this.definirAnimacion("error", [47, 48, 49, 50, 51, 51, 52, 53, 53, 53, 53, 53, 53, 53, 53, 53, 53, 53], 12)
		this.definirAnimacion("recoger", [28, 29, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 31, 28], 12);
		this.definirAnimacion("usarCatalejo", [54, 55, 56, 57, 58, 59, 60, 61, 61, 62, 62, 62, 63, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 75, 74, 73, 72, 71, 70, 69, 68, 67, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 77, 78, 79, 80, 81, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82], 20);
		this.definirAnimacion("surfear", [0, 1, 2, 3, 4, 5, 6, 7, 6, 5, 6, 7, 6, 5, 6, 7, 7], 20);
	}
}

//Usado para ejercicios de Manic dibujando, se necesita tener la grilla con mayor espacio para que no sea vea feo al dibujar y rotar, ya que el dibujo sale desde el centro de la imagen.
class ManicDibujando extends ActorAnimado {
	static _grilla = 'actor.manicDibujando.png'

	constructor() {
		super(0, 0, { cantColumnas: 10, cantFilas: 4 });
		this.definirAnimacion("parado",
			new Cuadros(23).repetirVeces(18)
				.concat([24, 25])
				.concat(new Cuadros(23).repetirVeces(45))
				.concat([24, 25])
				.concat(new Cuadros(23).repetirVeces(45))
				.concat([24, 25])
				.concat(new Cuadros(23).repetirVeces(45))
				.concat([26, 27, 28, 29, 30, 31, 32, 33, 34, 35]),
			20, true);
		this.definirAnimacion("rotar", [0], 1);
		this.definirAnimacion("error", [17, 18, 19, 20, 21, 21, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23], 12)
		this.definirAnimacion("dibujar", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], 20);
	}
}