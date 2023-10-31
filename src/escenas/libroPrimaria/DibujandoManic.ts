abstract class DibujandoManic extends DibujandoFiguras {
    static clasesDeActoresInvolucrados(): typeof ActorAnimado[] {
        return [Manic]
    }

    static pathFondo(): string {
        return 'fondo.dibujando.manic.png';
    }

    iniciar() {
        super.iniciar();
        this.automata.aprender(EstallarAlSalirDePantalla, {});
    }

    crearAutomata() {
        this.automata = new Manic();
        this.automata.escala = 0.8;
        this.automata.x = -150;
        this.automata.y = 100;
    }

    colorDibujo() {
        return pilas.colores.rgb(230, 240, 6);
    }

    colorDibujoEsperado() {
        return pilas.colores.gris;
    }
}

class DibujandoCuadradoManic extends DibujandoManic {
    puntosEsperados(){
      return [{x: -50, y: 50}, {x: -40, y: 50}, {x: -30, y: 50}, {x: -20, y: 50}, {x: -10, y: 50}, {x: 0, y: 50}, {x: 10, y: 50}, {x: 20, y: 50}, {x: 30, y: 50}, {x: 40, y: 50}, {x: 50, y: 50}, {x: 50, y: 40}, {x: 50, y: 30}, {x: 50, y: 20}, {x: 50, y: 10}, {x: 50, y: 0}, {x: 50, y: -10}, {x: 50, y: -20}, {x: 50, y: -30}, {x: 50, y: -40}, {x: 50, y: -50}, {x: 40, y: -50}, {x: 30, y: -50}, {x: 20, y: -50}, {x: 10, y: -50}, {x: 0, y: -50}, {x: -10, y: -50}, {x: -20, y: -50}, {x: -30, y: -50}, {x: -40, y: -50}, {x: -50, y: -50}, {x: -50, y: -40}, {x: -50, y: -30}, {x: -50, y: -20}, {x: -50, y: -10}, {x: -50, y: 0}, {x: -50, y: 10}, {x: -50, y: 20}, {x: -50, y: 30}, {x: -50, y: 40}, {x: -50, y: 50}];
    }
  }