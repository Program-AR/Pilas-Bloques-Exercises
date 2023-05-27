/// <reference path="../../ActorAnimado.ts"/>
class Celular extends ActorAnimado {
    static _grilla = 'actor.celular.png'

    constructor(prendido = false) {
        super(0, 0, {cantColumnas: 3});
        this.definirAnimacion("cargado", [1], 1);
        this.definirAnimacion("prendido", [1], 1);
        this.definirAnimacion("descargado", [0], 1);
        this.definirAnimacion("desaparecer", [2], 1);

        if(prendido) this.cargarAnimacion("prendido")
    }
}

class Cargador extends ActorAnimado {
    static _grilla = 'actor.cargador.png'

    constructor() {
        super(0, 0, { cantColumnas:1, cantFilas: 1});
    }
}
