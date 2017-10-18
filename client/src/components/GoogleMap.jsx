import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = () => (
  <div className="" style={{
    position: 'relative', color: 'white', background: 'red',
    height: 10, width: 10, top: -10, left: -10,
  }}>
    User
  </div>
);


const MapComponent = (props) => (
<div style={{width: '100%', height: '400px'}}>
<GoogleMapReact >

</GoogleMapReact>
</div>
)


export default MapComponent;