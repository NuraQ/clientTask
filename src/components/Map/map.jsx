import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader,InfoBox, DrawingManager, Polygon } from '@react-google-maps/api';
import useGlobal from '../store/globalState';


const libraries = ['drawing'];
const containerStyle = {
	width: '700px',
	height: '700px'
};
const SimpleMap = (props) => {
	const [globalState, globalActions] = useGlobal()
	const [marker, setMarker] = useState(null)
	var center = {
		lat: -73.9130656659264,
		lng: 40.55849125972
	};

	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: 'AIzaSyDeL9AfH6JB5TdYWWVH4WRoVmti-zFHM_g',
		libraries: libraries
	})
	const [map, setMap] = React.useState(null)
	const [polygons, setPolygons] = React.useState([])
	const [drawnPolygonsPaths, setNewPaths] = React.useState([[]])
	const onLoad = React.useCallback(function callback(map) {
		const bounds = new window.google.maps.LatLngBounds();
		map.fitBounds(bounds);
		setMap(map)

	}, [])

	const onUnmount = React.useCallback(function callback(map) {
		setMap(null)
	}, [])

	const coordinates = () => {
		const newPath = props.pos.map((entry) => {
			return {location: entry.geometry.coordinates[0].map((e) => {
				return {
					lat: parseFloat(e[1]),
					lng: parseFloat(e[0])
				
				}
			}), id: entry.id
		}
		});

		return newPath;
	}
	
	function handleMouseOver(e) {
		props.mapper(this.polygonKey, true);
		const location = e.latLng;
		setMarker({location: location, key: this.polygonKey});
		this.setOptions({ fillColor: "Blue" });
	}

	function handleMouseOut(e) {
		props.mapper(this.polygonKey, false);
		 setMarker(null);
		 this.setOptions({ fillColor: globalState.polygonsColors[this.polygonKey] });
	}
	
	const polygonsArray = []
	const onLoadPoly = useCallback(
		polygon => {
			polygonsArray.push(polygon);
			setPolygons(polygonsArray);
		},
		[]
	);

	useEffect(() => {
		showPolygonFromMap()
	}, [globalState.hoveredPoly, polygonsArray, globalState.polygonsColors]);

	function showPolygonFromMap() {
		let polyId = globalState.hoveredPoly
		if (polygons[polyId - 1] != null) {
			polygons[polyId - 1].setOptions({ fillColor: "Blue" });
			setMap(polygons[polyId - 1])
		}
	}


	const onPolygonComplete = polygon => {
		paths.push(polygon.getPath().getArray())
		paths = [...paths, polygon.getPath().getArray()]
		setNewPaths(paths)
		globalActions.addNewPoly({ OBJECTID: polygonsArray.length, Shape__Area: 332, Shape__Length: 3232 })
	}
	
	const paths = coordinates();

	return isLoaded ? (
		<GoogleMap
			mapContainerStyle={containerStyle}
			zoom={10}
			onLoad={onLoad}
			onUnmount={onUnmount}
		>
			{marker ? 
					<InfoBox
						position={marker.location}
					>
						<div style={{ backgroundColor: 'white', opacity: 0.75, padding: 12 }}>
							<div style={{ fontSize: 16, fontColor: `#08233B` }}>
								{props.colors[marker.key] ? props.colors[marker.key].color: "red"}
						   </div>
						</div>
					</InfoBox>
			 : <div></div>}
			<DrawingManager
				drawingControl={true}
				onPolygonComplete={onPolygonComplete}
				onRectangleComplete={onPolygonComplete}
				onPolylineComplete={onPolygonComplete}
			/>

			{paths.map(
				path => {
					return (
						<div key={`polygon-path-${path.id}`}>
							<Polygon
								path={path.location}
								key={path.id}
								onMouseOver={handleMouseOver}
								onMouseOut={handleMouseOut}
								onUnmount={onUnmount}
								onLoad={onLoadPoly}
								clickable={false}
								options={{
									polygonKey: path.id,
								    strokeColor: props.colors[path.id] ? props.colors[path.id].color: "red",
									strokeOpacity: 0.8,
									strokeWeight: 2,
								    fillColor: props.colors[path.id] ? props.colors[path.id].color: "red",
									fillOpacity: 0.35,
									draggable: true,
									geodesic: true,
								}}
							>
							</Polygon>
						</div>);
				}
			)}
		</GoogleMap>
	) : <></>
}
export { SimpleMap };