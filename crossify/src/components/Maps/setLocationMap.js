// import React from "react";
// import {
//   withGoogleMap,
//   GoogleMap,
//   withScriptjs,
//   InfoWindow,
//   Marker,
// } from "react-google-maps";
// import Geocode from "react-geocode";

// Geocode.setApiKey("AIzaSyDTdEjltqANAZ2gIVPpu1_-KESWjPSxdrc");
// Geocode.enableDebug();
// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       lat: this.props.lat,
//       lng: this.props.long,
//     };
//   }

//   onMarkerDragEnd = (event) => {
//     let newLat = event.latLng.lat();
//     let newLng = event.latLng.lng();
//     this.setState({
//       lat: newLat,
//       lng: newLng,
//     });
//     // this.props.parentCallback(this.state);
//   };

//   render() {
//     const MapWithAMarker = withScriptjs(
//       withGoogleMap((props) => (
//         <GoogleMap
//           defaultCenter={{ lat: this.state.lat, lng: this.state.lng }}
//           defaultZoom={13}
//           onDblClick={this.onMarkerDragEnd}
//         >
//           <Marker
//             draggable={true}
//             onDragEnd={this.onMarkerDragEnd}
//             position={{ lat: this.state.lat, lng: this.state.lng }}
//           />
//         </GoogleMap>
//       ))
//     );
//     return (
//       <div className="rounded overflow-hidden">
//         {/* <div className="text-gray-700 ml-1 mt-2">
//           latitude &nbsp;&nbsp; : {this.state.lat}
//         </div>
//         <div className="text-gray-700 ml-1 mb-2 ">
//           longitude : {this.state.lng}
//         </div> */}

//         <MapWithAMarker
//           googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDTdEjltqANAZ2gIVPpu1_-KESWjPSxdrc&libraries=places"
//           loadingElement={<div style={{ height: `100%` }} />}
//           containerElement={<div style={{ height: `500px` }} />}
//           mapElement={<div style={{ height: `100%` }} />}
//         />
//       </div>
//     );
//   }
// }
// export default App;
// App.defaultProps = {
//   lat: 23.106517,
//   long: 72.59482,
// };
import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
export class MapContainer extends React.Component {
  state = {
    markers: [
      {
        name: "Current position",
        position: {
          lat: 37.77,
          lng: -122.42,
        },
      },
    ],
  };

  componentDidUpdate() {
    console.log(this.state.markers[0].position);
  }
  onMarkerDragEnd = (coord, index) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();

    this.setState((prevState) => {
      const markers = [...this.state.markers];
      markers[index] = { ...markers[index], position: { lat, lng } };
      return { markers };
    });
  };

  render() {
    return (
      <Map
        className="view-map w-full overflow-hidden rounded"
        google={this.props.google}
        style={{ height: "450px", position: "relative" }}
        zoom={14}
      >
        {this.state.markers.map((marker, index) => (
          <Marker
            position={marker.position}
            draggable={true}
            onDragend={(t, map, coord) => this.onMarkerDragEnd(coord, index)}
            name={marker.name}
          />
        ))}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDTdEjltqANAZ2gIVPpu1_-KESWjPSxdrc",
  version: "3.38",
})(MapContainer);