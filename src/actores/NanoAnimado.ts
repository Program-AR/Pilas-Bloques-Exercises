/// <reference path="ActorAnimado.ts"/>

class NanoAnimado extends ActorAnimado {
    constructor(x, y) {
        super(x, y, { grilla: 'nano.png', cantColumnas: 15 });
        this.definirAnimacion('parado', new Cuadros([0]).repetirVeces(30).
            concat([1, 1, 2, 2]).
            concat(new Cuadros([2]).repetirVeces(15)).
            concat([2, 2, 1, 1])
            , 6, true);
        this.definirAnimacion('correr', [7, 9, 7, 9], 12);
        this.definirAnimacion('comerBanana', [10, 11, 12, 13, 13, 12, 11, 10], 30);
        this.definirAnimacion('correrChocando', [7, 9, 7, 9, 14, 14, 14, 14, 14, 14], 12);
        this.definirAnimacion('obstaculo', [14], 12);
    }
}
