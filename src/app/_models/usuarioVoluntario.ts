export class UsuarioVoluntario{
    constructor(
        public _id:string,
        public cedula:string,
        public nombres:string,
        public apellidos:string,
        public fechaNacimiento:string,
        public tipoVoluntario:string,
        public disponibilidadTiempo:string,
        public disponibilidadCasa:string,
        public disponibilidadParticipacion:string,
        public direccion:string,
        public correo:string,
        public password:string,
        public telefono:string,
        public celular:string,
        public foto:string ,
        public direccionMap:any,
        public estado:string
    ){}
}