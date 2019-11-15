import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Processor
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register(props) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange = {props.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange = {props.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmpassword"
                autoComplete="current-password"
                onChange = {props.handleChange}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick ={props.handleRegister}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link onClick ={props.onCancelClick} variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}


// import React, {Component} from 'react';
// import { Container,Button,Form, Input} from 'semantic-ui-react'
//
// class Register extends Component {
//
//   render(){
//     return (
//       <div className ="Register">
//       <Container style={{display:'block',width:'400px', marginTop:"200px", justifyContent:'center', alignItems:'center', height:'500px'}}>
//         <h2 style={{display:'flex', justifyContent:'center'}}> Register your account</h2>
//         <Input  style={{display:'flex', padding:'10px'}}
//         placeholder="Type in Email" name="email" onChange = {this.props.handleChange}></Input>
//         <Input  style={{display:'flex', padding:'10px'}}
//         placeholder="Type in Password" type="password" name="password" onChange = {this.props.handleChange}></Input>
//         <Input style={{display:'flex', padding:'10px'}}
//         placeholder="Confirm Password" type="password" name="confirmPassword" onChange = {this.props.handleChange}></Input>
//           <div style={{display:'flex', justifyContent:'center'}}>
//             <Button basic color='olive'style={{width:'190px'}} onClick ={this.props.handleRegister}>Register</Button>
//             <Button  basic color='teal' style={{width:'190px'}} onClick ={this.props.onCancelClick}>Cancel</Button>
//           </div>
//       </Container>
//       </div>
//     )
//   }
//
// }
//
// export default Register;
