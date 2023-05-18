/// <reference path="../../ActorAnimado.ts"/>

class Estrella extends ActorAnimado {
    static _grilla = 'actor.estrella.png'

    constructor() {
        super(0, 0, {cantColumnas:1, cantFilas: 1});
    }
}