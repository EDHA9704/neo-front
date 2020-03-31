export class Emergencia{
    constructor(
        public _id:string,
        public tipoEmergencia:string,
        public nivelEmergencia:string,
        public sexoMascota:string,
        public raza:string,
        public estadoMascota:string,
        public tipoMascota:string,
        public fotoMascota:string,
        public direccionSector:string,
        public direccionCprincipal:string,
        public direccionCsecundaria:string,
        public direccionReferencia:string,
        public direccionFoto:string,
        public contactoExtra:string,
        public descripcion:string,
        public responsable:string,
        public fundacion:string,
        public voluntarios:any

){}
}