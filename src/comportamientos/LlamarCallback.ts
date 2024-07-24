/// <reference path = "../../node_modules/pilasweb/dist/pilasweb.d.ts"/>

class LlamarCallback extends Comportamiento {

    iniciar() { }

    actualizar() {
        this.argumentos.callback();
        return true;
    };

    eliminar() { }
};