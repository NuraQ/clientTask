import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader,InfoBox, DrawingManager, Polygon } from '@react-google-maps/api';
import useGlobal from '../store/globalState';
import { TablePagination } from '@material-ui/core';


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
	var paths = [[]]
	var i = 0
	const coordinates = () => {
		{
			props.pos.map(
				(ele) => {
					paths[i] = []
					ele.geometry.coordinates.map(
						coord => {
							for (var k = 0; k < coord.length; k++) {
								paths[i].push({ lat: parseFloat(coord[k][0]), lng: parseFloat(coord[k][1]) });

							}
						}
					)
					i = i + 1
				}
			)
		}
	}
	function handleMouseOver(e) {
		props.mapper(this.polygonKey, true);
		const location = e.latLng;
		center = {location};
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
	return isLoaded ? (
		<GoogleMap
			mapContainerStyle={containerStyle}
			center={center}
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
								{globalState.polygonsNames[marker.key]}
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
			{coordinates()}
			{paths.map(
				path => {
					return (
						<div>
							<Polygon
								path={path}
								key={paths.indexOf(path) + 1}
								onMouseOver={handleMouseOver}
								onMouseOut={handleMouseOut}
								onUnmount={onUnmount}
								onLoad={onLoadPoly}
								clickable={false}
								options={{
									polygonKey: paths.indexOf(path) + 1,
									strokeColor: globalState.polygonsColors[paths.indexOf(path) + 1],
									strokeOpacity: 0.8,
									strokeWeight: 2,
									fillColor: globalState.polygonsColors[paths.indexOf(path) + 1],
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
