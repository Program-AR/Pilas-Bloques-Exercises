/// <reference path = "./EscenaActividad.ts" />

/**
 * @class LaGranAventuraDelMarEncantado
 *
 */
class LaGranAventuraDelMarEncantado extends EscenaActividad {
  private cofre: CofreAnimado
  private llave: LlaveAnimado
  private mago: MagoAnimado
  private caballero: CaballeroAnimado
  private principe: Principe
  private unicornio: UnicornioAnimado

  public iniciar(): void {
    this.setFondo(new Fondo('fondo.marEncantado.png', 0, 0))
    this.setCuadricula(new Cuadricula(0, 0, 4, 5, { alto: 376, ancho: 380 }, { grilla: 'invisible.png' }))

    this.llave = new LlaveAnimado(0, 0)
    this.getCuadricula().agregarActorEnPerspectiva(this.llave, 1, 4)
    this.llave.setEscala(this.llave.getEscala() * 0.5)
    this.llave.aprender(Flotar, { Desvio: 5 })

    this.cofre = new CofreAnimado(0, 0)
    this.getCuadricula().agregarActorEnPerspectiva(this.cofre, 0, 0)
    this.cofre.setX(this.cofre.getX() + 8)
    this.cofre.aprender(Flotar, { Desvio: 5 })

    this.caballero = new CaballeroAnimado(0, 0)
    this.getCuadricula().agregarActorEnPerspectiva(this.caballero, 1, 2)
    this.caballero.setEscala(this.caballero.getEscala() * 1.5)
    this.caballero.setX(this.caballero.getX() + 19)

    this.principe = new Principe(0, 0)
    this.getCuadricula().agregarActorEnPerspectiva(this.principe, 1, 2)
    this.principe.setEscala(this.principe.getEscala() * 1.5)
    this.principe.setX(this.principe.getX() - 19)

    this.mago = new MagoAnimado(0, 0)
    this.getCuadricula().agregarActorEnPerspectiva(this.mago, 3, 1)
    this.mago.setEscala(this.mago.getEscala() * 1.5)

    this.unicornio = new UnicornioAnimado(0, 0)
    this.getCuadricula().agregarActorEnPerspectiva(this.unicornio, 3, 4)
    this.unicornio.setEscala(this.unicornio.getEscala() * 1.5)

    this.setAutomata(new ActorCompuesto(0, 0, { subactores: [new Heroina(0, 0)] }))
    this.getCuadricula().agregarActorEnPerspectiva(this.getAutomata(), 3, 0)
    this.getAutomata().escala *= 0.08

    // se carga el estado inicial
    this.buildState()
  }

  private buildState(): void {
    const stateBuilder = new BuilderStatePattern(this, 'inicial')
    stateBuilder.agregarEstado('llaveEnMano')
    stateBuilder.agregarEstado('cofreAbierto')
    stateBuilder.agregarEstado('magoConSombrero')
    stateBuilder.agregarEstado('princesaRescatada')
    stateBuilder.agregarEstadoAceptacion('montandoUnicornio')

    stateBuilder.agregarTransicion('inicial', 'llaveEnMano', 'agarrarLlave')
    stateBuilder.agregarTransicion('llaveEnMano', 'cofreAbierto', 'abrirCofre')
    stateBuilder.agregarTransicion('cofreAbierto', 'magoConSombrero', 'darSombrero')
    stateBuilder.agregarTransicion('magoConSombrero', 'princesaRescatada', 'atacarConEspada')
    stateBuilder.agregarTransicion('princesaRescatada', 'montandoUnicornio', 'escapar')

    const estados = ['inicial', 'llaveEnMano', 'cofreAbierto', 'magoConSombrero', 'princesaRescatada', 'montandoUnicornio']

    for (let i = 0; i < estados.length; i++) {
      if (estados[i] != 'llaveEnMano') {
        stateBuilder.agregarError(estados[i], 'abrirCofre', 'Para abrir el cofre necesitás la llave.')
      }
      if (estados[i] != 'cofreAbierto') {
        stateBuilder.agregarError(estados[i], 'darSombrero', 'Para darle el sombrero al mago necesitás sacarlo del cofre.')
      }
      if (estados[i] != 'magoConSombrero') {
        stateBuilder.agregarError(estados[i], 'atacarConEspada', 'Para atacar al caballero, el mago debe darte la espada.')
      }
      if (estados[i] != 'princesaRescatada') {
        stateBuilder.agregarError(estados[i], 'escaparEnUnicornio', 'Para escapar en unicornio, debés rescatar al príncipe.')
      }
    }

    this.setEstado(stateBuilder.estadoInicial())
  }

}
