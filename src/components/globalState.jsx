import React from 'react';
import globalHook from "use-global-hook";

import * as actions from "./actions";

const initialState = {
    hoveredPoly: 0,
    
}

const useGlobal = globalHook(React,initialState,actions)
export default useGlobal