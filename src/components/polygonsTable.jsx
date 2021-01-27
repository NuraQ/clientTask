
import { useEffect, useState, useRef } from 'react';
import './table.css';
import useGlobal from './globalState';


function select(id, show) {
	var row = document.getElementById(id)
	if (show) {
		row.style = "background-color: blanchedalmond";
	} else {
		row.style = "background-color: transparent";

	}
}


const RenderTable = (props) => {
	const changedRow = useRef(null);
	const [globalState, globalActions] = useGlobal()
	const list = props.properties.slice(0, 10).map((ele, index) =>
		<tr onMouseOver={() => { ShowPolygonfromMap(ele.OBJECTID) }} key={ele.OBJECTID} id={ele.OBJECTID}>
			<td >{ele.OBJECTID}</td>
			<td><input defaultValue={ele.Shape__Area}  ></input></td>
			<td>{ele.Shape__Length}</td>
			<td><button onClick={e => alert(e.target.value)} >Update</button></td>
			<td><input defaultValue={globalState.polygonsColors[index]} id = {index} onChange={updateColor}></input></td>
			{/* <td><input defaultValue={globalState.polygonsNames[index]} id = {index} ></input></td> */}

		</tr>

	)
	function updateColor(e) {
		console.log("eeee", e.target.value)
		changedRow.current = {val: e.target.value,id: e.target.id}
	}
	useEffect(()=>{
		if (changedRow.current != null) {
		globalActions.changeColorForPoly(changedRow.current.id,changedRow.current.val)
		}
	},[changedRow.current])

	function ShowPolygonfromMap(id) {
		globalActions.setPoly(id)
	}

	useEffect(() => {
	}, [globalState.polygonsColors])

	return (
		<div>
			<table>
				<tbody>
					{list}
				</tbody>
			</table>
		</div>

	)
}
export { RenderTable, select }