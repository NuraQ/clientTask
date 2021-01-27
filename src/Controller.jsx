
  
import React, { useState, useEffect } from 'react';

import { SimpleMap } from './components/map'
import useGlobal from './components/globalState';
 
import { RenderTable } from './components/polygonsTable'
import { select } from './components/polygonsTable'


export default function Controller() {
    const [featuresData, setFeatures] = React.useState([])
    const [properties, setProperties] = React.useState([])
    const [globalState,globalActions] = useGlobal();


    const colors = ["#FFE4C4","#5F9EA0","#008B8B","#006400","#556B2F","#ADD8E6","#F5F5F5","#F0F8FF","#B22222"]
    const names = [  "Bruce","Cook",
    "Carolyn","Morgan",
    "Albert","Walker",
    "Randy","Reed",
    "Larry","Barnes",
    "Lois","Wilson",
    "Jesse","Campbell",
    "Ernest","Rogers",
    "Theresa","Patterson",
    "Henry","Simmons",
    "Michelle","Perry",
    "Frank","Butler",
    "Shirley"]

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

        globalActions.addColorForPoly()
        const propertiesData = [];
        featuresData.forEach(property => {
            propertiesData.push(property.properties);
            let color = colors[Math.floor(Math.random() * colors.length)];
            let name = names[Math.floor(Math.random() * names.length)];
            globalActions.addColorForPoly(color);
            globalActions.addNameForPoly(name)

        });
        setProperties(propertiesData);
    }

    function displayInTable(id, show) {
        select(id, show);
    }

    return (
        <div >
            <div style ={{display: "flex"}} >
                <div ><SimpleMap pos={featuresData} mapper={displayInTable} /></div>
                <div ><RenderTable properties = {properties}></RenderTable></div>
            </div>
        </div>
    );

}
