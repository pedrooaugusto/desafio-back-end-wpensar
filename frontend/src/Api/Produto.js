import * as Authorization from './Authorization';

const LOCAL_HOST = '';//'http://localhost:8000';


const makeHeaders = token => {
	const headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('Authorization', token);
	return headers;
}

const hasToken = (fn) =>{
	const token = Authorization.getToken();
	if(!token)
		return fn(true, 401);
	return fn(false, token);	
}

const checkToken = (res, fn) => {
	if(res.ok === true)
		return fn(false, res);
	
	if(res.status === 401)
		Authorization.clearToken();
	return fn(true, res.status);
}

export async function list() {

	return hasToken(async (err, token, code) => {
		if(err)
			return {error: true, code: 401};
		const res = await fetch(LOCAL_HOST+'/api/produtos/?format=json', {
			headers: makeHeaders(token),
			method: 'get',
		});
		return checkToken(res, async (err, data) => {
			if(err)
				return {error: true, code: data}
			const produtos = await data.json();
			return {error: false, produtos};			
		});
	});
}

export async function save(data){
	return hasToken(async (err, token, code) => {
		if(err)
			return {error: true, code: 401};
		const res = await fetch(LOCAL_HOST+'/api/produtos/?format=json', {
			headers: makeHeaders(token),
			method: 'post',
			body: JSON.stringify(data)
		});
		return checkToken(res, async (err, obj) => {
			if(err)
				return {error: true, code: obj};
			const message = await obj.json();
			return {error: false, message};
		});
	});
}

export async function remove(id){
	return hasToken(async (err, token, code) => {
		if(err)
			return {error: true, code: 401};
		const res = await fetch(LOCAL_HOST+'/api/produtos/'+id+'/?format=json', {
			headers: makeHeaders(token),
			method: 'delete'
		});
		return checkToken(res, async (err, obj) => {
			if(err)
				return {error: true, code: obj};
			return {error: false, message: "Removido com sucesso!"};
		});
	});
}

export async function edit(id, obj){
	return hasToken(async (err, token, code) => {
		if(err)
			return {error: true, code: 401};
		const res = await fetch(LOCAL_HOST+'/api/produtos/'+id+'/', {
			headers: makeHeaders(token),
			method: 'put',
			body: JSON.stringify(obj)
		});
		return checkToken(res, async (err, obj) => {
			if(err)
				return {error: true, code: obj};
			return {error: false, message: "Alterado com sucesso!"};
		});
	});
}