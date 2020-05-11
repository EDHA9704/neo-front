import { Component, OnInit , ViewChild} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {UsuarioFundacion} from '../../../../_models/usuarioFundacion';
import { UserService, AuthenticationService,} from '../../../../_shared/services';
import { environment } from '../../../../../environments/environment'; 
@Component({
  selector: 'app-avoluntarios',
  templateUrl: './avoluntarios.component.html',
  styleUrls: ['./avoluntarios.component.scss'],
  providers:[UserService]
})
export class AvoluntariosComponent implements OnInit {
  public fundaciones:any;
  public url;
  public identity;
  public token;
  public carga;

  public usuarioFundacion:UsuarioFundacion;
  displayedColumns: string[] = ['nombres','cedula','correo','fundacion','telefono','celular','estado'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  dataSource:any;
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  public currentUser;
  constructor(private _route:ActivatedRoute,
    private _router:Router, private _usuarioService:UserService,private authenticationService: AuthenticationService) { 
      this.currentUser = this.authenticationService.currentUserValue;

      this.url = environment.apiUrl;
      this.carga = true;
    }

  ngOnInit() {
    this._route.params.subscribe(params =>{

        this.obtVoluntarios()
    });
   
  }
  obtVoluntarios(){
    this._usuarioService.obtUsuariosRolSP('2').subscribe(
      response=>{
        if(response.usuarios && response.n == '1'){
          this.carga = false;
            this.fundaciones = response.usuarios;
            this.dataSource = new MatTableDataSource<UsuarioFundacion>(this.fundaciones);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }
      },
      error=>{
        this.carga = false;
      }
    )
  }
}
