/// <reference path = "../../node_modules/pilasweb/dist/pilasweb.d.ts"/>
/// <reference path = "Reparar.ts" />

class RepararTelescopio extends Reparar {

    public nombreAnimacion(): String {
        return "recoger"
    }

    public nombreProximaAnimacion(): string {
        return "arreglado"
    }

    configurarVerificaciones() {
        super.configurarVerificaciones()

        const escena = pilas.escena_actual()
    }

    postAnimacion() {
        super.postAnimacion()
        if (pilas.escena_actual().telescopiosArreglados()) {
            pilas.escena_actual().estado = new Estado(() =>
                true
            )
        }
    }
}