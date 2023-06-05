/// <reference path = "../../node_modules/pilasweb/dist/pilasweb.d.ts"/>
/// <reference path = "Reparar.ts" />

class RepararTelescopio extends Reparar {

    configurarVerificaciones() {
        super.configurarVerificaciones()

        const escena = pilas.escena_actual()
    }

    postAnimacion() {
        super.postAnimacion()
        if (pilas.escena_actual().estaResueltoElProblema()) {
            pilas.escena_actual().estado = new Estado(() =>
                true
            )
        }
    }
}