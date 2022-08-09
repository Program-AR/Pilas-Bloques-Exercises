/// <reference path = "LaEleccionDelMono.ts" />
/// <reference path = "../actores/Cuadricula.ts" />
/// <reference path = "../actores/BananaAnimada.ts" />
/// <reference path = "../actores/ManzanaAnimada.ts" />
/// <reference path = "../actores/MonoAnimado.ts" />
/// <reference path = "../comportamientos/MovimientosEnCuadricula.ts" />

class ElFestinFrutal extends LaEleccionDelMono{
    ajustarAutomata(){
        this.cuadricula.agregarActorEnPerspectiva(this.automata,0,0);
        this.automata.y -= 25
    }

    estadoAlTerminar(){
        return this.comioTodaLaFruta()
    }

    agregarCuadricula() {
        this.cuadricula = new CuadriculaEsparsa(0, 0,
            { alto: 400, ancho: 360, separacionEntreCasillas: 5 },
            { grilla: 'casillas.violeta.png' }, this.matriz())
        
    }

    matriz() {
        return [
            ['T', 'T', 'T', 'T', 'T'],
            ['T', 'F', 'T', 'T', 'T'],
            ['T', 'F', 'T', 'T', 'T'],
            ['T', 'F', 'T', 'T', 'T'],
            ['T', 'F', 'T', 'T', 'T'],
            ['T', 'F', 'T', 'T', 'T'],
            ['T', 'F', 'T', 'T', 'T']
        ]
    }

    completarConFruta(){
        [0,2,3,4].forEach(columna => this.completarColumnaConFrutas(columna))
    }

    completarColumnaConFrutas(columna){
        [1,2,3,4,5,6].forEach(fila => this.agregarFrutaAleatoria(fila, columna))
    }

    agregarFrutaAleatoria(fila, columna){
        if(Math.random() > 0.5){
            this.agregarFruta(BananaAnimada, 49, fila, columna)
        }else{
            this.agregarFruta(ManzanaAnimada, 35, fila, columna)
        }
    }

    agregarFruta(fruta, desplazamientoY, fila, columna){
        const _fruta = new fruta(0,0)
        this.cuadricula.agregarActorEnPerspectiva(_fruta,fila,columna)
        _fruta.escala = 0.5
        _fruta.y -= desplazamientoY
    }

  }
