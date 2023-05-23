/// <reference path = "Interactuar.ts" />
/// <reference path = "../actores/segundoCiclo/Manic/Planeta.ts" />

class ObservoPlaneta extends Interactuar {
  
    protected alInteractuar(): void {
        super.alInteractuar()
        this.orbitarPlaneta()
    }

    
    objetoInteractuado(): any {
        return this.interactuado()
    }

    private orbitarPlaneta(): void {
        this.objetoInteractuado().hacer(OrbitarVolar, {
            radio: 10,
            velocidad: 0.0005
        })
    }
        
    etiqueta(): string {
        return "Planeta"
    }

    public nombreAnimacion(): String {
        return "usarCatalejo"
    }

    public nombreProximaAnimacion(): string {
        return "recoger"
    }

    configurarVerificaciones(): void {
        super.configurarVerificaciones()
        this.verificacionesPre.push(new Verificacion(() => !this.objetoInteractuado().orbita, "No puede hacer orbitar dos veces el mismo planeta"))
    }
  
}