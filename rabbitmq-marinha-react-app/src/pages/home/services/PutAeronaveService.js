import api from '../../../services/api';
import { MensagemMontada } from '../../../componentes/mensagem/mensagemApi'; 

export default class PutAeronaveService {
    async putAeronave(id, origin, lastContact, longitude, latitude, velocity, trueTrack ) {

        let aeronave = {
            'origin_country':origin,
            'last_contact': lastContact,
            'longitude': longitude,
            'latitude': latitude,
            'velocity': velocity,
            'true_track': trueTrack
        };

        console.log(aeronave);

        let dado = [];
        
        await api.put('/aeronaves/' + id, aeronave)
        .then(response=>{
            dado = MensagemMontada(response.status,response.data);
        })
        .catch(error =>{
            dado = MensagemMontada(error.response.status, error.response.mensagem);
        });
        return dado;
    }

}