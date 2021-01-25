import { useEffect, useState } from 'react';
import './table.css'
import { countDown, countUp } from './globalState';
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
	const [globalState, globalActions] = useGlobal()
	const list = props.properties.slice(0, 10).map(ele =>
		<tr onMouseOver={() => { ShowPolygonfromMap(ele.OBJECTID) }} key={ele.OBJECTID} id={ele.OBJECTID}>
			<td >{ele.OBJECTID}</td>
			<td>{ele.Shape__Area}</td>
			<td>{ele.Shape__Length}</td>
			<td><button onClick={e => alert(e.target.value)} >Update</button></td>
		</tr>
	)
	function ShowPolygonfromMap(id) {
		globalActions.setPoly(id)
	}

	return (
		<table>
			<tbody>
				{list}
			</tbody>
		</table>
	)
}
export { RenderTable, select }
