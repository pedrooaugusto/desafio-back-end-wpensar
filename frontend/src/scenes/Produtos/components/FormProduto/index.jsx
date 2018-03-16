import React from 'react';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import './styles.css';

import Dialog, {
	DialogActions,
	DialogContent,
	DialogTitle,
} from 'material-ui/Dialog';


const TEXTS = {
	edit:{
		title: 'Alterar Produto',
		sub: 'Alterar informações do produto',
		btnTxt: 'Alterar'
	},
	insert:{
		title: 'Cadastrar Produto',
		sub: 'Cadastrar um novo produto',
		btnTxt: 'Inserir'
	},
	show:{
		title: 'Ver Produto',
		sub: 'Exibir informações do produto'
	}
};

const styles = {

};
class FormProduto extends React.Component{

	render(){
		const {classes, mode} = this.props;
		const action = mode === "insert" ? this.props.actionSave : this.props.actionEdit;
		return(
			<div className = {classes.formProduto}>
				<Dialog
					open = {this.props.open}
	          		onClose = {this.props.onClose}
	          		disableBackdropClick = {true}
	          		aria-labelledby = "alert-dialog-tite"
	          		aria-describedby = "alert-dialog-description"
	          		maxWidth = {"md"}>
	          			<form autoComplete = "off" onSubmit = {action}>
		          			<DialogTitle id = "alert-dialog-tite">
		          				{TEXTS[mode].title}
		          				<Typography>{TEXTS[mode].sub}</Typography>
		          			</DialogTitle>
		          			<DialogContent className = "oh-boy">
		          				<Grid container spacing = {0}>
		          					<Grid item md = {12} xs = {12}>
		          						<TextField
										    id = "nome"
										    label = "Nome"
										    margin = "none"
										    onChange = {this.props.setName}
										    inputProps = {{readOnly: mode === 'show'}}
										    readOnly = {true}
										    value = {this.props.produto.nome}
										    required
											helperText = "Nome do produto"
											fullWidth/>
		          					</Grid>
		          				</Grid>
		          			</DialogContent>
			          			<DialogActions>
			          				<Button onClick = {this.props.onClose}>Fechar</Button>
			          				{mode !== 'show' &&
			          				<Button 
			          					type = "submit" 
			          					color = "primary">
			          					{TEXTS[mode].btnTxt}
			          				</Button>}
			          		</DialogActions>
	          			</form>
	          	</Dialog>
			</div>
		);
	}
}

export default withStyles(styles)(FormProduto);