/// <reference path = "./EscenaActividad.ts" />

class ElRecolectorDeEstrellas extends EscenaActividad {
    private cantidadFilas: number = 4
    private cantidadColumnas: number = 5

    public iniciar(): void {
        this.setFondo(new Fondo('fondo.recolector.png', 0, 0))
        this.setCuadricula(new Cuadricula(0, -20, this.cantidadFilas, this.cantidadColumnas,
            { alto: 400 }, { grilla: 'invisible.png', cantColumnas: 1 }))

        this.setAutomata(new RecolectorEstrellas(0, 0))
        this.getCuadricula().agregarActorEnPerspectiva(this.getAutomata(), this.cantidadFilas - 1, 0)
        this.getAutomata().aprender(Flotar, { Desvio: 5 })
        // La posición inicial pretende respectar el ejemplo

        for (var fila = 0; fila < this.cantidadFilas; fila++) {
            for (var columna = 1; columna < this.cantidadColumnas; columna++) {
                var star = new EstrellaAnimada(0, 0)
                this.getCuadricula().agregarActor(star, fila, columna)
                star.setEscala(star.getEscala() * 0.7)
            }
        }

        this.buildState()

    }

    private buildState(): void {
        this.setEstado(new Estado(() => this.cantidadObjetosConEtiqueta('EstrellaAnimada') == 0))
    }
}
