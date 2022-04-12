import axios from 'axios';

export default class RabbitAirplaneService {

    async startRabbitAirplane() {

        await axios.get(`http://localhost:8081/aeronaves`);
    }

}