import React, { Component, Fragment } from 'react';
import ListaAeronavesService from '../../home/services/ListaAeronavesService';
import RabbitAirplaneService from '../../../services/rabbitAirplaneService';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import Moment from 'react-moment';


class AircraftMap extends Component {
    constructor(props) {
        super(props)
            this.state = { 
                listaAeronaves: {},
                loadingSolicitacao: true
            }
            this.ListaAeronavesService = new ListaAeronavesService();
            this.RabbitAirplaneService = new RabbitAirplaneService();

    }

    async getAeronaves(){
        await this.ListaAeronavesService.getListaAeronaves().then(data => {
            if (data !== undefined && data.status !== undefined && data.status === 200) {
                this.setState({ 
                    listaAeronaves: data.mensagem,
                    loadingSolicitacao: false
                });
            }
            else if (data !== undefined && data.status !== undefined && data.status !== 200) {
                this.toast.show({ severity: 'info', summary: 'Rejected', detail: data.mensagem, life: 3000 });
            }
        })
    }

    async startRabbitQueue() {
        await this.RabbitAirplaneService.startRabbitAirplane();
    }


    async componentDidMount(){
        this.getAeronaves();
    }
    
    render() {
        const center = [40.8336, -78.225];
        let markers = [];

        if (this.state.listaAeronaves.length > 0) {
            for (let i = 0; i < 1000; i++) {
                markers.push(
                    <Marker position={[this.state.listaAeronaves[i].longitude,this.state.listaAeronaves[i].latitude ]}>
                        <Popup>
                            <span className='mapLabel'>País de Origem: </span><span>{this.state.listaAeronaves[i].origin_country}</span><br/>
                            <span className='mapLabel'>Último Contato: </span><span>{this.state.listaAeronaves[i].last_contact}</span><br/>
                            <span className='mapLabel'>Latitude: </span><span>{this.state.listaAeronaves[i].latitude}</span><br/>
                            <span className='mapLabel'>Longitude: </span><span>{this.state.listaAeronaves[i].longitude}</span><br/>
                            <span className='mapLabel'>Velocidade: </span><span>{this.state.listaAeronaves[i].velocity}</span><br/>
                            <span className='mapLabel'>Rumo: </span><span>{this.state.listaAeronaves[i].true_track}</span>
                        </Popup>
                    </Marker>
                )
            }
        }

        const limeOptions = { color: 'lime' }
        return ( 
            <Fragment>
                <MapContainer center={center} zoom={6} scrollWheelZoom={true}>
                    <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {markers}
                </MapContainer>
            </Fragment>
        );
    }
}

export default AircraftMap;