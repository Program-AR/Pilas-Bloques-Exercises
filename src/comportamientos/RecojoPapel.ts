/// <reference path = "Interactuar.ts" />
/// <reference path = "../actores/segundoCiclo/Capy/Papel.ts" />

class RecojoPapel extends Interactuar {

    protected alInteractuar(): void {
        super.alInteractuar()
        this.desaparecePapel()
    }

    objetoInteractuado(): any {
        return this.interactuado()
    }

    private desaparecePapel(): void {
        this.objetoInteractuado().hacer(Achicar, {
            velocidad: 0.08
        })
    }

    etiqueta(): string {
        return "Papel"
    }

    public nombreAnimacion(): String {
        return "recoger"
    }

    public nombreProximaAnimacion(): string {
        return "recoger"
    }

    configurarVerificaciones(): void {
        super.configurarVerificaciones()
        this.verificacionesPre.push(new Verificacion(() => !this.objetoInteractuado().seAchico, "No puede recoger dos veces la misma papel"))
    }

}