/// <reference path="../../ActorAnimado.ts"/>
class Celular extends ActorAnimado {
    static _grilla = 'actor.celular.png'

    constructor() {
        super(0, 0, {cantColumnas: 2});
        this.definirAnimacion("cargado", [1], 1);
        this.definirAnimacion("descargado", [0], 1);
    }
}

class Cargador extends ActorAnimado {
    static _grilla = 'actor.cargador.png'

    constructor() {
        super(0, 0, { cantColumnas:1, cantFilas: 1});
    }
}
