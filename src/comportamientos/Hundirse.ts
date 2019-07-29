/// <reference path = "../../node_modules/pilasweb/dist/pilasweb.d.ts" />
/// <reference path = "ComportamientoAnimado.ts" />

class Hundirse extends ComportamientoAnimado {

    nombreAnimacion() {
        return "obstaculo";
    }

    preAnimacion() {
        this.receptor.decir("¡Me hundo!");
    }

    postAnimacion() {
        this.receptor.eliminar();
    }

}


