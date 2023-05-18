/// <reference path = "EscenaActividad.ts" />
/// <reference path = "../actores/segundoCiclo/Manic/Manic.ts" />
/// <reference path = "../habilidades/Flotar.ts" />

class LaReparadoraDeTelescopios extends EscenaActividad {
    fondo;
    automata;
    cuadricula;
    objetos;
    estado;
    iniciar() {
        this.estado = new Estado(() => this.cantidadObjetosConEtiqueta('Telescopio') == 0);
        this.fondo = new Fondo('fondo.manic.png', 0, 0);
        //this.recolector.izquierda = pilas.izquierda();
        
        this.cuadricula = new Cuadricula(0, -20, this.dimensionesCuadricula().filas, this.dimensionesCuadricula().columnas,
            { alto: this.dimensionesCuadricula().alto, separacionEntreCasillas: this.dimensionesCuadricula().separacionEntreCasillas},
            {
                grilla: 'casillas.manic.png',
                cantFilas: 1,
                cantColumnas: 16,
                bordesDecorados: true,
                relAspecto: 1
            })

        this.automata = new Manic();
        
        this.ajustarAutomata()
        this.automata.aprender(Flotar, {Desvio: 5});
        // La posición inicial pretende respectar el ejemplo

        this.agregarTelescopios(this.filasACompletar())

    }

    ajustarAutomata(){
        this.cuadricula.agregarActorEnPerspectiva(this.automata, this.dimensionesCuadricula().filas - 1, 0);
        //this.cuadricula.agregarActor(this.automata, 0, 0);
        this.automata.escala *= this.escalaSegunCuadricula(1.4);
        this.automata.y -= 10;
    }

    dimensionesCuadricula(){
        return {
            alto: 400,
            filas: 4,
            columnas: 5,
            separacionEntreCasillas: 0
        }
    }

    filasACompletar() { return [0,1,2,3] }

    agregarTelescopios(filas){
        filas.forEach(fila => this.completarFilaConTelescopios(fila))
    }

    completarFilaConTelescopios(fila){
        [1,2,3,4].forEach(columna => this.agregarTelescopio(fila, columna))
    }

    agregarTelescopio(fila, columna){
        const telescopio = new Telescopio(false)
        this.cuadricula.agregarActor(telescopio,fila,columna);
        telescopio.escala *= 0.7;
    }

    estaResueltoElProblema(){
        return this.cuadricula.every(telescopio => telescopio.nombreAnimacionActual() === 'arreglado');
      }
}
