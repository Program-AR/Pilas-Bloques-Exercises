/// <reference path = "./EscenaActividad.ts" />

class LaEleccionDelMono extends EscenaActividad {

    public iniciar(): void {
        this.setFondo(new Fondo('fondos.selva.png', 0, 0))
        this.setCuadricula(new Cuadricula(0, 0, 1, 2, { alto: 200 }, { grilla: 'casillas.violeta.png', cantColumnas: 1 }))

        this.setAutomata(new MonoAnimado(0, 0))
        this.getCuadricula().agregarActorEnPerspectiva(this.getAutomata(), 0, 0, false);

        this.agregarFruta();
        new FlechaEscenarioAleatorio();

        this.buildState()
    }

    private buildState(): void {
        this.setEstado(new Estado(() => this.cantidadObjetosConEtiqueta('BananaAnimada') == 0 && this.cantidadObjetosConEtiqueta('ManzanaAnimada') == 0 && this.getAutomata().casillaActual().sos(0, 1)))
    }

    public agregarFruta(): void {
        if (Math.random() < .5) {
            this.agregar(new ManzanaAnimada(0, 0));
        }

        else {
            this.agregar(new BananaAnimada(0, 0));
        }
    }

    public agregar(fruta: ManzanaAnimada | BananaAnimada): void {
        this.getCuadricula().agregarActorEnPerspectiva(fruta, 0, 1, false);
    }

}
