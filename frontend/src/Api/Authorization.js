const TOKEN_NAME = 'app-mercado-token';

const AUTH_ERROR_TEXT = `Erro na autenticação, por favor,
						cheque seu nome de usuário e senha e 
						tente novamente. (admin, 0000aaaa)`;

const LOCAL_HOST = '';//'http://localhost:8000';

export async function createAuthorizationToken(data){
	const headers = new Headers();
	headers.append('Content-Type', 'application/json');
	
	const res = await fetch(LOCAL_HOST+'/api/get-token/', {
		method: 'POST',
		body: JSON.stringify(data),
		headers
	});
	
	if(!res.ok)
		return {error: true, errorText: AUTH_ERROR_TEXT};
	
	const {token} = await res.json();
	
	localStorage.setItem(TOKEN_NAME, `Token ${token}`);
	
	return {error: false};
}

export function getToken(){
	const token = localStorage.getItem(TOKEN_NAME);
	
	if(token && token.startsWith("Token") && token.length === 46)
		return token;
	return "";
}

export function clearToken(){
	localStorage.removeItem(TOKEN_NAME);
}