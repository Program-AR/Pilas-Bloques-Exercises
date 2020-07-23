/// <reference path = "../../node_modules/pilasweb/dist/pilasweb.d.ts"/>
/// <reference path = "Interactuar.ts" />

class PatearPelota extends Interactuar {

    protected alInteractuar(): void {
        super.alInteractuar()

        this.interactor().pausar()

        this.interactuado().hacer(SerPateado, {
            interactuado: this.interactor(),
            tiempoEnElAire: 25,
            aceleracion: 0.0025,
            elevacionMaxima: 25,
            gradosDeAumentoStep: -2
        })

    }

    etiqueta(): string {
        return "PelotaAnimada"
    }

    nombreAnimacion(): string {
        return "patear"
    }

}