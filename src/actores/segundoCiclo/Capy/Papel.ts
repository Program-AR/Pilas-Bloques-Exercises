/// <reference path="../../ActorCompuesto.ts"/>

class Papel extends ActorCompuesto {
    static _grilla = 'actor.papel.png'

    constructor() {
        super(0, 0,  { subactores: [new ActorAnimado(0, 0, {cantColumnas: 1, cantFilas: 1, grilla: Papel._grilla })] } )
        this.definirAnimacion("recoger",[0,0,0,0,0,0],6);
    }
}
