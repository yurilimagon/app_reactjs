import { api, cep } from '../services/api';
import axios from "axios";
import { trackPromise } from 'react-promise-tracker';

var requestUsuarios = null;
var requestEnderecos = null;


//USUÁRIOS
export const ListarUsuarios = async (parametros) => {
	if (requestUsuarios !== null || parametros !== undefined) {
		if (requestUsuarios !== null) requestUsuarios();
		if (parametros?.cancelar) return 0;
	}

	let CancelToken = axios.CancelToken;
	let retorno = '';
	await trackPromise(
		api.get("/usuarios", {
			cancelToken: new CancelToken(function executor(c) {
				requestUsuarios = c;
			}),
			params: parametros
		})
			.then(response => {
				retorno = response
			})
			.catch(error => {
				retorno = error.response;
			})
	);

	return retorno;
}

export const AdicionarUsuarios = async (parametros) => {
	if (requestUsuarios !== null || parametros !== undefined) {
		if (requestUsuarios !== null) requestUsuarios();
		if (parametros?.cancelar) return 0;
	}

	let CancelToken = axios.CancelToken;
	let retorno = '';
	await trackPromise(
		api.post("/usuarios", {
			cancelToken: new CancelToken(function executor(c) {
				requestUsuarios = c;
			}),
			params: {
				nome: parametros.nome,
				cpf: parametros.cpf
			}
		})
			.then(response => {
				retorno = response
			})
			.catch(error => {
				retorno = error.response;
			})
	);

	return retorno;
}

export const EditarUsuarios = async (parametros) => {
	if (requestUsuarios !== null || parametros !== undefined) {
		if (requestUsuarios !== null) requestUsuarios();
		if (parametros?.cancelar) return 0;
	}

	let CancelToken = axios.CancelToken;
	let retorno = '';
	await trackPromise(
		api.put("/usuarios", {
			cancelToken: new CancelToken(function executor(c) {
				requestUsuarios = c;
			}),
			params: {
				id: parametros.id,
				nome: parametros.nome,
				cpf: parametros.cpf
			}
		})
			.then(response => {
				retorno = response
			})
			.catch(error => {
				retorno = error.response;
			})
	);

	return retorno;
}

export const ExcluirUsuarios = async (parametros) => {
	if (requestUsuarios !== null || parametros !== undefined) {
		if (requestUsuarios !== null) requestUsuarios();
		if (parametros?.cancelar) return 0;
	}

	let CancelToken = axios.CancelToken;
	let retorno = '';
	await trackPromise(
		api.delete("/usuarios", {
			cancelToken: new CancelToken(function executor(c) {
				requestUsuarios = c;
			}),
			params: {
				id: parametros.id
			}
		})
			.then(response => {
				retorno = response
			})
			.catch(error => {
				retorno = error.response;
			})
	);

	return retorno;
}

//ENDEREÇOS
export const ListarEnderecosUsuario = async (parametros) => {
	if (requestEnderecos !== null || parametros !== undefined) {
		if (requestEnderecos !== null) requestEnderecos();
		if (parametros?.cancelar) return 0;
	}

	let CancelToken = axios.CancelToken;
	let retorno = '';
	await trackPromise(
		api.get("/endereco", {
			cancelToken: new CancelToken(function executor(c) {
				requestEnderecos = c;
			}),
			params: {
				id: parametros.id
			}
		})
			.then(response => {
				retorno = response
			})
			.catch(error => {
				retorno = error.response;
			})
	);

	return retorno;
}

export const CadastrarEnderecosUsuario = async (parametros) => {
	if (requestEnderecos !== null || parametros !== undefined) {
		if (requestEnderecos !== null) requestEnderecos();
		if (parametros?.cancelar) return 0;
	}

	let CancelToken = axios.CancelToken;
	let retorno = '';
	await trackPromise(
		api.post("/enderecos", {
			cancelToken: new CancelToken(function executor(c) {
				requestEnderecos = c;
			}),
			params: {
				endereco: parametros.endereco,
				numero: parametros.numero,
				complemento: parametros.complemento,
				bairro: parametros.bairro,
				cidade: parametros.cidade,
				uf: parametros.uf,
				cep: parametros.cep,
				usuario_id: parametros.usuario_id,
			}
		})
			.then(response => {
				retorno = response
			})
			.catch(error => {
				retorno = error.response;
			})
	);

	return retorno;
}

export const ExcluirEnderecosUsuario = async (parametros) => {
	if (requestEnderecos !== null || parametros !== undefined) {
		if (requestEnderecos !== null) requestEnderecos();
		if (parametros?.cancelar) return 0;
	}

	let CancelToken = axios.CancelToken;
	let retorno = '';
	await trackPromise(
		api.delete("/enderecos", {
			cancelToken: new CancelToken(function executor(c) {
				requestEnderecos = c;
			}),
			params: {
				id: parametros.id
			}
		})
			.then(response => {
				retorno = response
			})
			.catch(error => {
				retorno = error.response;
			})
	);

	return retorno;
}

//CEP
export const VerificarCep = async (parametros) => {
	if (requestEnderecos !== null || parametros !== undefined) {
		if (requestEnderecos !== null) requestEnderecos();
		if (parametros?.cancelar) return 0;
	}

	let CancelToken = axios.CancelToken;
	let retorno = '';
	await trackPromise(
		cep.get(`/${parametros.cep}/json`, {
			cancelToken: new CancelToken(function executor(c) {
				requestEnderecos = c;
			}),
			// params: parametros
		})
			.then(response => {
				retorno = response
			})
			.catch(error => {
				retorno = error.response;
			})
	);

	return retorno;
}