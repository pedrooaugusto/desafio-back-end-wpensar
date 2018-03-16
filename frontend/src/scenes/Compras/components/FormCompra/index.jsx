import React from 'react';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/Menu/MenuItem';

// import './styles.css';

import Dialog, {
	DialogActions,
	DialogContent,
	DialogTitle,
} from 'material-ui/Dialog';


const TEXTS = {
	edit:{
		title: 'Alterar Compra',
		sub: 'Alterar informações da compra',
		btnTxt: 'Alterar'
	},
	insert:{
		title: 'Cadastrar Compra',
		sub: 'Cadastrar uma nova compra',
		btnTxt: 'Inserir'
	},
	show:{
		title: 'Ver Compra',
		sub: 'Exibir informações da compra'
	}
};

const styles = {

};

class FormCompra extends React.Component{

	calcTotalPrice = (evt) => {
		const quant = parseInt(this.props.compra.quantidade, 10);
		const price = parseInt(this.props.compra.preco, 10);
		const tot = (price / quant).toFixed(2);
		this.props.updateForm('preco_medio')({target: {value: tot}});
	}

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
		          				<Grid container spacing = {8}>
		          					<Grid item md = {12} xs = {12}>
		          						<TextField
									        id = "produto"
									        select
									        label = "Produto"
									        value = {this.props.compra.produto}
									        helperText = "Selecione o produto"
									        onChange = {this.props.updateForm('produto')}
									        required
									        margin = "normal"
									        fullWidth>
									        	{this.props.produtos.map((a, b) => (
									            	<MenuItem key = {1} value = {a.id}>
									              		{a.nome}
									            	</MenuItem>
									            ))}
								   		</TextField>
		          					</Grid>
{/*		          					<Grid item md = {12} xs = {12}>
		          						<TextField
										    id = "data"
										    label = "Data"
										    margin = "none"
										    inputProps = {{readOnly: true}}
										    readOnly = {true}
										    value = {new Date(this.props.compra.data).toLocaleString('pt-br')}
										    helperText = "Data de compra"
											fullWidth/>
		          					</Grid>*/}
		          					<Grid item md = {12} xs = {12}>
		          						<TextField
										    id = "preco"
										    label = "Preço"
										    margin = "none"
										    type = 'number'
										    onChange = {this.props.updateForm('preco')}
										    value = {this.props.compra.preco}
										    helperText = "Preço total da compra"
										    required
											fullWidth/>
		          					</Grid>
		          					<Grid item md = {12} xs = {12}>
		          						<TextField
										    id = "quanti"
										    label = "Quantidade"
										    margin = "none"
										    type = 'number'
										    inputProps = {{
										    	step: 1,
										    	min: 1
										    }}
										    onBlur = {this.calcTotalPrice}
										    onChange = {this.props.updateForm('quantidade')}
										    value = {this.props.compra.quantidade}
										    helperText = "Quantas unidades deste produto"
										    required
											fullWidth/>
		          					</Grid>
		          					<Grid item md = {12} xs = {12}>
		          						<TextField
										    id = "preco-medio"
										    label = "Preço Médio"
										    margin = "none"
										    type = 'number'
										    onChange = {this.props.updateForm('preco_medio')}
										    value = {this.props.compra.preco_medio}
										    helperText = "Preço médio por produto"
										    inputProps = {{
										    	readOnly: true,
										    	step: 0.01
										    }}
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

export default withStyles(styles)(FormCompra);