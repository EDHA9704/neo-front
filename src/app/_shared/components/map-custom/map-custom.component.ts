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
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=> {
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        var tem = position.coords.latitude;
        var temfin = tem.toString()
        var temLo =  parseFloat(temfin) 

        var tem2 = position.coords.longitude;
        var temfin2 = tem2.toString()
        var temLo2 =  parseFloat(temfin2) 
        this.userLatLng.lat = temLo;
        this.userLatLng.lng = temLo2;
        this.loadMap()
        this.geoCoder.geocode({'latLng': pos}, (results, status)=> {
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
    const mapEle:HTMLElement = document.getElementById('map');
    this.mapHtml = mapEle;
    this.map = new google.maps.Map(this.mapHtml,{
      center:this.userLatLng,
      zoom:12,
    })
    google.maps.event.addListenerOnce(this.map,'idle',()=>{
     this.putMarker(this.map,this.userLatLng,'Hello')
     //ARRASTRAR MARKER
     google.maps.event.addListener(this.markerActualUserLocation, 'dragend', (evt)=>{
       this.userLatLng.lat = evt.latLng.lat()
       this.userLatLng.lng =  evt.latLng.lng()
       this.geoCoder.geocode({'location': evt.latLng}, (results, status) => {
        if(status === 'OK' && results[0]){
           this.userTextActualLocation = results[1].formatted_address
           this.map.setCenter(this.markerActualUserLocation.position);
           this.markerActualUserLocation.setMap(this.map);
          }
      })
     });
     google.maps.event.addListener(this.markerActualUserLocation, 'dragstart', function(evt){
       evt.latLng.lat()    });
   })
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
     if (this.bsMap.value == '') {
       this.autocompleteItems = [];
       return;
     }
     this.GoogleAutocomplete.getPlacePredictions({ input: this.bsMap.value },
       (predictions, status) => {
         this.autocompleteItems = [];
         this.zone.run(() => {
           predictions.forEach((prediction) => {
             this.autocompleteItems.push(prediction);
           });
         });
       });
  
   }
   async selectSearchResult(item) {
     this.markerActualUserLocation.setMap(null);
     this.autocompleteItems = [];
   this.geoCoder.geocode({'placeId': item.place_id}, (results, status) => {
   if(status === 'OK' && results[0]){
     this.userLatLng.lat = results[0].geometry.location.lat()
     this.userLatLng.lng =  results[0].geometry.location.lng()
     this.markerActualUserLocation.position = results[0].geometry.location
     this.map.setCenter(this.markerActualUserLocation.position);
     this.markerActualUserLocation.setMap(this.map);
     this.userTextActualLocation = results[0].formatted_address
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
