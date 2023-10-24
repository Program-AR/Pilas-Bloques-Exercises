/// <reference path="../../ActorAnimado.ts"/>

class Yacare extends ActorAnimado {
    static _grilla = 'actor.yacare.png'

    constructor() {
        super(0, 0, {cantColumnas: 2});
        this.definirAnimacion("parado", [0], 1);
        this.definirAnimacion("surfear", [1], 1)
    }
}
