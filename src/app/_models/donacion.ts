export class Donacion{
    constructor(
        public _id:string,
        public tipo:string,
        public nombres:string,
        public apellidos:string,
        public cedula:string,
        public direccion:string,
        public telefono:string,
        public celular:string,
        public cantidad:string,
        public nombreProducto:string,
        public voluntarios:any,
        public comprobante:string,
        public descripcion:string,
        public donante:string,
        
){}
}