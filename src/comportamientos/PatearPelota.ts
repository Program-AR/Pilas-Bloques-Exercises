/// <reference path = "Interactuar.ts" />
/// <reference path = "../actores/PelotaAnimada.ts" />

class PatearPelota extends Interactuar {

    protected alInteractuar(): void {
        super.alInteractuar()
        this.patearPelota()
    }

    pelotaInteractuada(): PelotaAnimada {
        return this.interactuado() as PelotaAnimada
    }

    private patearPelota(): void {
        this.pelotaInteractuada().hacer(SerPateado, {
            aceleracion: 0.0025,
            elevacionMaxima: 25,
            gradosDeAumentoStep: -2,
            tiempoEnElAire: 25
        })
    }

    etiqueta(): string {
        return "PelotaAnimada"
    }

    nombreAnimacion(): string {
        return "patear"
    }

    configurarVerificaciones(): void {
        super.configurarVerificaciones()
        this.verificacionesPre.push(new Verificacion(() => !this.pelotaInteractuada().fuePateado(), "No puedo patear dos veces la misma pelota"))
    }

}