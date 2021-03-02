import { Component, OnInit } from '@angular/core';
import { Url } from 'src/app/shared/model/url.module';
import { EncurtadorService } from 'src/app/shared/service/encurtador.service';
import { Context } from 'src/app/shared/util/context';
import { HomeComponent } from '../home.component';

@Component({
    selector: 'app-url-list',
    templateUrl: './url-list.component.html',
    styleUrls: ['./url-list.component.css']
})
export class UrlListComponent implements OnInit {    
    
    contextPath: string = this.getContextPath();
    displayedColumns: string[] = ['urlEncurtada', 'urlReal', 'dataHoraExpiracaoFormat'];
    
    urls: Url[] = [];
    urlsNaoExpiradas: Url[] = [];    

    constructor(
        public encurtadorService1: EncurtadorService,
        public homeComponent1: HomeComponent
    ) { }

    ngOnInit(): void {
        setInterval(() => {
            this.getUrlsNaoExpiradas()            
        }, 4000);
    }
    
    getContextPath() {
        return Context.consultaContextPath();
    }
    
    getUrlsNaoExpiradas(){
        this.encurtadorService1.getUrlsNaoExpiradas().subscribe(data => {
            this.urlsNaoExpiradas = data;
            this.homeComponent1.ocultarSpinner()
        })
    }
    
    getUrls(){                
        this.encurtadorService1.getUrls().subscribe(data => {
            this.urls = data;            
            //console.log(this.urls[2].urlReal);
        });        
    }        
       
}
