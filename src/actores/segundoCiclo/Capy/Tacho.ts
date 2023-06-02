/// <reference path="../../ActorCompuesto.ts"/>
class Tacho extends ActorCompuesto {
    static _grilla = 'actor.tacho.png'

    constructor(lleno = false) {
        super(0, 0,  { subactores: [new ActorAnimado(0, 0, {cantColumnas: 2, grilla: Tacho._grilla })] } )
        this.subactores[0].definirAnimacion("vacio", [0], 1);
        this.subactores[0].definirAnimacion("lleno", [1], 1);

        if(lleno) 
            this.cargarAnimacion("lleno")
        else
            this.cargarAnimacion("vacio")
    }
}
