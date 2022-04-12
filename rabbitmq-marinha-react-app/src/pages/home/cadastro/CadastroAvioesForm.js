import React, { Component } from 'react';
import { Button } from 'primereact/button';
import { Fragment } from 'react';
import { Panel } from 'primereact/panel';
import { InputText } from 'primereact/inputtext';
import GetAeronaveByIdService from '../services/GetAeronaveByIdService';
import PostAeronaveService from '../services/PostAeronaveService';
import PutAeronaveService from '../services/PutAeronaveService';
import { Toast } from 'primereact/toast';
import { Sucesso } from '../../../componentes/mensagem/notification';

export default class CadastroAvioesForm extends Component {

    constructor(props){
        super(props)
        
        this.state = {
            id: props.Id, 
            origin_country: "",
            last_contact: null,
            longitude: null,
            latitude: null,
            velocity: null,
            true_track: null,
            true_track_convert: null
        }
        this.GetAeronaveByIdService = new GetAeronaveByIdService();
        this.PostAeronaveService = new PostAeronaveService();
        this.PutAeronaveService = new PutAeronaveService();
        this.onTrueTrackChange = this.onTrueTrackChange.bind(this);
    }

    async getAeronaveById(){
        let idAeronave = this.state.id;

        await this.GetAeronaveByIdService.getAeronaveById(idAeronave).then(data => {
            if (data !== undefined && data.status !== undefined && data.status === 200) {
                this.setState({ 
                    origin_country: data.mensagem.origin_country,
                    last_contact:  data.mensagem.last_contact,
                    longitude: data.mensagem.longitude,
                    latitude: data.mensagem.latitude,
                    velocity: data.mensagem.velocity,
                    true_track: data.mensagem.true_track
                });
            }
            else if (data !== undefined && data.status !== undefined && data.status !== 200) {
                this.toast.show({ severity: 'info', summary: 'Rejected', detail: data.mensagem, life: 3000 });
            }
        })
    }

    async gravarAeronave(){
        let id;
        let aeronave = [];

        if (this.state.id){
            id = parseInt(this.state.id);
            aeronave = await this.PutAeronaveService.putAeronave(id, this.state.origin_country, this.state.last_contact, this.state.longitude, this.state.latitude, this.state.velocity, this.state.true_track_convert );
        }

        if (!this.state.id) {
            aeronave = await this.PostAeronaveService.postAeronave(this.state.origin_country, this.state.last_contact, this.state.longitude, this.state.latitude, this.state.velocity, this.state.true_track_convert );
            this.toast.show({ severity: 'success', summary: 'Sucesso', detail: 'Aeronave cadastrada com sucesso', life: 5000 });
        }

        if (aeronave === undefined) {
            this.toast.show({ severity: 'error', summary: 'Rejected', detail: aeronave.mensagem, life: 3000 });
        }
        else{
            Sucesso("Sucesso","Cadastro realizado");
            this.toast.show({ severity: 'success', summary: 'Sucesso', detail: 'Aeronave cadastrada com sucesso', life: 5000 });
            this.voltar();
        }
    }

    handleSubmit= e => {
        e.preventDefault();
        this.gravarAeronave();
    }

    onTrueTrackChange(e) {
        this.setState({true_track: e.target.value});
        this.setState({true_track_convert: Number(e.target.value)});
    }

    async componentDidMount(){
        if (this.state.id) {
            this.getAeronaveById();
        }
    }

    voltar = () =>{
        window.history.back();
    }

    render() {
        return (
            <Fragment>
                <Toast ref={(el) => this.toast = el} />
                <Panel header="Aeronaves" className = "aprovadoAeronaves">
                <h5 className="card-title">{this.state.id ? "Alteração" : "Inclusão"}</h5>
                    <form className="needs-validation"  onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className='col-sm col-lg-12 form-check'>
                                <label htmlFor="originCountry">País de Origem</label>
                                <InputText type="text" className="form-control" id="tituloInput" defaultValue={this.state.origin_country} 
                                onChange={e => this.setState({ origin_country: e.target.value })}
                                required />
                            </div>
                        </div>
                        <div className="row">
                            <div className='col-sm col-lg-12 form-check'>
                                <label htmlFor="last_contact">Último contato</label>
                                <InputText keyfilter="int" type="text" className="form-control" id="tituloInput" defaultValue={this.state.last_contact} 
                                onChange={e => this.setState({ last_contact: e.target.value })}
                                required />
                            </div>
                        </div>
                        <div className="row">
                            <div className='col-sm col-lg-12 form-check'>
                                <label htmlFor="latitude">Latitude</label>
                                <InputText keyfilter="num" type="text" className="form-control" id="tituloInput" defaultValue={this.state.latitude} 
                                onChange={e => this.setState({ latitude: e.target.value })}
                                required />
                            </div>
                        </div>
                        <div className="row">
                            <div className='col-sm col-lg-12 form-check'>
                                <label htmlFor="longitude">Longitude</label>
                                <InputText keyfilter="num" type="text" className="form-control" id="tituloInput" defaultValue={this.state.longitude} 
                                onChange={e => this.setState({ longitude: e.target.value })}
                                required />
                            </div>
                        </div>
                        <div className="row">
                            <div className='col-sm col-lg-12 form-check'>
                                <label htmlFor="Rumo">Rumo</label>
                                <InputText keyfilter="num" type="text" className="form-control" id="tituloInput" defaultValue={this.state.true_track} 
                                onChange={this.onTrueTrackChange}
                                required />
                            </div>
                        </div>
                        <div className="row">
                            <div className='col-sm col-lg-12 form-check'>
                                <label htmlFor="velocity">Velocidade</label>
                                <InputText keyfilter="num" type="text" className="form-control" id="tituloInput" defaultValue={this.state.velocity} 
                                onChange={e => this.setState({ velocity: e.target.value })}
                                required />
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row d-flex justify-content-start">
                                <div className="col-md col-lg-2">
                                    <Button label="Salvar"  icon="pi pi-check" iconPos="left" className="p-button-success full-size"  variant="primary" disabled={this.state.loading} type="submit"/>
                                </div>
                                <div className="col-md-auto">
                                    <Button label="Voltar" onClick={() => this.voltar()}  className = 'back-prevent full-size' icon="pi pi-arrow-left" iconPos="left"  variant="primary" disabled={this.state.loading} type="button"/>
                                </div>
                            </div> 
                        </div>
                    </form>
                </Panel>
            </Fragment>
        )}
}