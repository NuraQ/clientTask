
import { useEffect, useState, useRef } from 'react';
import './table.css';
import useGlobal from '../store/globalState';
import { TablePagination, TableCell, Input, Button } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function select(id, show) {
	var row = document.getElementById(id)
	console.log("poly key", id)
	console.log("ROW", row)
	if (row != null) {
	var sty = row.style
	if (show) {
		row.style = "background-color: blanchedalmond";
	} else {
		row.style = "background-color: `${sty}`";

	}
}
}
const useStyles = makeStyles({
	root: {
		width: '100%',
	},
	container: {
		maxHeight: 440,
	},
});

const RenderTable = (props) => {

	const changedRow = useRef(null);
	const [globalState, globalActions] = useGlobal()
	const list = props.properties.map((ele, index) =>
		<tr onMouseOver={() => { ShowPolygonfromMap(ele.OBJECTID) }} key={ele.OBJECTID} id={ele.OBJECTID}>
			<td >{ele.OBJECTID}</td>
			<td>{ele.Shape__Area}</td>
			<td>{ele.Shape__Length}</td>
			<td><input defaultValue={globalState.polygonsColors[ele.OBJECTID]} id={ele.OBJECTID} onChange={updateColor}></input></td>
			<td><input defaultValue={globalState.polygonsNames[ele.OBJECTID]} id={ele.OBJECTID} onChange={updateName}></input></td>
		</tr>

	)
	function updateColor(e) {
		changedRow.current = { val: e.target.value, id: e.target.id }
	}
	function updateName(e) {
		globalActions.changeNameForPoly(e.target.id, e.target.value)
	}
	useEffect(() => {
		if (changedRow.current != null) {
			globalActions.changeColorForPoly(changedRow.current.id, changedRow.current.val)
		}
	}, [changedRow.current])

	function ShowPolygonfromMap(id) {
		globalActions.setPoly(id)
	}

	function deletePolygon(e){
		props.properties.splice(e.target.id,1)
		globalActions.removePoly(e.target.id)
	}
	const columns = [
		{ id: 'name', label: 'Name', minWidth: 170 },
		{ id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
		{
			id: 'population',
			label: 'Population',
			minWidth: 170,
			align: 'right',
			format: (value) => value.toLocaleString('en-US'),
		},
		{
			id: 'size',
			label: 'Size\u00a0(km\u00b2)',
			minWidth: 170,
			align: 'right',
			format: (value) => value.toLocaleString('en-US'),
		},
		{
			id: 'density',
			label: 'Density',
			minWidth: 170,
			align: 'right',
			format: (value) => value.toFixed(2),
		},
	];

	const useStyles = makeStyles({
		root: {
			width: '100%',
		},
		container: {
			maxHeight: 440,
		},
	});
	const classes = useStyles();
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};


	return (
		<Paper className={classes.root} >

			<TableContainer className={classes.container}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth }}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{props.properties.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
							return (
								<TableRow hover onMouseOver={() => { ShowPolygonfromMap(row.OBJECTID) }} role="checkbox" tabIndex={-1} key={row.OBJECTID} id = {row.OBJECTID}>
									<TableCell >
										{row.OBJECTID}
									</TableCell>
									<TableCell >
										{row.Shape__Length}
									</TableCell>
									<TableCell >
										{row.Shape__Length}
									</TableCell>
									<TableCell >
										<Input
											defaultValue={globalState.polygonsColors[row.OBJECTID]}
											onChange={updateColor}
											className={classes.input}
											 id={row.OBJECTID}
										/>
									</TableCell>
									<TableCell >
										<Input
											defaultValue={globalState.polygonsNames[row.OBJECTID]}
											onChange={updateName}
											className={classes.input}
											 id={row.OBJECTID}
										/>
									</TableCell>
									<TableCell>
										<Button style = {{backgroundColor:"red"}} id={row.OBJECTID} onClick = {deletePolygon}>delete</Button>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={props.properties.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</Paper>
	)
}
export { RenderTable, select }
