import React, { Component } from 'react';
import CadastroAvioesForm from './CadastroAvioesForm';
import { Fragment } from 'react';



export default class CadastroAeronaves extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: parseInt(props.match.params.id), 
            origin_country: "",
            last_contact: null,
            longitude: null,
            latitude: null,
            velocity: null,
            true_track:null
        }
    }

    async componentDidMount(){
    }

    render(){
        return(
            <Fragment>
                <CadastroAvioesForm 
                    Id = {this.state.id}
                    OriginCountry={this.state.origin_country}
                    LastContact ={this.state.last_contact}
                    Longitude = {this.state.longitude}
                    Latitude = {this.state.latitude}
                    Velocity = {this.state.velocity}
                    TrueTrack = {this.state.true_track}/>
            </Fragment>
        )
    }
}