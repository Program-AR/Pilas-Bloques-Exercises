/// <reference path = "../actores/ActorAnimado.ts" />

class PelotaAnimada extends ActorAnimado {
    static _grilla = 'pelotaAnimada.png'

    constructor(x: number, y: number) {
        super(x, y, { cantColumnas: 17 })
        this.definirAnimacion("patear", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 12)
        this.definirAnimacion("desaparecer", [16],12)
    }

}