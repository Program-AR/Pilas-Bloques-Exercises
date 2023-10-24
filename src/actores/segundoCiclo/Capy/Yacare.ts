/// <reference path="../../ActorAnimado.ts"/>

class Yacare extends ActorAnimado {
    static _grilla = 'actor.yacare.png'

    constructor() {
        super(0, 0, {cantColumnas: 1});
        this.definirAnimacion("parado", [0], 1);
    }
}
