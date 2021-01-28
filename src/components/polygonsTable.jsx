
import { useEffect, useState, useRef } from 'react';
import './table.css';
import useGlobal from './globalState';


function select(id, show) {
	var row = document.getElementById(id)
	var sty = row.style
	if (show) {
		row.style = "background-color: blanchedalmond";
	} else {
		row.style = "background-color: `${sty}`";

	}
}


const RenderTable = (props) => {
	const changedRow = useRef(null);
	const [globalState, globalActions] = useGlobal()
	const list = props.properties.slice(0, 10).map((ele, index) =>
		<tr onMouseOver={() => { ShowPolygonfromMap(ele.OBJECTID) }} key={ele.OBJECTID} id={ele.OBJECTID}>
			<td >{ele.OBJECTID}</td>
			<td>{ele.Shape__Area}</td>
			<td>{ele.Shape__Length}</td>
			<td><input defaultValue={globalState.polygonsColors[ele.OBJECTID]} id={ele.OBJECTID} onChange={updateColor}></input></td>
			<td><input defaultValue={globalState.polygonsNames[ele.OBJECTID]}  id={ele.OBJECTID} onChange={updateName}></input></td>
		</tr>

	)
	function updateColor(e) {
		changedRow.current = {val: e.target.value, id: e.target.id}
	}
	function updateName(e) {
		globalActions.changeNameForPoly( e.target.id, e.target.value )
	}
	useEffect(() => {
		if (changedRow.current != null) {
			globalActions.changeColorForPoly(changedRow.current.id, changedRow.current.val)
		}
	}, [changedRow.current])

	function ShowPolygonfromMap(id) {
		globalActions.setPoly(id)
	}

	return (
		<div>
			<table>
				<tr className = "Header"><th>
					ID
					</th>
				<th>
					shape area
					</th>
				<th>
					shape Length
					</th>
				<th>
					shape Color
					</th>
					<th>
					shape name
					</th></tr>
				<tbody>
					{list}
				</tbody>
			</table>
		</div>

	)
}
export { RenderTable, select }