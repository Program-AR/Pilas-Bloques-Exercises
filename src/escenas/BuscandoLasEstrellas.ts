/// <reference path = "EscenaActividad.ts" />
/// <reference path = "../actores/segundoCiclo/Manic/Manic.ts" />
/// <reference path = "../actores/segundoCiclo/Manic/TelescopioAnimado.ts" />
/// <reference path = "../actores/segundoCiclo/Chuy/Chuy.ts" />
/// <reference path = "../actores/segundoCiclo/Yvoty/Yvoty.ts" />
/// <reference path = "../habilidades/Flotar.ts" />
/// <reference path = "../comportamientos/SecuenciaAnimada.ts" />
/// <reference path = "../comportamientos/Interactuar.ts" />


class BuscandoLasEstrellas extends EscenaActividad {
  telescopios = [];
  amigos = [];

  iniciar() {
    this.fondo = new Fondo('fondo.manic.oscuro.png', 0, 0);
    this.cuadricula = new Cuadricula(10, 0, 2, 3,
      { alto: 360, ancho: 440 },
      { grilla: 'invisible.png', cantColumnas: 1 });
    this.cuadricula.casilla(0, 0).cambiarImagen('sombra5.telescopios.png');
    this.cuadricula.casilla(0, 1).cambiarImagen('sombra7.telescopios.png');
    this.cuadricula.casilla(0, 2).cambiarImagen('sombra9.telescopios.png');
    this.agregarTelescopios();
    this.agregarAutomata();
    this.agregarAmigos();
    this.crearEstado();
  }

  agregarAutomata() {
    this.automata = new Manic();
    this.cuadricula.agregarActor(this.automata, 0, 0, false);
    this.automata.y += 20;
    this.automata.x -= 30;
    this.automata.definirAnimacion("moverTelescopio", [28, 29, 30, 28], 3, false);
    
  }

  agregarTelescopios() {
    this.telescopios.push(new TelescopioAnimado());
    this.telescopios.push(new TelescopioAnimado());
    this.telescopios.push(new TelescopioAnimado());
    this.cuadricula.agregarActor(this.telescopios[0], 0, 0, false);
    this.cuadricula.agregarActor(this.telescopios[1], 0, 1, false);
    this.cuadricula.agregarActor(this.telescopios[2], 0, 2, false);
    this.telescopios.forEach(t => { t.escala = 0.7; t.x += -3; t.y -= 0});
  }

  agregarAmigos() {
    this.amigos.push(new ActorCompuesto(0, 0, { subactores: [new Capy()] }));
    this.amigos.push(new ActorCompuesto(0, 0, { subactores: [new Yvoty()] }));
    this.amigos.push(new ActorCompuesto(0, 0, { subactores: [new Chuy()] }));
    this.amigos.forEach((a,i) => {
      this.cuadricula.agregarActor(this.amigos[i], 1, 0, false);
      a.x += (i*100)+50
      a.izquierda = pilas.derecha() + 1;
      });

  }

  private crearEstado() {
    var builder = new BuilderStatePattern(this, 'nadieObserva');
    builder.agregarEstadoAceptacion('todosObservando');
    builder.agregarTransicion('nadieObserva', 'todosObservando', 'observarConAmigos');
    this.estado = builder.estadoInicial();
  }
}

class MoverTelescopio extends Interactuar {

  sanitizarArgumentos() {
    this.argumentos.etiqueta = "TelescopioAnimado";
    this.argumentos.nombreAnimacion = "moverTelescopio";
    super.sanitizarArgumentos();
  }

  protected alInteractuar(): void {
    (this.interactuado() as TelescopioAnimado).mover();
  }

}

class TodosObservando extends SecuenciaAnimada {

// ver si todosobservando no tiene que ser una secuenciaanimada sino otro comportamiento
// que permita que todos se muevan

  sanitizarArgumentos() {
    super.sanitizarArgumentos();
    pilas.escena_actual().automata.y -= 50;
    pilas.escena_actual().automata.izquierda = pilas.izquierda();
    pilas.escena_actual().automata.x += 200;
    pilas.escena_actual().automata.cargarAnimacion('parado');


    this.argumentos.secuencia = [
      //new Desaparecer({}),
      new ComportamientoConVelocidad({ receptor: pilas.escena_actual().automata, nombreAnimacion: "correr" }),
      new ComportamientoConVelocidad({ receptor: pilas.escena_actual().amigos[0], nombreAnimacion: "correr" }),
      new ComportamientoConVelocidad({ receptor: pilas.escena_actual().amigos[1], nombreAnimacion: "correr" }),
      new ComportamientoConVelocidad({ receptor: pilas.escena_actual().amigos[2], nombreAnimacion: "correr" })
    ];
  
    /*
    pilas.escena_actual().amigos.forEach((a,i) => {
      a.izquierda = pilas.izquierda();
      a.x += (i*50)+50;
      a.y -= 100;
      a.hacer_luego(ComportamientoAnimado,{nombreAnimacion: 'correr'});
      
      // con esto el unico que corre es el ultimo
      this.argumentos.secuencia = [
        new ComportamientoConVelocidad({ receptor: a, nombreAnimacion: "correr" }),
      ];
      
    }
    );*/
  }

  configurarVerificaciones() {
    super.configurarVerificaciones();
    this.agregarVerificacionTelescopio(0, 5, "primer");
    this.agregarVerificacionTelescopio(1, 7, "segundo");
    this.agregarVerificacionTelescopio(2, 9, "tercer");
  }

  agregarVerificacionTelescopio(i, veces, ordinal) {
    this.verificacionesPre.push(
      new Verificacion(() => pilas.escena_actual().telescopios[i].nombreAnimacionActual() === "mover" + veces,
        "¡El " + ordinal + " telescopio debe moverse " + veces + " veces!"));
  }
}
