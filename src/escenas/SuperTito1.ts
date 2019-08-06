/// <reference path = "./EscenaActividad.ts" />

/**
 * @class SuperTito1
 *
 */
class SuperTito1 extends EscenaActividad {
    protected cantidadFilas: number = Math.floor((Math.random() * 5) + 3)
    protected lamparines: Array<Lamparin> = []

    public iniciar(): void {
        this.setFondo(new Fondo((<typeof SuperTito1>this.constructor).pathFondo(), 0, 0))
        this.setCuadricula(new Cuadricula(0, 0, this.cantidadFilas, 1,
            { separacionEntreCasillas: 5 },
            { grilla: 'casilla.grisoscuro.png', cantColumnas: 1, ancho: 100, alto: 50 }))

        this.getCuadricula().casilla(this.cantidadFilas - 1, 0).cambiarImagen('casilla.titoFinalizacion.png')

        for (let i = 0; i < this.cantidadFilas - 1; i++) {
            this.agregarLamparinEnFila(i)
        }

        this.setAutomata(new Tito(0, 0))
        this.getCuadricula().agregarActor(this.getAutomata(), 0, 0)
        this.getAutomata().escala *= 2
        this.getAutomata().y += 30
        this.getAutomata().x -= 15

    }

    protected agregarLamparinEnFila(fila: number): void {
        const lamparin: Lamparin = new Lamparin(0, 0)
        this.lamparines.push(lamparin)
        this.getCuadricula().agregarActor(lamparin, fila, 0)
        lamparin.setX(lamparin.getX() + 15)
    }

    public static pathFondo(): string {
        return 'fondo.superTito1.png'
    }

    public estaResueltoElProblema(): boolean {
        return this.lamparines.every((lamparin: Lamparin) => lamparin.nombreAnimacionActual() == 'prendida') && this.getAutomata().alFinalDelCamino()
    }

}
