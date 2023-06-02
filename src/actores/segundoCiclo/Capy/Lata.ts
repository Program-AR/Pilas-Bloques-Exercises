/// <reference path="../../ActorCompuesto.ts"/>

class Lata extends ActorCompuesto {
    static _grilla = 'actor.lata.png'

    constructor() {
		super(0, 0,  { subactores: [new ActorAnimado(0, 0, {cantColumnas: 1, cantFilas: 1, grilla: Lata._grilla })] } )
        this.definirAnimacion("recoger",[0,0,0,0,0,0],6);
    }
}