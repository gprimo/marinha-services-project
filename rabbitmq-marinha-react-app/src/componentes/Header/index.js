import React from 'react';
import './index.css'
import { Fragment } from 'react';
import { Menubar } from 'primereact/menubar';

export default function Header() {
    
    const items = [
        {
            label: 'Aeronaves',
            items: [{label: 'Listagem', url:'/aeronaves'},
                    {label: 'Mapa', url: '/aeronaves/mapa'}]
        }
    ]

    return (
        <Fragment>
            <div>
                <Menubar 
                    model={items}
                />
            </div>
        </Fragment>
    );
}
