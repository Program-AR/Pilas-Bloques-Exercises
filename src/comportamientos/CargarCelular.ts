/// <reference path = "../../node_modules/pilasweb/dist/pilasweb.d.ts"/>
/// <reference path = "Encender.ts" />

class CargarCelular extends Encender {

    public nombreAnimacion(): String {
        return "usarCelu"
    }

    public nombreProximaAnimacion(): string {
        return "cargado"
    }

    configurarVerificaciones() {
        super.configurarVerificaciones()

        const escena = pilas.escena_actual()

        this.verificacionesPre.push(new Verificacion(() => escena.noHayCargadores(),
            '¡Todavía no recogí el cargador!'))

    }

    postAnimacion() {
        super.postAnimacion()
        if (pilas.escena_actual().celularesCargados()) {
            pilas.escena_actual().estado = new Estado(() =>
                true
            )
        }
    }
}