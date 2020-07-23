/// <reference path = "../../node_modules/pilasweb/dist/pilasweb.d.ts"/>
/// <reference path = "Interactuar.ts" />

class PatearPelota extends Interactuar {

    protected alInteractuar(): void {
        super.alInteractuar()
        this.patearPelota()
    }

    /**
     * Patea una pelota que este en la misma posición
     * que el interactor del comportamiento.
     */
    private patearPelota(): void {
        this.interactuado().hacer(SerPateado, {
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

    hayConQuienInteractuar(): boolean {
        return super.hayConQuienInteractuar() && !this.interactuado()['pateado']
    }

}