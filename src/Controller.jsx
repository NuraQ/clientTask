import React, { useState, useEffect } from 'react';

import { SimpleMap } from './components/map'
import { createGlobalState } from 'react-hooks-global-state';

import { RenderTable } from './components/polygonsTable'
import { select } from './components/polygonsTable'


export default function Controller() {
    const [featuresData, setFeatures] = React.useState([])
    const [properties, setProperties] = React.useState([])
    const initialState = {polyToShow: 0}
    const { useGlobalState } = createGlobalState(initialState);
    const [polyId, setPoly] = useGlobalState('polyToShow');

    useEffect(() => {
        // Update the document title using the browser API
        function fetchData() {
            fetch('https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/NYC_Election_Districts_Water_Included/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=pgeojson', {
                // mode: 'no-cors',
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                },
            },
            ).then(response => {
                if (response.ok) {
                    response.json().then(json => {
                        setFeatures(json.features)
                    })
                }
            })
        }
        fetchData();

    }, []);

    useEffect(() => {
        setPropertiesTable()
    }, [featuresData])

    function setPropertiesTable() {
        const propertiesData = [];
        featuresData.forEach(property => {
            propertiesData.push(property.properties)
        });
        setProperties(propertiesData);
        console.log(properties)
    }

    function displayInMap(id){
       // shoaw()
    }
    function displayInTable(id, show) {
       // console.log(RenderTable.select+"DDDDDDD")
        select(id, show)
    }

    return (
        <div >
            <div style ={{display: "flex"}} >
                <div ><SimpleMap pos={featuresData} mapper={displayInTable} /></div>
                <div ><RenderTable properties = {properties} ></RenderTable></div>

            </div>
        </div>
    );

}