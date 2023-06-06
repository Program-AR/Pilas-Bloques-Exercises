/// <reference path="../../ActorAnimado.ts"/>

class Trofeo extends ActorAnimado {
    static _grilla = 'actor.trofeo.png'

    constructor() {
        super(0, 0, {cantColumnas:1, cantFilas: 1});
    }
} 