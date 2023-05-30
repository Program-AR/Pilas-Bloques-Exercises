/// <reference path="../../ActorAnimado.ts"/>

class Lata extends ActorAnimado {
    static _grilla = 'actor.lata.png'

    constructor() {
        super(0, 0, {cantColumnas:1, cantFilas: 1});
        this.definirAnimacion("recoger",[0,0,0,0,0,0],6);
    }
}