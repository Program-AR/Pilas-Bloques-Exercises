/// <reference path="ActorCompuesto.ts"/>
/// <reference path="../habilidades/Flotar.ts"/>

class FlechaEscenarioAleatorio extends ActorCompuesto {
  static _grilla = 'flechaEscenarioAleatorio.png'

  constructor() {
    const x = -100
    const y = 200
    
    const arrow = new ActorAnimado(x, y, { grilla: FlechaEscenarioAleatorio._grilla })
    const text = new TextoAnimado(x, y, "¡Hay varios escenarios!", {margen: 10})
    arrow.setAncho(text.getAncho())
    arrow.setAlto(text.getAlto()*2)
    super(x, y, { subactores: [arrow, text] })
    this.aprender(Flotar,{eje: 'Y', Desvio: 10, velocidad: 4})
  }

}

class TextoAnimado extends Texto {

	cargarAnimacion(nombre) {
		// no hace nada
	}

	animar(){
		// no hace nada
	}
}