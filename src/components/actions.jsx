export const setPoly = (globalState, payload) =>{
    globalState.setState({hoveredPoly: payload})

}

export const changeColorForPoly = (globalState,id,payload) =>{
    let colors = [...globalState.polygonsColors];
    colors[id] = {...colors[id], payload};
    globalState.setState({ colors });
}

export const addColorForPoly = (globalState, payload) => { 
    const color = payload 
    console.log("color"+payload)
    const list = [{...globalState.polygonsColors}, color];
   globalState.setState({polygonsColors: list})
}