/// <reference path="../../ActorAnimado.ts"/>
class Tacho extends ActorAnimado {
    lleno;
    static _grilla = 'actor.tacho.png'

    constructor(lleno = false) {
        super(0, 0, {cantColumnas: 2});
        this.definirAnimacion("vacio", [0], 1);
        this.definirAnimacion("lleno", [1], 1);
        this.lleno = lleno;
        if(lleno) 
            this.cargarAnimacion("lleno")
        else
            this.cargarAnimacion("vacio")
    }

    vaciar() {
        this.cargarAnimacion("vacio")
        this.lleno = false;
    }

    llenar() {
        this.cargarAnimacion("lleno")
        this.lleno = true;
    }

    estaLleno(): boolean {
      return this.lleno;
    }
}
