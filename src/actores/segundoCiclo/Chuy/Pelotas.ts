/// <reference path="../../ActorAnimado.ts"/>

class Pulpito extends ActorAnimado {
    static _grilla = 'actor.pelota.png'

    constructor() {
        super(0, 0, { cantColumnas: 1, cantFilas: 1 });
    }
} 

class PingPong extends ActorAnimado {
    static _grilla = 'actor.pelotita.png'

    constructor() {
        super(0, 0, { cantColumnas: 1, cantFilas: 1 });
    }
} 