/// <reference path = "../../node_modules/pilasweb/dist/pilasweb.d.ts"/>
/// <reference path = "Encender.ts" />

class SacarFoto extends Encender {

    public nombreAnimacion(): String {
        return "usarCelu"
    }

    public nombreProximaAnimacion(): string {
        return "despierta"
    }
}