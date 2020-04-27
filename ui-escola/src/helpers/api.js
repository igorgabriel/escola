import axios from 'axios';
import url from 'url';

const escolaAPI = axios.create({
    baseURL: url.resolve('http://localhost:8888', '/v1'),
    withCredentials: true
});

const getEscolas = (onSuc, onErr) => {
    escolaAPI.get('/escolas').then((response) => onSuc(response.data.escolas))
        .catch((error) => onErr(getError(error)));
}

const getEscolaById = (id, onSuc, onErr) => {
    escolaAPI.get(`/escolas/${id}`).then((response) => onSuc(response.data.escola))
        .catch((error) => onErr(getError(error)));
}

const saveEscola = (escola, onSuc, onErr) => {
    console.log(escola)
    escolaAPI.post('/escolas', escola).then((response) => onSuc(response.data))
        .catch((error) => onErr(getError(error)));
}

const updateEscola = (escola, onSuc, onErr) => {
    const id = escola.id;
    delete escola.id;
    escolaAPI.put(`/escolas/${id}`, escola).then((response) => onSuc(response.data))
        .catch((error) => onErr(getError(error)));
}

const deleteEscola = (id, onSuc, onErr) => {
    escolaAPI.delete(`/escolas/${id}`)
        .then((response) => onSuc(response.data))
        .catch((error) => onErr(getError(error)));
}

const getError = (error) => {
    if (error) {
        if (error.response) {
            if (error.response.data) {
                return error.response.data
            }
            return error.response
        }
        return error
    }
}

export {
    getEscolas, getEscolaById, saveEscola, updateEscola, deleteEscola
};
export default escolaAPI;
