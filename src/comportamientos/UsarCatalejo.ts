/// <reference path = "Interactuar.ts" />
/// <reference path = "../actores/segundoCiclo/Manic/Estrella.ts" />

class UsarCatalejo extends Interactuar {

    protected alInteractuar(): void {
        super.alInteractuar()
        this.volarEstrella()
    }

    estrellaInteractuada(): any {
        return this.interactuado()
    }

    private volarEstrella(): void {
        this.estrellaInteractuada().hacer(Volar, {
            aceleracion: 0.0050,
            gradosDeAumentoStep: -2
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
        this.verificacionesPre.push(new Verificacion(() => !this.estrellaInteractuada().vuela, "No puede volar dos veces la misma estrella"))
    }

}