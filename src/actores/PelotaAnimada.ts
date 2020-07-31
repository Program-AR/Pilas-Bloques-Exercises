/// <reference path = "../actores/ActorPateable.ts" />

class PelotaAnimada extends ActorPateable {

    constructor(x: number, y: number) {
        super(x, y, { grilla: 'pelotaAnimada.png', cantColumnas: 16 })
        this.definirAnimacion("patear", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 12)
    }

}