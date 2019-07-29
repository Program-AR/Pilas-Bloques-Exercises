/// <reference path = "../../node_modules/pilasweb/dist/pilasweb.d.ts"/>

/* @class HabilidadAnimada
 * Es la clase de la que heredan todas en ejerciciosPilas, donde 
 * va el comportamiento en común que no quiero poner en pilasweb
 *
*/
class HabilidadAnimada extends Habilidad {
	implicaMovimiento(){
		return false;
	}
}
