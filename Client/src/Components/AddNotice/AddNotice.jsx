import React, { useState } from 'react';
import {
    Grid,
    Card,
    CardContent,
    Button,
    TextField,
    MenuItem,
    Typography
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import axios from 'axios';


const hostels = [
    {
        value: 'H1',
        label: 'H1',
    },
    {
        value: 'H2',
        label: 'H2',
    },
    {
        value: 'H3',
        label: 'H3',
    },
    {
        value: 'H4',
        label: 'H4',
    },
];


const useStyles = makeStyles((theme) => ({
    title: {
        color: 'white',

    },
    form: {
        width: '100%', // Fix IE 11 issue.
        padding: '10px'
    },
    CardGrid: {
        margin: 'auto'

    },
    // Card: {
    //     marginTop: '5rem'
    // },
    dropdowns: {
        margrin: 'auto',
        padding: '5px'
    },
    AddButton: {
        background: 'black',
        color: 'white',
        padding: '15px 32px',
        '&:hover': {
            background: "white",
            color: "black"
        },



    },
    ShowButton: {
        background: 'White',
        color: 'Black',
        padding: '15px 15px 15px 15px',
        marginTop: '2rem',
        '&:hover': {
            background: "Black",
            color: "white",
            border: "1px solid white",
        }
    },
}))


const AddNotice = () => {
    const [form, setForm] = useState({
        poster: "",
        description: "",
        expires_at:new Date().toISOString().slice(0, 10),
        hostel: ""
    });
    const [isLoading,setLoading] =useState(false);
    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value

        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true)
            const submit = await axios.post("http://localhost:5000/notice", form)
            setForm({
                poster: "",
                description: "",
                expires_at: "",
                hostel: ""
            })
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error(error);
        }



    }
    let history = useHistory();
    function noticeBoard() {
        history.push('/show');
    }
    const classes = useStyles();
    return (
        <div>
            <Grid container>

                <Grid item xs={6} md={7} className={classes.CardGrid} >
                    <Typography variant="h1" className={classes.title}> NOTICE </Typography>
                    <Card className={classes.Card}>
                        <CardContent >

                            <form className={classes.form}>

                                <TextField
                                    fullWidth
                                    name="poster"
                                    value={form.poster}
                                    onChange={(event) => handleChange(event)}
                                    label="Notice Poster"
                                    type="text"


                                />

                                <TextField
                                    fullWidth
                                    name="description"
                                    value={form.description}
                                    onChange={(event) => handleChange(event)}
                                    label="Notice Text"
                                    icon="lock"
                                    type="text"

                                />
                                <TextField className={classes.dropdowns}
                                    name="expires_at"
                                    value={form.expires_at}
                                    onChange={(event) => handleChange(event)}
                                    icon="lock"
                                    type="Date"
                                />


                                <TextField className={classes.dropdowns}
                                    id="standard-select-currency"
                                    select
                                    name="hostel"
                                    value={form.hostel}
                                    onChange={(event) => handleChange(event)}
                                    helperText="Please select the hostel"
                                    variant="standard"
                                >
                                    {hostels.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <Grid>
                                    <Button variant="contained" type='submit' className={classes.AddButton} onClick={(event) => handleSubmit(event)}>
                                        Add Notice
                                    </Button>
                                </Grid>
                            </form>

                        </CardContent>
                    </Card>
                </Grid>


            </Grid>
            <Grid>
                <Button variant="contained" className={classes.ShowButton} onClick={noticeBoard}>
                    Show Notices
                </Button>
            </Grid>
        </div>
    );
};

export default AddNotice;