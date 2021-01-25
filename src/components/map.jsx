import React, { useState, useRef, useCallback, useEffect } from 'react';
import { GoogleMap, LoadScript, useJsApiLoader } from '@react-google-maps/api';
import { Polygon } from '@react-google-maps/api';
import useGlobal from './globalState';

import './marker.css'

const containerStyle = {
	width: '700px',
	height: '700px'
};


const SimpleMap = (props) => {
	const [globalState,globalActions] = useGlobal()

	const center = {
		lat: -73.9130656659264,
		lng: 40.55849125972
	};
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: 'AIzaSyDeL9AfH6JB5TdYWWVH4WRoVmti-zFHM_g'
	})

	const [map, setMap] = React.useState(null)
	const [polygons, setPolygons] = React.useState([])
	const [polygonColor, setPolygonColor] = React.useState([])


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
								paths[i].push({ lat: parseFloat(coord[k][0]), lng: parseFloat(coord[k][1]) })

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
		console.log(this.color)
		this.setOptions({ fillColor: "Blue" });
		props.mapper(this.polygonKey, true)
	}
	function handleMouseOut(e) {
		this.setOptions({ fillColor: "#FF0000" });
		props.mapper(this.polygonKey, false)
	}
	const polygonsArray = []
	const onLoadPoly = useCallback(
		polygon => {
			polygonsArray.push(polygon)
			setPolygons(polygonsArray)
		},
		[]
	);
	useEffect(()=>{
		console.log("ylla")
		showPolygonFromMap()
	},[globalState.hoveredPoly,polygonsArray])

	function showPolygonFromMap()  {
		let polyId = globalState.hoveredPoly
		if (polygons[polyId] != null){ 
		polygons[polyId].setOptions({fillColor: "Blue"})
		console.log("Dsdsdsdsds")
		console.log((polygons[polyId].fillColor))
		setMap(polygons[polyId])
		}
	}


	return isLoaded ? (
		
		
		<GoogleMap
			mapContainerStyle={containerStyle}
			center={center}
			zoom={10}
			onLoad={onLoad}
			onUnmount={onUnmount}
		>
			{coordinates()}

			{paths.slice(0, 10).map(
				path => {
					return <Polygon

						path={path}
						key={paths.indexOf(path) + 1}
						onMouseOver={handleMouseOver}
						onMouseOut={handleMouseOut}
						onUnmount={onUnmount}
						onLoad={onLoadPoly}

						options={{
							polygonKey: paths.indexOf(path) + 1,
							strokeColor: "#FF0000",
							strokeOpacity: 0.8,
							strokeWeight: 2,
							fillColor: "#FF0000",
							fillOpacity: 0.35,
							draggable: true,
							geodesic: true,
						}}

						onClick={() => {
							console.log(paths.indexOf(path))
						}}
					/>
				}

			)}


		</GoogleMap>
	) : <></>
}




export { SimpleMap};