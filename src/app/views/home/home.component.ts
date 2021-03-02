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
    dialog: any;

  constructor(
    public encurtadorService1: EncurtadorService
  ) { }

  ngOnInit(): void {
  }
  
  onClickButton(novaUrl: string){      
      this.url1.urlReal = novaUrl;
      console.log('urlDigitada = ' + novaUrl);
      if(this.url1.urlReal != ''){
        
        this.encurtadorService1.insereUrlEncurtada(this.url1).subscribe(data =>{
            this.url1 = data;
            console.log(this.url1.id);
        });
      }
  }      

}
