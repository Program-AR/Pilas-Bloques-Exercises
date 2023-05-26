/// <reference path="../../ActorAnimado.ts"/>

class Mariposa extends ActorAnimado {
    static _grilla = 'actor.mariposa.png'

    constructor() {
        super(0, 0, {cantColumnas:1, cantFilas: 1});
    }
}