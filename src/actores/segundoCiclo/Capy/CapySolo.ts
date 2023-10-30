/// <reference path="../../ActorAnimado.ts"/>

class CapySolo extends ActorAnimado {
	static _grilla = 'actor.capySolo.png'

    constructor() {
        super(0,0,{cantColumnas: 10, cantFilas: 12});
        this.definirAnimacion("parado", [52,52,52,52,52,52,52,52,52,52,52,51,50,49,49,50,51,52], 5, true);
        this.definirAnimacion("correr", [21, 22, 23, 24, 25, 26, 27, 28, 26, 25, 24, 23, 22, 21], 20);
        this.definirAnimacion("subirPajarito", [0, 0, 0, 0, 1, 2, 3, 4, 5,  6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 20, 20], 20);
        this.definirAnimacion("error", [52], 6);
    }
}
