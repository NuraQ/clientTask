import './table.css'


function update() {
	console.log("clicked")
}
function select(id, show) {
	var row = document.getElementById(id)
	if (show) {
		row.style = "background-color: blanchedalmond";
	} else {
		row.style = "background-color: white";

	}
}
const RenderTable = (props) => {
	const list = props.properties.map(ele =>
		<tr key={ele.OBJECTID} id={ele.OBJECTID}>
			<td >{ele.OBJECTID}</td>
			<td>{ele.Shape__Area}</td>
			<td>{ele.Shape__Length}</td>
			<td><button onClick={e => alert(e.target.value)} >Update</button></td>
		</tr>


	)
	return (
		<table>
			<tbody>
				{list}
			</tbody>
		</table>
	)
}
export { RenderTable, select }
