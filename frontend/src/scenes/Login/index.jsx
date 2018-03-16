import React, {Component} from 'react';
import HeaderBar from '../components/HeaderBar'; 
import Typography from 'material-ui/Typography';
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Modal from '../components/Modal';
import * as Authorization from '../../Api/Authorization';

const styles = {
	root:{
		flexGrow: 1
	},
	card:{
		padding: '15px',
		marginTop: '20px'
	}
};

class Login extends Component{

	state = {
		loading: false, 
		errorAuth: false,
		messageErrorAuth: ''
	};

	componentWillMount(props, state){
		if(Authorization.getToken())
			this.props.history.push('produtos');
	}

	auth = async (e) => {
		e.preventDefault();
		this.setState({loading: true});
		const res = await Authorization.createAuthorizationToken({
			username: this.username.value, 
			password: this.password.value
		});
		if(res.error)
			this.setState({
				loading: false,
				errorAuth: true,
				messageErrorAuth: res.errorText
			});
		else
			this.props.history.push('produtos');
	};

	closeErrorAuth = e => {
		this.setState({errorAuth: false});
	};

	render(){
		const {classes} = this.props;
		return(
			<div className = {classes.root}>
				<HeaderBar auth = {false}/>
				<Grid container spacing = {0} justify = "center">
					<Grid item md = {4} xs = {11}>
						<form autoComplete = "off" onSubmit = {this.auth}>
						<Paper className = {classes.card}>
							<Grid container spacing = {24}>
								<Grid item md = {12} xs = {12}>
									<Typography variant = "headline">Autenticação</Typography>
									<Typography variant = "subheading">Faça login para continuar.</Typography>
								</Grid>
								<Grid item md = {12} xs = {12}>
									<TextField
									    id = "username"
									    label = "Username"
									    margin = "none"
									    required
									    inputRef = {(username) => {this.username = username}}
										helperText = "Nome de usuário"
										fullWidth/>
								</Grid>
								<Grid item md = {12} xs = {12}>
									<TextField
									    id = "password"
									    label = "Password"
									    margin = "none"
									    required
									    inputRef = {(password) => {this.password = password}}
									    type = "password"
										helperText = "Senha"
										fullWidth/>
								</Grid>
								<Grid item md = {12} xs = {12}>
									<Button 
										variant = "raised" 
										color = "primary"
										type = "submit"
										fullWidth>
											Login
									</Button>
								</Grid>
							</Grid>
						</Paper>
						</form>
					</Grid>
				</Grid>
				<Modal 
					open = {this.state.loading}
					onClose = {() => {}}
					title = "Carregando"
					type = "load"
					message = "Carregando, por favor, aguarde."/>
				<Modal 
					open = {this.state.errorAuth}
					onClose = {this.closeErrorAuth}
					title = "Error"
					type = "info"
					message = {this.state.messageErrorAuth}/>
			</div>
		);
	}
}

export default withStyles(styles)(Login);