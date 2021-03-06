
  
import React, { useState, useEffect } from 'react';

import { SimpleMap } from './components/Map/map'
import useGlobal from './components/store/globalState';
 
import { RenderTable, select } from './components/PolygonsTable/polygonsTable'


export default function Controller() {
    const [properties, setProperties] = React.useState([]);
    const [globalState,globalActions] = useGlobal();
    const colors = [  "AliceBlue",
    "Aqua",  "Aquamarine",
    "BlanchedAlmond","BlueViolet",
    "Brown","BurlyWood",
    "DarkGreen","DarkKhaki",
    "DarkMagenta",  "DarkOliveGreen",
    "DarkOrange",
    "DarkOrchid","DarkRed",
    "DarkSalmon",  "DarkSeaGreen",
    "DarkSlateBlue","DarkSlateGrey",
    "DarkTurquoise", "DarkViolet",
    "DeepPink",
    "Gold",  "GoldenRod",
    "Green","HotPink",
    "IndianRed", "Indigo",
    "Ivory", "Khaki",
    "LavenderBlush",  "LawnGreen",
    "LemonChiffon",   "LightBlue",
    "LightCoral", "LightCyan",
    "LightGoldenRodYellow",  "LightGray",
    "LightGrey","LightGreen",
    "LightPink", "LightSalmon",
    "LightSeaGreen","LightSkyBlue",
    "LightSlateGray", "LightSlateGrey",
    "LightSteelBlue", "LightYellow",
    "Lime","LimeGreen",
    "Linen", "Magenta",
    "Maroon", "MediumAquaMarine",
    "MediumBlue", "MediumOrchid",
    "MediumPurple","MediumSeaGreen",
    "MediumSlateBlue","MediumSpringGreen",
    "MediumTurquoise", "MediumVioletRed",
    "MidnightBlue", 
    "MistyRose","Moccasin",
    "NavajoWhite",  "Navy",
    "OliveDrab","Orange",
    "OrangeRed","Orchid",
    "PaleGoldenRod","PaleGreen",
    "PaleTurquoise","PaleVioletRed",
    "PapayaWhip","PeachPuff",
     "Peru", "Pink", 
    "Purple","RebeccaPurple",
    "Red","RosyBrown",
    "RoyalBlue","SaddleBrown",
    "Salmon", "SandyBrown",
    "SeaGreen","SeaShell",
    "SkyBlue","SlateBlue",
    "SlateGray","SlateGrey",
    "SteelBlue",  "Tan",
    "Teal", "Thistle",
    "Tomato","Turquoise",
    "Violet","Wheat",
"Yellow","YellowGreen",
  ];
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
                        globalActions.setAllPolys(json.features);
                        console.log("AL;", globalState.allPolygonsData);

                    })
                }
            })
        }
        fetchData();
    }, []);

    useEffect(() => {
        setPropertiesTable();
    }, [globalState.allPolygonsData])

    useEffect(() => {
        appendNewDrawnPolygonsToTable();    
        }, [globalState.polygonAddedToMap]);

    function setPropertiesTable() {
        globalActions.addColorForPoly();
        const propertiesData = [];
        globalState.allPolygonsData.forEach(property => {
            let colorr = colors[Math.floor(Math.random() * colors.length)];
            let namee = names[Math.floor(Math.random() * names.length)];
            propertiesData.push({properties: property.properties, color: colorr, name: namee});
        });
        setProperties(propertiesData);
    }

    function appendNewDrawnPolygonsToTable(){
        if (globalState.PolygonAddedToMap != null){        
        let newTable = [...properties,[globalState.PolygonAddedToMap]];
        let color = colors[Math.floor(Math.random() * colors.length)];
        globalActions.addColorForPoly(color);
        setProperties(newTable);
        }
    }
    function displayInTable(id, show) {
        select(id, show);
    }

    return (
        <div >
            <div style ={{display: "flex"}} >
                <div ><SimpleMap pos={globalState.allPolygonsData} colors = {properties}  mapper={displayInTable} /></div>
                <div ><RenderTable properties = {properties}></RenderTable></div>
            </div>
        </div>
    );

}
