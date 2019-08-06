/// <reference path = "LaEleccionDelMono.ts" />

class ElMonoYLasBananas extends LaEleccionDelMono {
  
  public agregarFruta(): void {
    if (Math.random() < .5) {
      this.agregar(new BananaAnimada(0, 0));
    }
  }
  
}
