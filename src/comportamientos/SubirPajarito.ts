/// <reference path = "Interactuar.ts" />
/// <reference path = "../actores/segundoCiclo/Capy/Lata.ts" />

class SubirPajarito extends Interactuar {

    protected alInteractuar(): void {
        super.alInteractuar()
        this.interactuado().eliminar()
    }

    objetoInteractuado(): any {
        return this.interactuado()
    }

    etiqueta(): string {
        return "Guyra"
    }

    animacionInteractuadoMientras(): string {
        return "desaparecer"
    }

    public nombreAnimacion(): String {
        return "subirPajarito"
    }
}