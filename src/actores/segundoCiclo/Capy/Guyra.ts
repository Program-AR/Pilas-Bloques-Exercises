/// <reference path="../../ActorAnimado.ts"/>

class Guyra extends ActorAnimado {
    static _grilla = 'actor.guyra.png'

    constructor() {
        super(0, 0, {cantColumnas: 1, cantFilas: 5});
        this.definirAnimacion("parado",new Cuadros(3).repetirVeces(12).concat([0,1,2,2,2,2,2,2,2]),3,true);
        this.definirAnimacion("desaparecer",[4],1);
    }
}