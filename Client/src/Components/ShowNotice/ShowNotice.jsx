import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom';
const columns = [
    { id: 'poster', label: 'Notice Poster', minWidth: 170 },
    { id: 'text', label: 'Notice Text', minWidth: 100 },
    {
        id: 'hostel',
        label: 'Hostel',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'expiry',
        label: 'Expires On',
        minWidth: 170,
        align: 'right',
    },

];

function createData(poster, text, hostel, expiry) {
    return { poster, text, hostel, expiry };
}
// const rows=[createData("fbhb","fjn","fjen","frr")]



const useStyles = makeStyles({
    root: {
        width: '60%',
        margin:'auto',
    },
    container: {
        maxHeight: 380,
        marginTop:'0.5rem'
    },
    title:{
        color:'white',
    },
    calendar: {
        background:'white',
        
    },
    ShowButton: {
        background: 'White',
        color: 'Black',
        // padding: '15px 15px 15px 15px',
        marginTop: '2rem',
        '&:hover': {
            background: "Black",
            color: "white",
            border: "1px solid white",
        }
    },
});

export default function StickyHeadTable() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const[data,setData] = useState([]);
    const [date,setDate] =useState(new Date().toISOString().slice(0, 10))
    const [isLoading,setLoading] =useState(false);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);

    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    
    useEffect(()=>{
        fetchData();
    },[data,date])

    


    const fetchData = async ()=>{
        try {
            setLoading(true)
            const res=await axios.get(`http://localhost:5000/notice/${date}`)
            setData(res.data.notice);
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }
    const rows= data.map(item=>createData(item.poster,item.description,item.hostel,item.expires_at))

    let history = useHistory();
    function noticeBoard() {
        history.push('/add');
    }
    
    return (
    
        <>
            <Typography variant="h2" className={classes.title}> NOTICES </Typography>

            <TextField className={classes.calendar}
            name={"date"}
            value={date}
            onChange={(e)=>setDate(e.target.value)}
                icon="lock"
                type="Date"
                helperText="Please select the date"

              />
               <Grid>
                <Button variant="contained" className={classes.ShowButton} onClick={noticeBoard}>
                    Add Notice
                </Button>
            </Grid>
            <Paper className={classes.root}>
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
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    );
}
