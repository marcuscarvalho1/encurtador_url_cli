import { Component, OnInit } from '@angular/core';
import { Url } from 'src/app/shared/model/url.module';
import { EncurtadorService } from 'src/app/shared/service/encurtador.service';
import { Context } from 'src/app/shared/util/context';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {
    
    requestPath: string = Context.consultaRequestPath();
    url: Url = new Url;
    mensagemGrande: string = '';
    mensagemPequena: string = '';
    exibirImg: boolean = false;
    exibirSpinner: boolean = true;

    constructor(
        public encurtadorService1: EncurtadorService
    ) {}

    ngOnInit(): void {
        this.exibirImg = false;
        this.exibirSpinner = true;
        this.protocoloInit();
    }
    
    getUrl(){
        this.encurtadorService1.consultaUrlEncurtada(this.requestPath).subscribe(data =>{
            this.url = data;           
            console.log('Tamanho do array dentro do bloco subscribe = ' + this.url.id);
        });
    }    
    
    protocoloInit(){ 
        //Se encontra a url encurtada, mas ela não se encontra expirada, devolve a mensagem de URL expirada.
        //Se encontra a url encurtada e ela ainda está ativa, redireciona para a página real correspondente
        //Se não encontra a url encurtada, devolve a página 404     
        this.encurtadorService1.consultaUrlEncurtada(this.requestPath).subscribe(data =>{
            this.url = data;            
            if(this.url == null){                
                this.mensagemGrande = '404 - Página não encontrada!';
                this.mensagemPequena = 'Lamentamos. A página pesquisada não pode ser encontrada.';
                this.exibirImg = true;
                this.exibirSpinner = false;
            }else{
                if(new Date(this.url.dataHoraExpiracao) > new Date()){
                    window.location.href = this.url.urlReal;
                }else{                    
                    this.mensagemGrande = 'Esta URL está expirada!';
                    this.mensagemPequena = 'A página pesquisada não é mais válida. Retorne à pagina principal e peça uma nova URL encurtada.';
                    this.exibirImg = true;
                    this.exibirSpinner = false;
                }
            }
        });
    }

}
