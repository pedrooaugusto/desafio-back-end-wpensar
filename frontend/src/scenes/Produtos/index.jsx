import React from 'react';
import * as Authorization from '../../Api/Authorization';
import * as ProdutosApi from '../../Api/Produto';
import {withStyles} from 'material-ui/styles';
import HeaderBar from '../components/HeaderBar';
import Modal from '../components/Modal';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Icon from 'material-ui/Icon';
import FormProduto from './components/FormProduto';

const styles = {
	produtoView:{
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


class Produtos extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			confirm: false,
			loading: false,
			formProduto: false,
			formProdutoMode: 'show',
			produtos: [],
			displayedProduto: {},
			fatalError: false
		}
	}

	async componentWillMount (props, state){
		if(!Authorization.getToken())
			this.props.history.push('/');

		this.setState({loading: true});
		this.list();
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
		const fn = () => ProdutosApi.list();
		this.handleError(fn, r => {
			this.setState({produtos: r.produtos, loading: false});
		});
	}

	save = async (e) => {
		e.preventDefault();
		this.setState({formProduto: false, loading: true});
		const fn = () => ProdutosApi.save(this.state.displayedProduto);
		this.handleError(fn);
	}

	remove = async (e) => {
		e.preventDefault();
		this.setState({loading: true, confirm: false});

		const fn = () => ProdutosApi.remove(this.state.displayedProduto.id);
		this.handleError(fn);
	}

	edit = async (e) => {
		e.preventDefault();
		this.setState({loading: true, formProduto: false});
		const fn = () => ProdutosApi.edit(this.state.displayedProduto.id, this.state.displayedProduto);
		this.handleError(fn);
	}

	logOut = () => {
		Authorization.clearToken();
		this.props.history.push('/');
	}

	closeConfirm = () => {
		this.setState({confirm: false});
	}

	openConfirm = displayedProduto => () => {
		this.setState({
			confirm: true,
			displayedProduto
		});
	}

	closeFormProduto = () => {
		this.setState({formProduto: false});
	}

	openFormProduto = (mode) => (produto) => () => {
		this.setState({
			formProduto: true, 
			formProdutoMode: mode, 
			displayedProduto: produto
		});
	}

	setName = (evt) => {
		const k = evt.target.value;
		this.setState(prevState => ({
			displayedProduto:{
			...prevState.displayedProduto,
			nome: k
		}}))
	}

	render(){
		const {classes} = this.props;
		return(
			<div className = {classes.produtoView}>
				<HeaderBar auth = {true} logOut = {this.logOut}/>
				<Grid container spacing = {0} justify = "center">
					<Grid item xs = {12} md = {8} style = {{marginTop: '15px'}}>
						<Grid container spacing = {8}>
							<Grid item xs = {12}>
								<Typography variant = "headline" style = {{fontSize: '2.2rem'}}>Produtos</Typography>
								<Typography variant = "subheading">
									Criar, alterar, excluir e visualizar produtos.
								</Typography>
							</Grid>
							<Grid item md = {12}>
								<Button 
									color = "primary" 
									onClick = {this.openFormProduto('insert')({id: 0, nome: ''})}
									variant = "raised">
									Novo
								</Button>
							</Grid>
							<Grid item md = {12}>
								<Paper style = {{marginTop: '15px'}}>
									<Table>
										<TableHead>
											<TableRow>
												<TableCell>Nome</TableCell>
												<TableCell></TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{this.state.produtos.map((a, b) => (
												<TableRow key = {b}>
													<TableCell>
														<Typography variant = "subheading">{a.nome}</Typography>
													</TableCell>
													<TableCell className = {classes.rowRight}>
														<Button 
															variant = "fab"
															className = {classes.actionBtn}
															style = {{background: '#2196f3'}}
															onClick = {this.openFormProduto('show')(a)}
															color = "primary"
															aria-label = "show">
	        												<Icon>menu</Icon>
	      												</Button>											
														<Button 
															variant = "fab"
															className = {classes.actionBtn}
															style = {{background: '#ff9800'}}
															onClick = {this.openFormProduto('edit')(a)}
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
					title = "Confirmar"
					message = "Deseja realmente excluir este Produto ?"
					type = "confirm"
					action = {this.remove}
					open = {this.state.confirm}
					onClose = {this.closeConfirm}/>
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
				
				<FormProduto
					open = {this.state.formProduto}
					onClose = {this.closeFormProduto}
					mode = {this.state.formProdutoMode}
					setName = {this.setName}
					actionSave = {this.save}
					actionEdit = {this.edit}
					produto = {this.state.displayedProduto}/>
			</div>
		);
	}
}

export default withStyles(styles)(Produtos);