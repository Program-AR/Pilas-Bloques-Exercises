/// <reference path = "../../node_modules/pilasweb/dist/pilasweb.d.ts"/>
/// <reference path = "Decir.ts"/>

/*
Comportamiento que hace decir una
frase definida por la escena
*/

class PingPongAnimado extends Decir {
	preAnimacion(): void {
		this.receptor.escena.antesDeRebotar();
		this.argumentos.mensaje = this.receptor.escena.getFraseAlRebotar()
		super.preAnimacion();
	}

	postAnimacion(){
		super.postAnimacion();
   		this.receptor.decir(this.receptor.escena.fraseAlRebotar());
  	}
}
