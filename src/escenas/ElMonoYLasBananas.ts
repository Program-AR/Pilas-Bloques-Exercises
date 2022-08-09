/// <reference path = "LaEleccionDelMono.ts" />
/// <reference path = "../actores/BananaAnimada.ts" />

class ElMonoYLasBananas extends LaEleccionDelMono {
  completarConFruta(){
    if (Math.random() < .5) {
      this.agregar(BananaAnimada);
    }
  }
}
