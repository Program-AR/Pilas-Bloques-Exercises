/// <reference path="../../ActorAnimado.ts"/>

class Pulpito extends ActorAnimado {
    static _grilla = 'actor.pelota.png'

    constructor() {
        super(0, 0, { cantColumnas: 2 });
        this.definirAnimacion("desaparecer", [1], 12);
    }
}

class PingPong extends ActorAnimado {
    static _grilla = 'actor.pelotita.png'

    constructor() {
        super(0, 0, { cantColumnas: 2 });
        this.definirAnimacion("desaparecer", [1], 12);
    }
} 