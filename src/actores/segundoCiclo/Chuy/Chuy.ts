/// <reference path="../../ActorAnimado.ts"/>
/// <reference path="../../../comportamientos/ComportamientoAnimado.ts"/>

class Chuy extends ActorAnimado {
	static _grilla = 'actor.chuy.png'

    constructor() {
        super(0,0,{
            cantColumnas: 10,cantFilas: 11});
        this.definirAnimacion("parado",
                new Cuadros(5).repetirVeces(16)
                .concat([6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 11, 12, 13, 14, 15, 11, 12, 13, 14, 15, 11, 12, 13, 14, 15, 11, 11, 11, 16, 17, 18, 18, 18, 18, 18, 19, 20, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22,  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 47, 47, 47, 47, 47, 47, 47, 47, 47, 49, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50])
                .concat(new Cuadros(5).repetirVeces(30))
                .concat([6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 11, 12, 13, 14, 15, 11, 12, 13, 14, 15, 11, 12, 13, 14, 15, 11, 11, 11, 16, 17, 18, 18, 18, 18, 18, 19, 20, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22,  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 47, 47, 47, 47, 47, 47, 47, 47, 47, 49, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50])
                .concat(new Cuadros(5).repetirVeces(30))
                .concat([6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 11, 12, 13, 14, 15, 11, 12, 13, 14, 15, 11, 12, 13, 14, 15, 11, 11, 11, 16, 17, 18, 18, 18, 18, 18, 19, 20, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22,  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 47, 47, 47, 47, 47, 47, 47, 47, 47, 49, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50])
                .concat(new Cuadros(5).repetirVeces(16)),
            20, true);
        this.definirAnimacion("correr", [68, 69, 70, 71, 72, 73, 74, 75, 76], 12);
        this.definirAnimacion("correrChocando", [68, 69, 70, 71, 72, 73, 74, 75, 76], 12)
        this.definirAnimacion("obstaculo", [0, 1, 1, 2, 2, 3, 3, 4, 4, 4], 12)
        this.definirAnimacion("error", [101, 102, 102, 103, 103, 104, 104, 105, 105, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106]
        , 12)
        this.definirAnimacion("recoger", [97, 98, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 100, 97], 12);
        this.definirAnimacion("usarPaleta", [51, 52, 53, 54, 55, 56, 57, 58, 57, 56, 55, 56, 57, 58, 57, 56, 55, 56, 57, 58, 57, 56, 55, 56, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67], 12);
        this.definirAnimacion("rebotarPelota", [87, 88, 89, 90, 91, 92, 93, 92, 91, 90, 94, 95, 90, 91, 92, 93, 91, 94, 91, 93, 90, 94, 96, 87, 87, 87, 87], 12); 
        this.definirAnimacion("patear", [87, 88, 89, 90, 91, 92, 93, 92, 91, 90, 94, 95, 90, 91, 92, 93, 91, 94, 91, 93, 90, 94, 96, 87, 87, 87, 87], 12) 
        this.definirAnimacion("rebotarPulpito", [77, 78, 79, 80, 81, 82, 83, 82, 81, 80, 84, 85, 80, 81, 82, 83, 81, 84, 81, 83, 80, 84, 86, 77, 77, 77, 77], 12); 
	}


    puedeMoverseAbajo(){
        return this.tocandoFlechaAbajo() && !this.tieneEnLaCasillaDeAbajo("Obstaculo") 
    }

    puedeMoverseDerecha(){
        return this.tocandoFlechaDerecha() && !this.tieneEnLaCasillaASuDerecha("Obstaculo")
    }
}
