import React from 'react';
import globalHook from "use-global-hook";

import * as actions from "./actions";

const initialState = {
    hoveredPoly: 0,
    polygonsColors: [],
    polygonsNames: [],
    allPolygonsData: [],
    polygonAddedToMap: null
    
}

const useGlobal = globalHook(React,initialState,actions)
export default useGlobal
