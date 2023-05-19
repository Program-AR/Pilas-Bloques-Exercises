/// <reference path="../../ActorAnimado.ts"/>

class Paleta extends ActorAnimado {
    static _grilla = 'actor.paleta.png'

    constructor() {
        super(0, 0, {cantColumnas:1, cantFilas: 1});
    }
} 