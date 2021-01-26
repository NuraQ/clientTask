import { useEffect } from "react";

export const setPoly = (globalState, payload) =>{
    globalState.setState({hoveredPoly: payload})

}

export const changeColorForPoly = (globalState, id, payload) =>{
    let colors = [...globalState.state.polygonsColors];
    colors[id] = {...colors[id], payload};
    globalState.setState({polygonsColors: colors });
}

export const addColorForPoly = (globalState, payload) =>{
    const list = [...globalState.state.polygonsColors, payload];
   globalState.setState({polygonsColors: list})

}

export const addNameForPoly = (globalState, payload) =>{
    const list = [...globalState.state.polygonsNames, payload];
   globalState.setState({polygonsNames: list})

}

export const changeNameForPoly = (globalState, id, payload) =>{
    let names = [...globalState.state.polygonsNames];
    names[id] = {...names[id], payload};
    globalState.setState({polygonsNames: names });
}