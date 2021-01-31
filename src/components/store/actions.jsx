
export const setPoly = (globalState, payload) =>{
    globalState.setState({hoveredPoly: payload})

}

export const setAllPolys = (globalState, payload) =>{
    globalState.setState({allPolygonsData: payload });
}

export const changeColorForPoly = (globalState, id, payload) =>{
    let colors = [...globalState.state.polygonsColors];
    colors[id] = payload
    globalState.setState({polygonsColors: colors });
}

export const addColorForPoly = (globalState, payload) =>{
    const list = [...globalState.state.polygonsColors, payload];
   globalState.setState({polygonsColors: list});

}

export const addNameForPoly = (globalState, payload) =>{
    const list = [...globalState.state.polygonsNames, payload];
   globalState.setState({polygonsNames: list});
}

export const changeNameForPoly = (globalState, id, payload) =>{
    let names = [...globalState.state.polygonsNames];
    names[id] = payload;
    globalState.setState({polygonsNames: names });
}
export const addNewPoly = (globalState, payload) => {
    globalState.setState({polygonAddedToMap: payload})
    console.log(globalState.state.polygonAddedToMap)
}
export const removePoly = (globalState, payload) => {
    const names = [...globalState.state.polygonsNames]
    names.splice(payload, 1);
    globalState.setState({polygonsNames: names });

    const colors = [...globalState.state.polygonsColors]
    colors.splice(payload, 1);
    globalState.setState({polygonsColors: colors });

    const allPolys = [...globalState.state.allPolygonsData]
    allPolys.splice(payload, 1);
    globalState.setState({allPolygonsData: allPolys });
}