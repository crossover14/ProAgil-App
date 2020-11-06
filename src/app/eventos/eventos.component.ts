import { HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  _filtroLista: string;
  get filtroLista(){
    return this._filtroLista;
  }
  set filtroLista(value: string){
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;

  }

  eventosFiltrados: any = [];
  filtrarLocalidade: any =[];
  localidade: any = [];
  eventos: any = [];
  imagemLargura = 50;
  imgemMargem = 2;
  mostrarImagem = true;

  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.getEventos();
  }
  filtrarEventos(filtrarPor: string): any {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      evento => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1,
    );
  }

  alternarImagem(){
    this.mostrarImagem = !this.mostrarImagem;
  }

  getEventos(){
     this.http.get('http://localhost:5000/api/values').subscribe(response => {
       this.eventos = response;
      }, error => {
        console.log(error);
      }
     );
  }

}
