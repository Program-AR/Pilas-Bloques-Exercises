/// <reference path = "EscenaActividad.ts" />
/// <reference path = "../actores/segundoCiclo/Manic/Manic.ts" />
/// <reference path = "../habilidades/Flotar.ts" />

class LaReparadoraDeTelescopios extends EscenaActividad {
    fondo;
    automata;
    cuadricula;
    objetos;
    estado;
    telescopios = [];
    iniciar() {
        this.estado = new Estado(() => this.cantidadObjetosConEtiqueta('Telescopio') == 0);
        this.fondo = new Fondo('fondo.manic.png', 0, 0);
        
        this.cuadricula = new Cuadricula(0, -20, 4, 5,
            { ancho: 380, alto: 380 },
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
        this.agregarTelescopios(this.filasACompletar())

    }

    ajustarAutomata(){
        this.cuadricula.agregarActorEnPerspectiva(this.automata, 3, 0);
        this.automata.escala *= this.escalaSegunCuadricula(2);
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
        telescopio.escala *= 0.9;
        telescopio.aprender(Flotar, {Desvio: 3, eje: 'X'});
        this.telescopios.push(telescopio);
    }

    estaResueltoElProblema(){
        return this.telescopios.every(telescopio => telescopio.nombreAnimacionActual() === 'arreglado');
    }
}
