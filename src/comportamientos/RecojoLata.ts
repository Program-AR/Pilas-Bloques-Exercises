/// <reference path = "Interactuar.ts" />
/// <reference path = "../actores/segundoCiclo/Capy/Lata.ts" />

class RecojoLata extends Interactuar {

    protected alInteractuar(): void {
        super.alInteractuar()
        this.desapareceLata()
    }

    objetoInteractuado(): any {
        return this.interactuado()
    }

    private desapareceLata(): void {
        this.objetoInteractuado().hacer(Achicar, {
            velocidad: 0.08
        })
    }

    etiqueta(): string {
        return "Lata"
    }

    public nombreAnimacion(): String {
        return "recoger"
    }

    public nombreProximaAnimacion(): string {
        return "recoger"
    }

    configurarVerificaciones(): void {
        super.configurarVerificaciones()
        this.verificacionesPre.push(new Verificacion(() => !this.objetoInteractuado().seAchico, "No puede recoger dos veces la misma lata"))
    }

}