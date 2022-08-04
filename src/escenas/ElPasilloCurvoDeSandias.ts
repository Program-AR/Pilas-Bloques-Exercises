/// <reference path = "MariaLaComeSandias.ts" />
/// <reference path = "../actores/MariaAnimada.ts" />
/// <reference path = "../actores/Cuadricula.ts" />


class ElPasilloCurvoDeSandias extends MariaLaComeSandias {
    dimensionesCuadricula(){
        return {
            cantidadColumnas: 4,
            cantidadFilas: 8
        }
    }

    escalaAutomata(){ return 1.9}

    agregarCuadricula() {
        this.cuadricula = new CuadriculaEsparsa(0, 0,
            { alto: 420, ancho: 180, separacionEntreCasillas: 5 },
            { grilla: 'casilla.mariaSandia.png' }, this.matriz())
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

    completarConSandias() {
        this.completarComienzosDeCurvas()
        this.completarCurvaAleatoria(2,0)
        this.completarCurvaAleatoria(1, 4)  
    }

    completarComienzosDeCurvas(){
        [{x: 0, y: 4},
         {x: 0, y: 6},
         {x: 1, y: 0},
         {x: 1, y: 2}
        ].forEach(({x, y}) => {
            this.agregarSandia(x,y)
        })
    }

    completarCurvaAleatoria(x, y){
        [{x, y},
         {x: x+1, y},
         {x: x+1, y: y+1},
         {x: x+1, y: y+2},
         {x, y: y+2}
        ].forEach(({x, y}) => {
            if(Math.random() > 0.5) this.agregarSandia(x,y)
        })
    }


}
