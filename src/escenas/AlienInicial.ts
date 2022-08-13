/// <reference path = "EscenaActividad.ts" />
/// <reference path = "../actores/Cuadricula.ts" />
/// <reference path = "../actores/BananaAnimada.ts" />
/// <reference path = "../actores/ManzanaAnimada.ts" />

class AlienInicial extends EscenaActividad {
  fondo;
  cuadricula;
  automata;
  estado;
  boton;
  fondoCuadricula;

  iniciar() {
    this.estado = this.armarEstado();
    this.fondo = new Fondo('fondos.alien-inicial.png', 0, 0);
    this.agregarCuadricula()

    this.automata = new AlienAnimado(0, 0);
    this.cuadricula.agregarActorEnPerspectiva(this.automata, 0, 0, false);

    this.agregarBotones()

  }

  agregarCuadricula() {
    this.cuadricula = new Cuadricula(-25, -200, 1, 4,
      { alto: 25, ancho: (pilas.opciones.ancho * 0.8) },
      { grilla: 'invisible.png', cantColumnas: 1 });

    this.fondoCuadricula = new Actor("camino-alien-boton.png", this.cuadricula.x, this.cuadricula.y);
    this.fondoCuadricula.ancho = this.cuadricula.ancho;
  }

  agregarBotones() {
    this.boton = new BotonAnimado(0, 0);
    this.boton.derecha = this.cuadricula.derecha + 25;
    this.boton.abajo = this.cuadricula.arriba;
  }

  armarEstado() {
    var a = new BuilderStatePattern(this, 'inicial');
    a.agregarEstadoAceptacion('final');
    a.agregarTransicion('inicial', 'final', 'apretarBoton');
    return a.estadoInicial();
  }
}
