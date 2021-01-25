export const setPoly = (globalState, payload) =>{
    console.log("payload"+payload)
    globalState.setState({hoveredPoly: payload})

}

export const changeColorForPoly = (globalState,id,payload) =>{
    let colors = [...globalState.polygonsColors];
    colors[id] = {...colors[id], payload};
    globalState.setState({ colors });
}

export const addColorForPoly = (globalState,payload) =>{
    const list = [...globalState.polygonsColors, payload];
    globalState.setState({list})
}