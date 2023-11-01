/// <reference path="../../ActorAnimado.ts"/>
class TelescopioAnimado extends ActorAnimado {
    static _grilla = 'actor.telescopios.png'
    movimientos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    constructor() {
        super(0, 0, {cantColumnas: 10});
        this.definirAnimacion("parado", [0], 1);
        //this.definirAnimacion("mover", [0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0, 6, 7, 8, 9, 8, 7, 6, 0], 12);
 
    this.movimientos.forEach(nro =>
        this.definirAnimacion("mover" + nro, [nro], 1));
      this.cargarAnimacion("mover0");
    }
  
    mover() {
      this.cargarAnimacion("mover" + this.siguienteNumero());
    }
  
    siguienteNumero() {
      var sgte = parseInt(this.nombreAnimacionActual().slice(5)) + 1;
      return sgte > 9 ? 0 : sgte;
    }
}
