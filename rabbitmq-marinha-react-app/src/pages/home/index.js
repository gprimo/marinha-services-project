import React, { Component, Fragment } from 'react';
import ListaAeronavesService from './services/ListaAeronavesService';
import { Toast } from 'primereact/toast';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import RabbitAirplaneService from '../../services/rabbitAirplaneService';
import { Link } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { confirmDialog } from 'primereact/confirmdialog';
import api from '../../services/api';
import Moment from 'react-moment';


class Home extends Component {
    constructor(props) {
        super(props)
            this.state = { 
                listaAeronaves: {},
                loadingSolicitacao: true,
                first2: 0,
                rows2: 15,
                currentPage: 1,
                pageInputTooltip: 'Press \'Enter\' key to go to this page.',
            }
            this.ListaAeronavesService = new ListaAeronavesService();
            this.RabbitAirplaneService = new RabbitAirplaneService();
            this.onCustomPage2 = this.onCustomPage2.bind(this);
            this.onPageInputKeyDown = this.onPageInputKeyDown.bind(this);
            this.onPageInputChange = this.onPageInputChange.bind(this);
            this.actionBodyTemplate = this.actionBodyTemplate.bind(this);
            this.dateNoticiaBodyTemplate = this.dateNoticiaBodyTemplate.bind(this);


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

    renderHeader() {
        return (
            <div className="table-header">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e) => this.setState({globalFilter: e.target.value})} placeholder="Global Search" />
                    <Link to={`/aeronaves/cadastro`} style={{ textDecoration: 'none' }} >
                        <div className='floatRight bt-cadastro'><Button label="Incluir" icon="pi pi-plus" /></div>
                    </Link>
                </span>
            </div>
        );
    }

    onCustomPage2(event) {
        this.setState({
            first2: event.first,
            rows2: event.rows
        });
    }

    onPageInputKeyDown(event, options) {
        if (event.key === 'Enter') {
            const page = parseInt(this.state.currentPage);
            if (page < 0 || page > options.totalPages) {
                this.setState({ pageInputTooltip: `Value must be between 1 and ${options.totalPages}.`})
            }
            else {
                const first = this.state.currentPage ? options.rows * (page - 1) : 0;
                this.setState({ first1: first, pageInputTooltip: 'Press \'Enter\' key to go to this page.' });
            }
        }
    }

    onPageInputChange(event) {
        this.setState({ currentPage: event.target.value });
    }

    async removerAeronave(rowData) {
        this.setState({loadingSolicitacao:true});
        await api.delete(`aeronaves/${rowData.id}`)
        .then(response=>{
            this.toast.show({ severity: 'success', summary: 'Sucesso', detail: 'Aeronave removida com sucesso', life: 3000 });
            this.componentDidMount();
        })
    }

    remove = (rowData) => {
        confirmDialog({
            message: 'Tem certeza que deseja remover essa aeronave?',
            header: 'Confirmação',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: "Sim",
            rejectLabel:"Não",
            accept: () => this.removerAeronave(rowData),
            reject: () => this.reject()
        });
    }

    reject() {
        this.toast.show({ severity: 'info', summary: 'Rejected', detail: 'Você cancelou a remoção', life: 3000 });
    }

    actionBodyTemplate(rowData) {
        return (
            <React.Fragment>
                <div className="textRight">
                    <Link to={`/aeronaves/cadastro/${rowData.id}`} style={{ textDecoration: 'none' }} ><Button icon="pi pi-pencil" className="p-button-rounded p-button-warning p-mr-2 spacing-default" /></Link>
                    <Button icon="pi pi-trash" className="p-button-rounded p-button-danger p-mr-2 spacing-default" onClick={() => this.remove(rowData)} />
                </div>
            </React.Fragment>
        );
    }

    
    dateNoticiaBodyTemplate(rowData) {
        return (
            <React.Fragment>
                <div className='elipsisNoticia'><Moment format="DD/MM/YYYY hh:hh">{rowData.dataNoticia}</Moment></div>
            </React.Fragment>
        );
    }
    
    async componentDidMount(){
        this.startRabbitQueue();
        this.getAeronaves();
    }
    
    render() {
        const header = this.renderHeader();
        const template2 = {
            layout: 'RowsPerPageDropdown CurrentPageReport PrevPageLink NextPageLink',
            'RowsPerPageDropdown': (options) => {
                const dropdownOptions = [
                    { label: 10, value: 10 },
                    { label: 20, value: 20 },
                    { label: 50, value: 50 }
                ];

                return (
                    <React.Fragment>
                        <span className="p-mx-1" style={{ color: 'var(--text-color)', userSelect: 'none' }}>Items per page: </span>
                        <Dropdown value={options.value} options={dropdownOptions} onChange={options.onChange} />
                    </React.Fragment>
                );
            },
            'CurrentPageReport': (options) => {
                return (
                    <span style={{ color: 'var(--text-color)', userSelect: 'none', width: '120px', textAlign: 'center' }}>
                        {options.first} - {options.last} of {options.totalRecords}
                    </span>
                )
            }
        };

        return ( 
            <Fragment>
                <Toast ref={(el) => this.toast = el} />
                <div className="card-data">
                    <DataTable value={this.state.listaAeronaves}  ref={(el) => this.dt = el} dataKey="id"  header={header} className="p-datatable-sm" loading={this.state.loadingSolicitacao} emptyMessage="No aircrafts found." globalFilter={this.state.globalFilter} paginator paginatorTemplate={template2} first={this.state.first2} rows={this.state.rows2} onPage={this.onCustomPage2}>
                        <Column field="origin_country" header="País" headerStyle={{ backgroundColor: '#2196F3', color:"white"}}></Column>
                        <Column field="last_contact" body={this.dateNoticiaBodyTemplate} header="Último Contato" headerStyle={{ backgroundColor: '#2196F3', color:"white"}}></Column>
                        <Column field="latitude" header="Latitude" headerStyle={{ backgroundColor: '#2196F3', color:"white"}}></Column>
                        <Column field="longitude" header="Longitude"  headerStyle={{ backgroundColor: '#2196F3', color:"white"}}></Column>
                        <Column field="velocity" header="Velocidade"  headerStyle={{ backgroundColor: '#2196F3', color:"white"}}></Column>
                        <Column field="true_track" header="Rumo"  headerStyle={{ backgroundColor: '#2196F3', color:"white"}}></Column>
                        <Column field="" header="" body={this.actionBodyTemplate} headerStyle={{ backgroundColor: '#2196F3', color:"white", width:'auto', fontSize:"1vw", textAlign:"left !important"}}></Column>
                    </DataTable>        
                </div>
            </Fragment>
        );
    }
}

export default Home;