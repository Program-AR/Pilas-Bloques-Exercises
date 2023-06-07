/// <reference path = "../../node_modules/pilasweb/dist/pilasweb.d.ts"/>
/// <reference path = "Interactuar.ts" />

class Reparar extends Interactuar {

    public nombreAnimacion(): String {
        return "recoger"
    }

    protected alInteractuar(): void {
        this.interactuado().cargarAnimacion(this.nombreProximaAnimacion())
    }

    public nombreProximaAnimacion(): string {
        return "arreglado"
    }

    configurarVerificaciones() {
        super.configurarVerificaciones()
        this.verificacionesPre.push(new Verificacion(() => this.estaRoto(), "¡Ya está " + this.nombreProximaAnimacion() + "!"))
    }

    estaRoto() {
        return this.interactuado().nombreAnimacionActual() != this.nombreProximaAnimacion()
    }

}