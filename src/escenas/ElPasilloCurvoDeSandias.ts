/// <reference path = "MariaLaComeSandias.ts" />
/// <reference path = "../actores/MariaAnimada.ts" />
/// <reference path = "../actores/Cuadricula.ts" />


class ElPasilloCurvoDeSandias extends MariaLaComeSandias {
    dimensionesCuadricula() {
        return {
            cantidadColumnas: 4,
            cantidadFilas: 8
        }
    }

    escalaAutomata() { return 1.9 }

    agregarCuadricula() {
        this.cuadricula = new CuadriculaEsparsa(0, 0,
            { alto: 420, ancho: 180, separacionEntreCasillas: 5 },
            { grilla: 'casilla.mariaSandia.png' }, this.matriz())
        this.colorearCurvas()
    }

    matriz() {
        return [
            ['F', 'T', 'T', 'T'],
            ['F', 'F', 'F', 'T'],
            ['T', 'T', 'T', 'T'],
            ['T', 'F', 'F', 'F'],
            ['T', 'T', 'T', 'F'],
            ['F', 'F', 'T', 'F'],
            ['T', 'T', 'T', 'F'],
            ['T', 'F', 'F', 'F']]
    }

    colorearCurvas() {
        const coordenadasCurvas = this.curvasAleatorias().concat(this.extremosCurvas())
        coordenadasCurvas.forEach(c => this.cuadricula.casilla(c.y, c.x).cambiarImagen('casilla.mariaSandiaCurva.png'))
    }

    completarConSandias() {
        this.completarComienzosDeCurvas()
        this.completarCurvasAleatorias()
    }

    completarComienzosDeCurvas() {
        this.extremosCurvas().forEach(({ x, y }) => {
        this.agregarSandia(x, y)
    })
    }

    extremosCurvas() {
        return [{ x: 0, y: 4 },
        { x: 0, y: 6 },
        { x: 1, y: 0 },
        { x: 1, y: 2 }
        ]
    }

    coordenadasCurva(x, y) {
        return [{ x, y },
        { x: x + 1, y },
        { x: x + 1, y: y + 1 },
        { x: x + 1, y: y + 2 },
        { x, y: y + 2 }
        ]
    }

    curvasAleatorias(){
        return this.coordenadasCurva(2, 0).concat(this.coordenadasCurva(1, 4))
    }

    completarCurvasAleatorias() {
        this.curvasAleatorias().forEach(({ x, y }) => {
            if (Math.random() > 0.5) this.agregarSandia(x, y)
        })
    }


}
