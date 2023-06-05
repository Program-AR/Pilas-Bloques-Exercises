/// <reference path="../../ActorAnimado.ts"/>

class Planeta extends ActorAnimado {
    static _grilla = 'actor.planeta.png'

    constructor() {
        super(0, 0, {cantColumnas:1, cantFilas: 1});
        this.definirAnimacion("recoger",[0,0,0,0,0,0],6);
    }
}