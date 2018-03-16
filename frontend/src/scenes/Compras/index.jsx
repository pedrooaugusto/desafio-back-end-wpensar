import React from 'react';

import * as Authorization from '../../Api/Authorization';
import * as ProdutosApi from '../../Api/Produto';
import * as ComprasApi from '../../Api/Compras';

import {withStyles} from 'material-ui/styles';
import HeaderBar from '../components/HeaderBar';
import Modal from '../components/Modal';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Icon from 'material-ui/Icon';
import FormCompra from './components/FormCompra';


const styles = {
	compraView:{
		flex: 1
	},
	actionBtn:{
		width: '35px',
		height: '35px',
		marginLeft: '5px',
		marginRight: '5px'
	},
	rowRight:{
		textAlign: 'right'
	}
};

class Compras extends React.Component{
	constructor(props){
		super();
		this.state = {
			confirm: false,
			loading: true,
			formCompra: false,
			formCompraMode: 'show',
			compras: [],
			produtos: [],
			displayedCompra: {
				produto: 1,
				data: new Date(),
				preco: 0.0,
				quantidade: 1,
				preco_medio: 1
			},
			fatalError: false
		}


		//init
		if(!Authorization.getToken())
			props.history.push('/');
		this.list_produto();
		this.list();
	}

	// async componentWillMount (props, state){
	// 	// if(!Authorization.getToken())
	// 	// 	this.props.history.push('/');

	// 	// this.setState({loading: true});
	// 	// await this.list();
	// 	// await this.list_produto();
	// }

	make_new(){
		return {
			produto: 1,
			data: new Date(),
			preco: 1,
			quantidade: 1,
			preco_medio: 1
		};
	}

	async handleError(fn, cb){
		const r = await fn();
		if(r.error && r.code === 401)
			return this.props.history.push('/');
		else if(r.error)
			return this.setState({loading: false, fatalError: true});
		if(cb)
			return cb(r);
		else
			return this.list();
	}

	async list(){
		const fn = () => ComprasApi.list();
		this.handleError(fn, r => {
			this.setState({compras: r.compras, loading: false});
		});
	}

	async list_produto(){
		const fn = () => ProdutosApi.list();
		this.handleError(fn, r => {
			this.setState({produtos: r.produtos, loading: false});
		});
	}

	save = async (e) => {
		e.preventDefault();
		this.setState({formCompra: false, loading: true});
		const fn = () => ComprasApi.save(this.state.displayedCompra);
		this.handleError(fn);
	}

	remove = async (e) => {
		e.preventDefault();
		this.setState({loading: true, confirm: false});

		const fn = () => ComprasApi.remove(this.state.displayedCompra.id);
		this.handleError(fn);
	}

	edit = async (e) => {
		e.preventDefault();
		this.setState({loading: true, formCompra: false});
		const fn = () => ComprasApi.edit(this.state.displayedCompra.id, this.state.displayedCompra);
		this.handleError(fn);
	}

	logOut = () => {
		Authorization.clearToken();
		this.props.history.push('/');
	}

	closeConfirm = () => {
		this.setState({confirm: false});
	}

	openConfirm = displayedCompra => () => {
		this.setState({
			confirm: true,
			displayedCompra
		});
	}

	closeFormCompra = () => {
		this.setState({formCompra: false});
	}

	openFormCompra = (mode) => (compra) => () => {
		this.setState({
			formCompra: true, 
			formCompraMode: mode, 
			displayedCompra: compra
		});
	}

	handleFormChange = (field) => (evt) => {
		const k = evt.target.value;
		this.setState(prevState => ({
			displayedCompra:{
			...prevState.displayedCompra,
			[field]: k
		}}))
	}
	render(){
		const {classes} = this.props;
		const map_prod = [];
		for(let prod of this.state.produtos)
			map_prod[prod.id] = prod.nome;
		return (
			<div className = {classes.compraView}>
				<HeaderBar auth = {true} size = {10} logOut = {this.logOut}/>
				<Grid container spacing = {0} justify = "center">
					<Grid item xs = {12} md = {10} style = {{marginTop: '15px'}}>
						<Grid container spacing = {24}>
							<Grid item xs = {12}>
								<Typography variant = "headline" style = {{fontSize: '2.2rem'}}>Compras</Typography>
								<Typography variant = "subheading">
									Criar, alterar, excluir e visualizar compras.
								</Typography>
							</Grid>
							<Grid item md = {12}>
								<Button 
									color = "primary" 
									onClick = {this.openFormCompra('insert')(this.make_new())}
									variant = "raised">
									Novo
								</Button>
							</Grid>
							<Grid item md = {12}>
								<Paper style = {{marginTop: '15px'}}>
									<Table>
										<TableHead>
											<TableRow>
												<TableCell>Produto</TableCell>
												{/*<TableCell>Data</TableCell>*/}
												<TableCell>Quantidade</TableCell>
												<TableCell>Preço de Compra</TableCell>
												<TableCell>Preço Médio</TableCell>
												<TableCell></TableCell>
												<TableCell></TableCell>
												<TableCell></TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{this.state.compras.map((a, b) => (
												<TableRow key = {b}>
													<TableCell>
														<Typography variant = "subheading">
															{/*{this.state.produtos.find(c => c.id === a.produto).nome}*/}
															{map_prod[a.produto]}
														</Typography>
													</TableCell>
{/*													<TableCell>
														<Typography variant = "subheading">{new Date(a.data).toLocaleString('pt-br').substr(0, 10)}</Typography>
													</TableCell>*/}
													<TableCell>
														<Typography variant = "subheading">{a.quantidade} uni</Typography>
													</TableCell>
													<TableCell>
														<Typography variant = "subheading">R$ {a.preco}</Typography>
													</TableCell>
													<TableCell>
														<Typography variant = "subheading">R$ {a.preco_medio.toFixed(2)}</Typography>
													</TableCell>
													<TableCell className = {classes.rowRight}>
														<Button 
															variant = "fab"
															className = {classes.actionBtn}
															style = {{background: '#2196f3'}}
															onClick = {this.openFormCompra('show')(a)}
															color = "primary"
															aria-label = "show">
	        												<Icon>menu</Icon>
	      												</Button>											
														<Button 
															variant = "fab"
															className = {classes.actionBtn}
															style = {{background: '#ff9800'}}
															onClick = {this.openFormCompra('edit')(a)}
															color = "primary"
															aria-label = "edit">
	        												<Icon>edit_icon</Icon>
	      												</Button>
														<Button 
															variant = "fab"
															className = {classes.actionBtn}
															style = {{background: '#f44336'}}
															color = "primary"
															onClick = {this.openConfirm(a)}
															aria-label = "delete_forever">
	        												<Icon>delete_forever</Icon>
	      												</Button>
													</TableCell>													
												</TableRow>
											))}
										</TableBody>
									</Table>
								</Paper>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<Modal 
					open = {this.state.loading}
					onClose = {() => {}}
					title = "Carregando"
					type = "load"
					message = "Carregando, por favor, aguarde."/>
				
				<Modal 
					open = {this.state.fatalError}
					onClose = {() => {this.setState({fatalError: false})}}
					title = "Fatal Error"
					type = "info"
					message = "Something went too F** wrong... Probably you broke !it"/>
				<Modal
					title = "Confirmar"
					message = "Deseja realmente excluir esta Compra ?"
					type = "confirm"
					action = {this.remove}
					open = {this.state.confirm}
					onClose = {this.closeConfirm}/>
				<FormCompra
					open = {this.state.formCompra}
					mode = {this.state.formCompraMode}
					updateForm = {this.handleFormChange}
					compra = {this.state.displayedCompra}
					actionSave = {this.save}
					actionEdit = {this.edit}
					produtos = {this.state.produtos}
					onClose = {this.closeFormCompra}/>
			</div>
		);
	}
}

export default withStyles(styles)(Compras);