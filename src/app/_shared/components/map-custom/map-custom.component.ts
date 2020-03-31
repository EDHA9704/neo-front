import { Component, OnInit, NgZone, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
declare var google:any;
@Component({
  selector: 'app-map-custom',
  templateUrl: './map-custom.component.html',
  styleUrls: ['./map-custom.component.scss']
})
export class MapCustomComponent implements OnInit {
  GoogleAutocomplete:any = google.maps.places.AutocompleteService;
  geoCoder:any
  autocomplete: { input: string; };
  autocompleteItems: any[];
  location: any;
  placeid: any;
  userActualLocation:any;
  userTextActualLocation:any;
  markerActualUserLocation:any;
  map:any;
  userLatLng:any= {
 
  }
p:any;
  mapHtml:any;
  direccion:any=''
  bsMap= new FormControl('', []);
  bsMap2= new FormControl('', []);
  constructor(public zone: NgZone,public dialogRef: MatDialogRef<MapCustomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.geoCoder = new google.maps.Geocoder
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
  }

 async  ngOnInit() {
   await this.currentLocationUser()
  }
  async currentLocationUser(){
    //var map = new google.maps.Map(document.getElementById('map'), {
    //  center: {lat: -34.397, lng: 150.644},
     // zoom: 6
   // });
    //var infoWindow = new google.maps.InfoWindow;
    if(navigator.geolocation) {
      console.log("ENTROOMEN")
      navigator.geolocation.getCurrentPosition((position)=> {
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        console.log(position)
        var tem = position.coords.latitude;
        var temfin = tem.toString()
        var temLo =  parseFloat(temfin) 

        var tem2 = position.coords.longitude;
        var temfin2 = tem2.toString()
        var temLo2 =  parseFloat(temfin2) 
        this.userLatLng.lat = temLo;
        this.userLatLng.lng = temLo2;
        console.log(temfin)
        console.log(temLo)
        console.log(temLo2)
        console.log(this.userLatLng)
        this.loadMap()
        //infoWindow.setPosition(pos); 
          //  infoWindow.setContent('Location found.');
          //  infoWindow.open(map);
       // map.setCenter(pos);
        this.geoCoder.geocode({'latLng': pos}, (results, status)=> {
          console.log(results)
            console.log(status)
          if(status === 'OK' && results[0]){

              if(results[2]){
                this.userTextActualLocation = results[2].formatted_address
              }else{
                this.userTextActualLocation = results[0].formatted_address
              }
             

            }
      });
        
      })
      
  
  }
  
   }
   async loadMap(){
     //const loading = await this.loadController.create()
    // loading.present()
    
 
    const mapEle:HTMLElement = document.getElementById('map');
    this.mapHtml = mapEle;
    console.log(this.userLatLng)

    this.map = new google.maps.Map(this.mapHtml,{
      center:this.userLatLng,
      zoom:12,
    })
    google.maps.event.addListenerOnce(this.map,'idle',()=>{
    // loading.dismiss();
     this.putMarker(this.map,this.userLatLng,'Hello')
 
     //ARRASTRAR MARKER
     google.maps.event.addListener(this.markerActualUserLocation, 'dragend', (evt)=>{
       console.log(evt)
       this.userLatLng.lat = evt.latLng.lat()
       this.userLatLng.lng =  evt.latLng.lng()
       this.geoCoder.geocode({'location': evt.latLng}, (results, status) => {
         console.log(results)
         console.log(status)
        if(status === 'OK' && results[0]){
   
           this.userTextActualLocation = results[1].formatted_address
           this.map.setCenter(this.markerActualUserLocation.position);
           this.markerActualUserLocation.setMap(this.map);
          // loading.dismiss()
          }
      })
     });
     
     //INICIA ARRASTRE DEL MARKER
     google.maps.event.addListener(this.markerActualUserLocation, 'dragstart', function(evt){
       evt.latLng.lat()    });
   })
     
   /*this.map.addListener('click', (e)=> {
     console.log(e)
     this.placeMarkerAndPanTo(e.latLng,e.latLng, this.map);
   });*/
   }
 
   putMarker(map,markerL,text){
    
       
       this.markerActualUserLocation = new google.maps.Marker({
         position:{
           lat:markerL.lat,
           lng:markerL.lng
         },
         draggable: true,
         zoom:8,
         map:map,
         title:text
       })
     
   }
   updateSearchResults(event){
     console.log(event)
     if (this.bsMap.value == '') {
       this.autocompleteItems = [];
       return;
     }
     console.log(this.bsMap.value)
     this.GoogleAutocomplete.getPlacePredictions({ input: this.bsMap.value },
       (predictions, status) => {
         console.log(status)
         console.log(predictions)
         this.autocompleteItems = [];
         this.zone.run(() => {

           predictions.forEach((prediction) => {
             this.autocompleteItems.push(prediction);
           });
           console.log(this.autocompleteItems)
         });
       });
  
   }
   async selectSearchResult(item) {
     //this.clearMarkers();
     //const loading = await this.loadController.create()
     //loading.present()
     this.markerActualUserLocation.setMap(null);
     console.log(item)
     this.autocompleteItems = [];
 
 
 
   this.geoCoder.geocode({'placeId': item.place_id}, (results, status) => {
   if(status === 'OK' && results[0]){
     console.log(status)
     console.log(results)
  
     this.userLatLng.lat = results[0].geometry.location.lat()
     this.userLatLng.lng =  results[0].geometry.location.lng()
   
     
     this.markerActualUserLocation.position = results[0].geometry.location
     this.map.setCenter(this.markerActualUserLocation.position);
     this.markerActualUserLocation.setMap(this.map);
     this.userTextActualLocation = results[0].formatted_address
     //loading.dismiss()
     //this.markers.push(marker);
     //this.map.setCenter(results[0].geometry.location);
   }
 })
   }

   sendDireccion(op): void {

    if(op == 'ok'){
      var direccion = {
        latLng:{lat:this.userLatLng.lat,lng:this.userLatLng.lng},
        formmatedAddres:this.userTextActualLocation
       }
      this.dialogRef.close(direccion);
    }else{
      this.dialogRef.close('');
    }
    
  }
}
