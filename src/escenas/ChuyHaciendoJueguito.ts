/// <reference path = "EscenaActividad.ts" />
/// <reference path = "../actores/segundoCiclo/Chuy/Chuy.ts" />
/// <reference path = "../actores/segundoCiclo/Chuy/Pelotas.ts" />

class ChuyHaciendoJueguito extends EscenaActividad {
  automata;
  pulpito;
  fondo;
  cuadricula;

  iniciar() {
    this.fondo = new Fondo('fondo.chuy.png',0,0);
    this.colocarCuadricula()
    this.construirObjeto();  
    this.construirAutomata();
    this.construirFSM();
  }

  colocarCuadricula(){
    this.cuadricula = new Cuadricula(0, 0, 1, 1,
      { alto: 100, ancho: 400 },
      { grilla: 'invisible.png', cantColumnas: 1 });
  }

  construirAutomata() {
    this.automata = new Chuy();
    this.automata.escala *= 1.2;
    this.cuadricula.agregarActor(this.automata, 0, 0, false);
    this.automata.x -= 50;
  }

  construirObjeto() {
    this.pulpito = new Pulpito();   
    this.pulpito.y = -120;
    this.pulpito.escala *= 0.2;
    this.pulpito.aprender(Flotar, {Desvio: 4});
    this.cuadricula.agregarActor(this.pulpito, 0, 0, false);
  }

  private construirFSM(){
    var builder= new BuilderStatePattern(this, 'inicial',false);
    builder.agregarEstado('posCorrecta',false);
    builder.agregarEstado('calentar1',false);
    builder.agregarEstado('calentar2',false);
    builder.agregarEstado('enCalor',false);
    builder.agregarEstado('levantarPelota',false);
    builder.agregarEstado('tirarAlAire',false);
    builder.agregarEstado('jugarConElPie',false);
    builder.agregarEstado('resuelto',false);
    builder.agregarEstado('noResuelve',false);
    builder.agregarEstadoAceptacion('fin');


    builder.agregarTransicion('inicial', 'posCorrecta', 'avanzar');
    builder.agregarTransicion('posCorrecta','calentar1','retroceder');
    builder.agregarTransicion('posCorrecta','calentar2','avanzar');
    builder.agregarTransicion('calentar1','enCalor','avanzar');
    builder.agregarTransicion('calentar2','enCalor','retroceder');
    builder.agregarTransicion('enCalor','levantarPelota','recoger');
    builder.agregarTransicion('levantarPelota','tirarAlAire','revolearPulpito');
    builder.agregarTransicion('levantarPelota','jugarConElPie','rebotarPiePulpito');
    builder.agregarTransicion('tirarAlAire','resuelto','rebotarPiePulpito');
    builder.agregarTransicion('jugarConElPie','resuelto','revolearPulpito');
    builder.agregarTransicion('resuelto','fin','volver');
    
    builder.agregarError('inicial', 'recoger', 'Primero hay que entrar en calor');
    builder.agregarError('inicial', 'revolearPulpito', 'Primero hay que entrar en calor y agarrar la pelota');
    builder.agregarError('inicial', 'rebotarPiePulpito', 'Primero hay que entrar en calor y agarrar la pelota');
    builder.agregarError('inicial', 'volver', 'Primero hay que entrar en calor');

    builder.agregarError('posCorrecta', 'recoger', 'Primero hay que entrar en calor');
    builder.agregarError('posCorrecta', 'revolearPulpito', 'Primero hay que entrar en calor y agarrar la pelota');
    builder.agregarError('posCorrecta', 'rebotarPiePulpito', 'Primero hay que entrar en calor y agarrar la pelota');
    builder.agregarError('posCorrecta', 'volver', 'Primero hay que entrar en calor');

    builder.agregarError('calentar1', 'revolearPulpito', 'Primero hay que entrar en calor y agarrar la pelota');
    builder.agregarError('calentar1', 'rebotarPiePulpito', 'Primero hay que entrar en calor y agarrar la pelota');
    builder.agregarError('calentar1', 'volver', 'Primero hay que entrar en calor y agarrar la pelota');

    builder.agregarError('calentar2', 'revolearPulpito', 'Primero hay que entrar en calor y agarrar la pelota');
    builder.agregarError('calentar2', 'rebotarPiePulpito', 'Primero hay que entrar en calor y agarrar la pelota');
    builder.agregarError('calentar2', 'volver', 'Primero hay que entrar en calor y agarrar la pelota');

    builder.agregarError('enCalor', 'revolearPulpito', 'Primero hay que agarrar la pelota');
    builder.agregarError('enCalor', 'rebotarPiePulpito', 'Primero hay que agarrar la pelota');
    builder.agregarError('enCalor', 'volver', 'Primero hay que agarrar la pelota');

    builder.agregarError('levantarPelota', 'volver', 'Primero hay que jugar con la pelota');

    this.estado = builder.estadoInicial();
  }
}
