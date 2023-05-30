/// <reference path = "../../node_modules/pilasweb/dist/pilasweb.d.ts"/>
/// <reference path = "Interactuar.ts" />

class Llenar extends Interactuar {

    public nombreAnimacion(): String {
        return "recoger"
    }

    protected alInteractuar(): void {
        this.interactuado().cargarAnimacion(this.nombreProximaAnimacion())
    }

    public nombreProximaAnimacion(): string {
        return "lleno"
    }

    configurarVerificaciones() {
        super.configurarVerificaciones()
        this.verificacionesPre.push(new Verificacion(() => this.estaLleno(), "¡Ya está " + this.nombreProximaAnimacion() + "!"))
    }

    estaLleno() {
        return this.interactuado().nombreAnimacionActual() != this.nombreProximaAnimacion()
    }

}