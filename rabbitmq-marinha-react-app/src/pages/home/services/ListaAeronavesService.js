//import axios from 'axios';
import api from '../../../services/api';
import { MensagemMontada } from '../../../componentes/mensagem/mensagemApi';

export default class ListaAeronavesService {

    async getListaAeronaves() {

        let dado = [];
        await api.get('/aeronaves')
        .then(response=>{
            dado = MensagemMontada(response.status,response.data);
        })
        .catch(error =>{
            dado = MensagemMontada(error.response.status, error.response.mensagem);
        });
        return dado;
    }

}