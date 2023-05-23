/// <reference path = "Interactuar.ts" />
/// <reference path = "../actores/segundoCiclo/Manic/Estrella.ts" />

class ObservoEstrella extends Interactuar {

    protected alInteractuar(): void {
        super.alInteractuar()
        this.volarEstrella()
    }

    objetoInteractuado(): any {
        return this.interactuado()
    }

    private volarEstrella(): void {
        this.objetoInteractuado().hacer(Volar, {
            aceleracion: 0.01,
            gradosDeAumentoStep: -5
        })
    }

    etiqueta(): string {
        return "Estrella"
    }

    public nombreAnimacion(): String {
        return "usarCatalejo"
    }

    public nombreProximaAnimacion(): string {
        return "recoger"
    }

    configurarVerificaciones(): void {
        super.configurarVerificaciones()
        this.verificacionesPre.push(new Verificacion(() => !this.objetoInteractuado().vuela, "No puede volar dos veces la misma estrella"))
    }

}