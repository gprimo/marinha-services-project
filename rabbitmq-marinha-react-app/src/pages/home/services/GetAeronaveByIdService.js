import api from '../../../services/api';
import { MensagemMontada } from '../../../componentes/mensagem/mensagemApi'; 

export default class GetAeronaveByIdService {
    async getAeronaveById(id) {

        let dado = [];
        await api.get('/aeronaves/' + id)
        .then(response=>{
            dado = MensagemMontada(response.status,response.data);
        })
        .catch(error =>{
            dado = MensagemMontada(error.response.status, error.response.mensagem);
        });
        return dado;
    }

}