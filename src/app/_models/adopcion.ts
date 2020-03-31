export class Adopcion{
    constructor(   
        public _id:string,
        public fundacion:string,
        public adoptante:string,
        public mascota:string,
        /*--DATOS PARA ADOPCION--*/
        public datosAdopcion:{
        
            cedula:string,
            ocupacion:string,
            edad:number,
            instruccion:any,
            direccion:string,
            //referencias personales
            nombresRP:string,
            parentescoRP:string,
            telefonoRP:number,
            //situacion familiar
            numPersonas:number,
            familiarEmbarazo:string,
            familiarAlergico:string,
            //domicilio
            inmueble:string,
            mudarse:string,//¿PLANEA MUDARSE PROXIMAMENTE?
            cerramiento:string, //EL LUGAR DONDE PASARÁ EL CANINO, ¿TIENE CERRAMIENTO?
            //relacion con los animales
            tieneMascotas:string,
            numMascotas:number,//ha tenido o tiene mascotas? cuantas.
            estadoMascotas:string,//en que estado se encuentran las mascotas?
            //preguntas 
            deseoAdoptar:string, // porque desea adoptar una mascota
            cambiarDomicilio:string, // SI POR ALGÚN MOTIVO TUVIERA QUE CAMBIAR DE DOMICILIO, ¿QUÉ PASARÍA CON SU MASCOTA?
            dueniosNCasa:string, //CON RELACIÓN A LA ANTERIOR PRGUNTA ¿QUÉ PASARIA SI LOS DUEÑOS DE LA NUEVA CASA NO ACEPTACEN MASCOTAS?
            salirViaje:string,//SI UD. DEBE SALIR DE VIAJE MÁS DE UN DÍA, LA MASCOTA:
            tiempoSolo:string,//¿CUÁNTO TIEMPO EN EL DÍA PASARÁ SOLA LA MASCOTA?
            dormirMS:string, //¿DÓNDE DORMIRÁ LA MASCOTA?
            necesidadesMS:string, //¿DÓNDE HARÁ SUS NECESIDADES?
            comidaMS:any, //¿QUE COMERÁ HABITUALMENTE LA MASCOTA?
            enfermaMS:string,//SI SU MASCOTA ENFERMA USTED:
            cargoGastos:string, //¿QUIÉN SERÁ EL RESPONSABLE Y SE HARÁ CARGO DE CUBRIR LOS GASTOS DE LA MASCOTA?
            dineroMensualMS:string,//ESTIME CUÁNTO DINERO PODRÍA GASTAR EN SU MASCOTA MENSUALMENTE
            recursos:string,//¿CUENTA CON LOS RECURSOS PARA CUBRIR LOS GASTOS VETERINARIOS DEL ANIMAL DE COMPAÑÍA?
            visitarDomicilio:string,//¿ESTA DE ACUERDO EN QUE SE HAGA UNA VISITA PERIÓDICA A SU DOMICILIO PARA VER COMO SE ENCUENTRA EL ADOPTADO?
            esterilizadaMS:string ,//¿ESTÁ DE ACUERDO EN QUE LA MASCOTA SEA ESTERILIZADA? (OPERADA PARA NO TENER MAS CACHORROS)
            beneficiosEsterilizacion:string,//¿CONOCE USTED LOS BENEFICIOS DE LA ESTERILIZACIÓN?
            tenenciaResponsable:string,//SEGÚN USTED, ¿QUÉ ES TENENCIA RESPONSABLE?
            ordenanzaTenencia:string,//¿ESTÁ UD. INFORMADO Y CONCIENTE SOBRE LA ORDENANZA MUNICIPAL SOBRE LA TENENCIA REPONSABLE DE MASCOTAS?
            compartidaFamilia:string, //¿LA ADOPCIÓN FUE COMPARTIDA CON su FAMILIA?
            acuerdoFamilia:string,//SU FAMILIA ESTÁ:
        },
        //observaciones de la fundaciones
        public observaciones:string,
        public fechaRespuesta:string,
        public creadoEn:string,
        public aprobado:string
){}
}