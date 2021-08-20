/// <reference path = "EscenaDesdeMapa.ts" />
/// <reference path = "../../actores/libroPrimaria/Duba.ts" />
/// <reference path = "../../actores/libroPrimaria/Lita.ts" />
/// <reference path = "../../actores/libroPrimaria/Coty.ts" />
/// <reference path = "../../actores/libroPrimaria/Toto.ts" />

class CustomScene extends EscenaDesdeMapa {
  automata: ActorAnimado

  constructor(especificacion: string | Array<string>, opciones?: opcionesMapaAleatorio) {
    //copy pegado de las otras escenas
    super();
    this.initDesdeUnaOVariasDescripciones(especificacion, opciones);
  }

  obtenerAutomata(): ActorAnimado {
    return this.automata
  }

  mapearIdentificadorAActor(id: string, nroFila: number, nroColumna: number): ActorAnimado {
    const actorType = id[0]
    const actorId = id.substring(1)

    switch (actorType) {
      case 'a': { this.setAutomataFromId(actorId); return this.automata } //polemico
    }
  }
  archivoFondo(): string {
    return "fondo.blanco.png";
  }

  setAutomataFromId(automataId: string): void {
    this.automata = this.mapIdToAutomata(automataId)
  }

  mapIdToAutomata(id: string): ActorAnimado {
    switch (id) {
      case 'D': return new Duba()
      case 'L': return new Lita()
      case 'T': return new Toto()
      case 'C': return new Coty()
      default: throw new Error(`El identificador "a${id}" no es un automata valido.`) //Dejar el 'a' si o no? Si el caracter tipo cambia aca quedaria mal
    }
  }
}