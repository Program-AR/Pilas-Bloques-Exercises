/// <reference path="../../ActorAnimado.ts"/>
class Telescopio extends ActorAnimado {
    static _grilla = 'actor.telescopio1.png'

    constructor(arreglado = false) {
        super(0, 0, {cantColumnas: 2});
        this.definirAnimacion("roto", [1], 1);
        this.definirAnimacion("arreglado", [0], 1);

        if(arreglado) 
            this.cargarAnimacion("arreglado")
        else
            this.cargarAnimacion("roto")
    }
}
