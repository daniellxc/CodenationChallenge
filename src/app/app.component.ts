import { Component } from '@angular/core';
import { ApiService } from './shared/api.service';
import { Model } from './shared/model';
import * as sha1 from 'sha1';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Desafio Codenation Serasa Consumidor';
  constructor(private api:ApiService){}

  
  public Alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  pergunta = "";
  resposta = "";
  model: Model;
  files: FileList;


  public perguntar(){
    this.api.pergunta().subscribe(x =>{
      this.pergunta = `Texto cifrado: ${x.cifrado}`;
      this.model = x;
    })
  }

  public decifrar(){
    let retorno = '';
    if(this.model != null){
      for(var i = 0; i < this.model.cifrado.length; i ++){
        retorno += this.getDecryptChar(this.model.cifrado[i], this.model.numero_casas);
      }
    }
    this.model.decifrado = retorno;
    this.model.resumo_criptografico = sha1(this.model.decifrado);
    this.resposta = `Texto decifrado: ${this.model.decifrado}`;
  }
 
  public enviarResposta(){
   if(this.files !== null){
     this.api.resposta(this.files.item(0)).subscribe((response) => {
       alert('Sucesso! Seu score:'+ response.score);
      }, erro=>{ 
                alert(`Erro>> code:${erro.error.code} message:${erro.error.message}`);
                })
   }
  }
   public uploadFile(files: FileList){
     if(files !== null){
       this.files = files;
     }
   }
    
  
  private getCriptChar(charItem, fator){
    if(this.Alphabet.indexOf(charItem) >= 0){
      let newIndex = (this.Alphabet.indexOf(charItem) + fator);
      if(newIndex > this.Alphabet.length){
        newIndex = this.Alphabet.length - newIndex;
      }
      return this.Alphabet[newIndex];
    }
    return charItem; 
  }

  private getDecryptChar(charItem, fator){
    if(this.Alphabet.indexOf(charItem) >= 0){
      let newIndex = (this.Alphabet.indexOf(charItem) - fator);
      if(newIndex < 0){
        newIndex =  newIndex*(-1);
      }
      return this.Alphabet[newIndex];
    }
    return charItem; 
  }
  
}
