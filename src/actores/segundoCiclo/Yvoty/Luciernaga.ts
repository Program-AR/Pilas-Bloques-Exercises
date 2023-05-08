/// <reference path="../../ActorAnimado.ts"/>
class Luciernaga extends ActorAnimado {
    static _grilla = 'actor.luciernaga.png'

    constructor() {
        super(0, 0, {cantColumnas: 2});
        this.definirAnimacion("apagada",[0],1);
        this.definirAnimacion("prendida",[1],1);
        this.etiquetas.push('Luz');
    }

}
