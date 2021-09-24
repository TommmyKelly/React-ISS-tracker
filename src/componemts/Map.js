import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import axios from "axios";

const Map = () => {
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [map, setMap] = useState(null);

  const iss = new Icon({
    iconUrl: "/ISS.svg",
    iconSize: [50, 50],
  });

  const getCoordinates = async () => {
    const res = await axios.get(
      "https://api.wheretheiss.at/v1/satellites/25544"
    );
    const { longitude, latitude } = res.data;
    setLat(latitude);
    setLon(longitude);
    map?.setView([parseFloat(latitude), parseFloat(longitude)]);
  };

  useEffect(() => {
    getCoordinates();
    // eslint-disable-next-line
  }, [map]);

  return (
    <div style={style.main_wrapper}>
      <p style={{ marginBottom: 10 }}>
        <h1>
          ISS current longitude: {parseFloat(lon)?.toFixed(4)} and latitude:{" "}
          {parseFloat(lat)?.toFixed(4)}
        </h1>
      </p>
      <MapContainer
        style={style.map_wrapper}
        center={[0, 0]}
        zoom={2}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
        whenCreated={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        <Marker position={[lat, lon]} icon={iss}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
      <button style={style.button} onClick={getCoordinates}>
        Get ISS location
      </button>
    </div>
  );
};

const style = {
  main_wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100vw",
    height: "100vh",
    margin: "auto",
    textAlign: "center",
    backgroundColor: "#316B83",
    color: "white",
  },
  map_wrapper: {
    width: "80%",
    height: "80%",
  },
  button: {
    cursor: "pointer",
    width: "60%",
    margin: 20,
    height: "3rem",
    fontSize: "1rem",
    fontWeight: "bold",
    backgroundColor: "#8CA1A5",
    borderRadius: 10,
    color: "white",
    borderRadius: 50,
  },
};

export default Map;
