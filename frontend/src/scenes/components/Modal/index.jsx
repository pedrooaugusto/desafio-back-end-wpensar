import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
	DialogActions,
	DialogContent,
	DialogTitle,
} from 'material-ui/Dialog';

import {LinearProgress} from 'material-ui/Progress';
import Typography from 'material-ui/Typography';

class Modal extends React.Component{
	render(){
		return(
			<Dialog
				open = {this.props.open}
          		onClose = {this.props.onClose}
          		disableBackdropClick = {this.props.type === 'load' ? true : false}
          		aria-labelledby = "alert-dialog-tite"
          		aria-describedby = "alert-dialog-description"
          		maxWidth = {"sm"}
          		>
          			{this.props.type === 'load' && <LinearProgress />}
          			<DialogTitle id = "alert-dialog-tite">{this.props.title}</DialogTitle>
          			<DialogContent>
          				<Typography variant = "subheading">
          					{this.props.message}
          				</Typography>
          			</DialogContent>
          			{this.props.type !== 'load' &&
          				<DialogActions>
          					{this.props.type !== 'info' &&
	          					<Button  
	          						color = "secondary"
	          						onClick = {this.props.action}>
	          							Excluir
	          					</Button>
	          				}
	          				<Button onClick = {this.props.onClose}>Fechar</Button>
	          			</DialogActions>
	          		}
			</Dialog>
		);
	}
}

export default Modal;