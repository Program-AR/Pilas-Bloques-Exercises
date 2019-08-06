/// <reference path = "./EscenaActividad.ts" />

/**
 * @class ElMarcianoEnElDesierto
 *
 * Objetivos: Ejercitarse en el uso de programas para la resolución de problemas.
 * Enunciado: Comer todas las manzanas del tablero.
 */
class ElMarcianoEnElDesierto extends EscenaActividad {

    public iniciar(): void {
        this.setFondo(new Fondo('fondo.elMarcianoEnElDesierto.png', 0, 0))
        const cantidadFilas: number = 4
        const cantidadColumnas: number = 5
        const apples: Array<ManzanaAnimada> = []

        this.setCuadricula(new Cuadricula(0, -9, cantidadFilas, cantidadColumnas,
            { alto: 262, ancho: 330 },
            { grilla: 'invisible.png' }))

        const posiciones: Array<Array<number>> = [[0, 0], [0, 2], [0, 4], [1, 4], [2, 4], [3, 2], [3, 1]]

        for (let i = 0; i < posiciones.length; i++) {
            var apple = new ManzanaAnimada(0, 0, false)
            this.getCuadricula().agregarActor(apple, posiciones[i][0], posiciones[i][1])
            apple.escala *= 0.8
            apples.push(apple)
        }

        this.setAutomata(new MarcianoAnimado(0, 0))
        this.getCuadricula().agregarActorEnPerspectiva(this.getAutomata(), cantidadFilas - 1, 0)
        this.getAutomata().setEscala(0.8)
        this.buildState()
    }

    private buildState(): void {
        this.setEstado(new Estado(() => this.cantidadObjetosConEtiqueta('ManzanaAnimada') == 0))
    }

}
