/// <reference path="../../ActorAnimado.ts"/>

class Yacare extends ActorAnimado {
    constructor(x, y) {
        super(x, y, {grilla: 'actor.yacare.png', cantColumnas:1, cantFilas:1});
        this.definirAnimacion("parado", [0,], 12);
    }
} 