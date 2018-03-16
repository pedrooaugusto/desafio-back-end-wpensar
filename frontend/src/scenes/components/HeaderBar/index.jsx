import React, {Component} from 'react';
import {Link} from 'react-router-dom'

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';

import compose from 'recompose/compose';
import Hidden from 'material-ui/Hidden';
import withWidth from 'material-ui/utils/withWidth';

import Button from 'material-ui/Button';

import Typography from 'material-ui/Typography';
import {withStyles} from 'material-ui/styles';


import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import Menu, { MenuItem } from 'material-ui/Menu';

import Grid from 'material-ui/Grid';

const styles = {
	root: {
		flexGrow: 1
	},
	brandLogo: {
		flex: '1'
	},
	barLink:{
		color: 'white',
		textDecoration: 'none'
	}
};

const MobileMenu = props => {
	return (
		<div>
			<IconButton
	            aria-owns = {props.open ? 'menu-appbar' : null}
	            aria-haspopup = "true"
	            onClick = {props.handleMenu}
	            color = "inherit">
	                  <Icon>menu</Icon>
	        </IconButton>
	        <Menu
	        	id = "menu-appbar"
	        	anchorEl = {props.anchorEl}
	        	anchorOrigin = {{
	            	vertical: 'top',
	            	horizontal: 'left',
	          	}}
	          	transformOrigin = {{
	            	vertical: 'top',
	            	horizontal: 'left',
	          	}}
	          	open = {props.open}
	          	onClose = {props.handleClose}>
	          		<MenuItem onClick = {props.handleClose}>
	          			<Link to = "produtos">Produtos</Link>
	          		</MenuItem>
	          		<MenuItem onClick = {props.handleClose}>
	          			<Link to = "compras">Compras</Link>
	          		</MenuItem>
	        </Menu>
	    </div>
	);
}

class HeaderBar extends Component{
  	state = {
    	anchorEl: null,
  	};
  	handleMenu = event => {
    	this.setState({ anchorEl: event.currentTarget });
  	};
  	handleClose = () => {
    	this.setState({ anchorEl: null });
  	};
	render(){
		const {classes} = this.props;
    	const {anchorEl } = this.state;
    	const open = Boolean(anchorEl);
		return(
			<div className = {classes.root}>
				<AppBar
					title = "Blue Market"
					position = "static">
						<Grid container spacing = {0} justify = "center">
						<Grid item xs = {11} md = {this.props.size ? this.props.size : 8}>
							<Toolbar style = {{paddingLeft: '0px', paddingRight: '0px'}}>
								{this.props.auth &&
									<Hidden mdUp>
										<MobileMenu 
											anchorEl = {this.state.anchorEl} 
											open = {open}
											handleClose = {this.handleClose}
											handleMenu = {this.handleMenu}/>
									</Hidden>
								}
								<Typography 
									color = "inherit"
									className = {classes.brandLogo}
									variant = "title">
										Blue Market
								</Typography>
								{this.props.auth &&
									<Hidden mdDown>
										<Button color = "inherit">
											<Link to = "produtos" className = {classes.barLink}>Produtos</Link>
										</Button>
										<Button color = "inherit">
											<Link to = "compras" className = {classes.barLink}>Compras</Link>
										</Button>
										<Button 
											color = "inherit" 
											onClick = {this.props.logOut} 
											className = {classes.barLink}>
												Sair
										</Button>
									</Hidden>
								}
							</Toolbar>
						</Grid>
						</Grid>
				</AppBar>
			</div>
		);
	}
}

export default compose(withStyles(styles), withWidth())(HeaderBar);