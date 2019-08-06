/// <reference path = "./EscenaActividad.ts" />

/**
 * @class TresNaranjas
 *
 */
class TresNaranjas extends EscenaActividad {
    private naranjas: Array<NaranjaAnimada> = []

    iniciar() {
        this.setFondo(new Fondo('fondo.tresNaranjas.png', 0, 0))
        this.setCuadricula(new Cuadricula(0, 0, 1, 4, { separacionEntreCasillas: 5 },
            { grilla: 'casilla.tresNaranjas.png', ancho: 100, alto: 100 }))

        //se cargan los Naranjas
        var hayAlMenosUno = false
        for (var i = 0; i < 3; i++) {
            if (Math.random() < .5) {
                hayAlMenosUno = true
                this.agregarNaranja(i + 1)
            }
        }
        if (!hayAlMenosUno) {
            var columna = 1
            var rand = Math.random()
            if (rand > 0.33 && rand < 0.66) {
                columna = 2
            } else if (rand > 0.66) {
                columna = 3
            }
            this.agregarNaranja(columna)
        }

        // se crea el personaje
        this.setAutomata(new MarcianoAnimado(0, 0))
        this.getCuadricula().agregarActor(this.getAutomata(), 0, 0, false)
        this.getAutomata().setX(this.getAutomata().getX() - 20)
        this.getAutomata().setY(this.getAutomata().getY() + 20)
    }

    private agregarNaranja(columna: number): void {
        const naranja = new NaranjaAnimada(0, 0)
        this.getCuadricula().agregarActor(naranja, 0, columna, false)
        naranja.escala = 0.5
        naranja.x += 20
        naranja.y -= 20
        this.naranjas.push(naranja)
    }

    public estaResueltoElProblema(): boolean {
        return this.contarActoresConEtiqueta('NaranjaAnimada') == 0 && this.getAutomata().estaEnCasilla(null, 3)
    }

}
