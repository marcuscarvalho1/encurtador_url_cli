import { Component, OnInit } from '@angular/core';
import { Url } from 'src/app/shared/model/url.module';
import { EncurtadorService } from 'src/app/shared/service/encurtador.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {    
    url1: Url = new Url;
    exibirSpinner: boolean = false;

    constructor(
        public encurtadorService1: EncurtadorService
    ) { }

    ngOnInit(): void {
    }

    onClickButton(novaUrl: string){
        //Primeiro tenta achar a url digitada na base de dados. Se encontrar, envia uma requisição PUT. Se não encontrar, cria uma nova linha com um POST
        this.exibirSpinner = true;
        this.url1.urlReal = this.urlFormat(novaUrl);
        if(this.url1.urlReal != ''){
            //console.log(this.url1.urlReal);            
            this.encurtadorService1.consultaUrlReal(this.url1).subscribe(data => {
                this.url1 = data;
                //console.log("url = " + this.url1.id);
                
                if(this.url1 != null){
                    //Cenário 1: A mesma URL foi encotnrada no banco => Faz UPDATE na base
                    this.encurtadorService1.alteraUrl(this.url1).subscribe(data => {
                        this.url1 = data;
                        this.exibirSpinner = false;
                        //console.log("url = " + this.url1.id);                                                
                    });
                }else{
                    //Cenário 2: é uma URL nova no banco => salva no banco
                    this.url1 = new Url;
                    this.url1.urlReal = this.urlFormat(novaUrl);
                    this.encurtadorService1.insereUrlEncurtada(this.url1).subscribe(data => {
                        this.url1 = data;
                        this.exibirSpinner = false;
                        //console.log("url = " + this.url1.id);                                                
                    });
                }
            });
        }
    }
    
    urlFormat(urlNaoFormatada: string){ //Recebe uma url qualquer e retorna com o prefixo http://, caso já não o possua
        if (urlNaoFormatada == '')
            return '';
        else if(urlNaoFormatada.startsWith('http://'))
            return urlNaoFormatada;
        else
            return 'http://' + urlNaoFormatada;
    
    }
    
    ocultarSpinner(){
        this.exibirSpinner = false;
    }

}
