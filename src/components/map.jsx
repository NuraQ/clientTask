import React, { useState, useRef, useCallback, useEffect } from 'react';
import { GoogleMap, LoadScript, OverlayView, useJsApiLoader } from '@react-google-maps/api';
import { Polygon, Marker } from '@react-google-maps/api';
import useGlobal from './globalState.jsx';
import { DrawingManager } from '@react-google-maps/api';
//   const ScriptLoaded = require("@react-google-maps/api/src/docs/ScriptLoaded").default;

import './marker.css'

const libraries = ["drawing"];

const containerStyle = {
	width: '700px',
	height: '700px'
};

// drawingManager.setMap(map);


const SimpleMap = (props) => {
	const [globalState, globalActions] = useGlobal()
	const [markers, setMarkers] = useState([])
	const center = {
		lat: -73.9130656659264,
		lng: 40.55849125972
	};
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: 'AIzaSyDeL9AfH6JB5TdYWWVH4WRoVmti-zFHM_g',
		libraries: ['drawing']

	})

	const [map, setMap] = React.useState(null)
	const [polygons, setPolygons] = React.useState([])
	const [polygonColor, setPolygonColor] = React.useState([])
	const [drawnPolygonsPaths, setNewPaths] = React.useState([[]])
	 const [newPaths, setPaths] = React.useState([[]])


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
	var k = 0
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
		//		setPolygonColor(this.fillColor)
		this.setOptions({ fillColor: "Blue" });
		props.mapper(this.polygonKey, true);
	}
	function handleMouseOut(e) {
		this.setOptions({ fillColor: globalState.polygonsColors[this.polygonKey] });
		props.mapper(this.polygonKey, false);
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
		if (polygons[polyId] != null) {
			polygons[polyId].setOptions({ fillColor: "Blue" });
			setMap(polygons[polyId])
		}
	}

	const handleMapClick = (e) => {
		const location = e.latLng;
		console.log(markers)
		const marks = [...markers, location]
		setMarkers(marks);
	};

	const onLoadManager = drawingManager => {
		console.log("sthx")
		console.log(drawingManager, "drawing maang")
	}

	const onPolygonComplete = polygon => {
		console.log("poly",polygon.getPath().getArray())
		paths.push(polygon.getPath().getArray())
		paths = [...paths, polygon.getPath().getArray()]
		setNewPaths(paths)
		globalActions.addNewPoly({OBJECTID: 5902,Shape__Area:332,Shape__Length: 3232})
		
	}
	return isLoaded ? (

		<GoogleMap
			mapContainerStyle={containerStyle}
			center={center}
			zoom={10}
			onLoad={onLoad}
			onUnmount={onUnmount}

			onClick={handleMapClick
			}
		>
			<DrawingManager
				drawingControl={true}
				onLoad = {onLoadManager}
				onPolygonComplete = {onPolygonComplete}
				onRectangleComplete = {onPolygonComplete}
				onPolylineComplete = {onPolygonComplete}
			/>
			{coordinates()}

			{paths.map(
				path => {
					return (<Polygon

						path={path}
						key={paths.indexOf(path) + 1}
						onMouseOver={handleMouseOver}
						onMouseOut={handleMouseOut}
						onUnmount={onUnmount}
						onLoad={onLoadPoly}
						clickable={true}
						options={{
							polygonKey: paths.indexOf(path) + 1,
							strokeColor: globalState.polygonsColors[paths.indexOf(path) + 1],
							strokeOpacity: 0.8,
							strokeWeight: 2,
							fillColor: globalState.polygonsColors[paths.indexOf(path) + 1],
							fillOpacity: 0.35,
							draggable: true,
							geodesic: true,
							tooltipText : "dsds"

						}}

					>
					</Polygon>);


				}

			)}


		</GoogleMap>
	) : <></>
}




export { SimpleMap };