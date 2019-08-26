import { Injectable } from '@angular/core';
import { AprobacionGroup, Libor, Task } from '../modelo/Storage'
import { Proposito } from '../modelo/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  tasks: Task[];
  role: string;
  usuario: string;
  dialogSelectPropositos: string[] = [];
  dialogSelectGarantias: string[] = [];
  dialogSelectFianzas: string[] = [];
  dialogSelectUserCompartido: string[] = [];

  tablaLibor: Libor[] = [
    //Corporativa
    { banca: "28bc59db-f485-4a73-b344-1bf1b71159f0", meses: '1', libor: 2.47, spread: 0.53 },
    { banca: "28bc59db-f485-4a73-b344-1bf1b71159f0", meses: '2', libor: 2.51, spread: 0.74 },
    { banca: "28bc59db-f485-4a73-b344-1bf1b71159f0", meses: '3', libor: 2.56, spread: 0.94 },
    { banca: "28bc59db-f485-4a73-b344-1bf1b71159f0", meses: '6', libor: 2.62, spread: 1.38 },
    { banca: "28bc59db-f485-4a73-b344-1bf1b71159f0", meses: '12', libor: 2.62, spread: 2.76 },
    { banca: "28bc59db-f485-4a73-b344-1bf1b71159f0", meses: '24', libor: 2.62, spread: 3.13 },
    { banca: "28bc59db-f485-4a73-b344-1bf1b71159f0", meses: '36', libor: 2.62, spread: 3.38 },
    { banca: "28bc59db-f485-4a73-b344-1bf1b71159f0", meses: '48', libor: 2.62, spread: 3.84 },
    { banca: "28bc59db-f485-4a73-b344-1bf1b71159f0", meses: '60', libor: 2.62, spread: 4.64 },
    { banca: "28bc59db-f485-4a73-b344-1bf1b71159f0", meses: '72', libor: 2.62, spread: 4.72 },
    //PyME
    { banca: "c89f359d-2fd8-488d-8b79-842f893e057e", meses: '1', libor: 2.47, spread: 0.53 },
    { banca: "c89f359d-2fd8-488d-8b79-842f893e057e", meses: '2', libor: 2.51, spread: 0.74 },
    { banca: "c89f359d-2fd8-488d-8b79-842f893e057e", meses: '3', libor: 2.56, spread: 0.94 },
    { banca: "c89f359d-2fd8-488d-8b79-842f893e057e", meses: '6', libor: 2.62, spread: 1.38 },
    { banca: "c89f359d-2fd8-488d-8b79-842f893e057e", meses: '12', libor: 2.62, spread: 4.01 },
    { banca: "c89f359d-2fd8-488d-8b79-842f893e057e", meses: '24', libor: 2.62, spread: 4.38 },
    { banca: "c89f359d-2fd8-488d-8b79-842f893e057e", meses: '36', libor: 2.62, spread: 4.63 },
    { banca: "c89f359d-2fd8-488d-8b79-842f893e057e", meses: '48', libor: 2.62, spread: 5.09 },
    { banca: "c89f359d-2fd8-488d-8b79-842f893e057e", meses: '60', libor: 2.62, spread: 5.89 },
    { banca: "c89f359d-2fd8-488d-8b79-842f893e057e", meses: '72', libor: 2.62, spread: 5.97 },
    //Empresa
    { banca: "a4a5b61b-bfa1-4bfe-a579-c3fea5804d8f", meses: '1', libor: 2.47, spread: 0.53 },
    { banca: "a4a5b61b-bfa1-4bfe-a579-c3fea5804d8f", meses: '2', libor: 2.51, spread: 0.74 },
    { banca: "a4a5b61b-bfa1-4bfe-a579-c3fea5804d8f", meses: '3', libor: 2.56, spread: 0.94 },
    { banca: "a4a5b61b-bfa1-4bfe-a579-c3fea5804d8f", meses: '6', libor: 2.62, spread: 1.38 },
    { banca: "a4a5b61b-bfa1-4bfe-a579-c3fea5804d8f", meses: '12', libor: 2.62, spread: 3.26 },
    { banca: "a4a5b61b-bfa1-4bfe-a579-c3fea5804d8f", meses: '24', libor: 2.62, spread: 3.63 },
    { banca: "a4a5b61b-bfa1-4bfe-a579-c3fea5804d8f", meses: '36', libor: 2.62, spread: 3.88 },
    { banca: "a4a5b61b-bfa1-4bfe-a579-c3fea5804d8f", meses: '48', libor: 2.62, spread: 4.34 },
    { banca: "a4a5b61b-bfa1-4bfe-a579-c3fea5804d8f", meses: '60', libor: 2.62, spread: 5.14 },
    { banca: "a4a5b61b-bfa1-4bfe-a579-c3fea5804d8f", meses: '72', libor: 2.62, spread: 5.22 },

    //Internacional
    { banca: "a336dcda-944a-4355-adac-339dbd0297f7", meses: '1', libor: 2.47, spread: 0.53 },
    { banca: "a336dcda-944a-4355-adac-339dbd0297f7", meses: '2', libor: 2.51, spread: 0.74 },
    { banca: "a336dcda-944a-4355-adac-339dbd0297f7", meses: '3', libor: 2.56, spread: 0.94 },
    { banca: "a336dcda-944a-4355-adac-339dbd0297f7", meses: '6', libor: 2.62, spread: 1.38 },
    { banca: "a336dcda-944a-4355-adac-339dbd0297f7", meses: '12', libor: 2.62, spread: 4.01 },
    { banca: "a336dcda-944a-4355-adac-339dbd0297f7", meses: '24', libor: 2.62, spread: 4.38 },
    { banca: "a336dcda-944a-4355-adac-339dbd0297f7", meses: '36', libor: 2.62, spread: 4.63 },
    { banca: "a336dcda-944a-4355-adac-339dbd0297f7", meses: '48', libor: 2.62, spread: 5.09 },
    { banca: "a336dcda-944a-4355-adac-339dbd0297f7", meses: '60', libor: 2.62, spread: 5.89 },
    { banca: "a336dcda-944a-4355-adac-339dbd0297f7", meses: '72', libor: 2.62, spread: 5.97 }
  ];

  constructor() {
    this.tasks = [];
    this.role = "";
  }

  getTask() {
    return this.tasks;
  }

  addTask(task: Task) {
    this.tasks.push(task);
  }

  getLibor() {
    return this.tablaLibor;
  }

  //Propositos
  //********************************************* */
  setPropositos(p: string) {
    this.dialogSelectPropositos.push(p);
  }

  getPropositosId(): string[] {
    return this.dialogSelectPropositos;
  }
  resetProposito() {
    this.dialogSelectPropositos = [];
  }
  //********************************************* */

  //Garantias
  //********************************************* */
  setGarantias(p: string) {
    this.dialogSelectGarantias.push(p);
  }
  getGarantiasId(): string[] {
    return this.dialogSelectGarantias;
  }
  resetGarantia() {
    this.dialogSelectGarantias = [];
  }
  //********************************************* */

  //Fianza
  //********************************************* */
  setFianzas(p: string) {
    this.dialogSelectFianzas.push(p);
  }
  getFianzaId(): string[] {
    return this.dialogSelectFianzas;
  }
  resetFianza() {
    this.dialogSelectFianzas = [];
  }
  //********************************************* */

  //User Compartido
  //********************************************* */
  setUserCompartido(p: string) {
    this.dialogSelectUserCompartido.push(p);
  }
  getUserCompartidoId(): string[] {
    return this.dialogSelectUserCompartido;
  }
  resetUserCompartido() {
    this.dialogSelectUserCompartido = [];
  }
  //********************************************* */

  //ID del Usuario de la propuesta
  //********************************************* */
  getUserID() {
    return this.usuario;
  }
  setUserID(p: string) {
    this.usuario=p;
  }
  resetUserID() {
    this.usuario="";
  }
  //********************************************* */

  getusuarioRole() {
    return this.usuario;
  }
  getusuarioUser() {
    return this.usuario;
  }

}
