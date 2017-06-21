/**
 * Created by n.vasileiadis on 6/21/2017.
 */
Ext.define('Thesis.Manager.store.DataTests', {
    extend: 'Ext.data.Store',

    alias: 'store.dataTests',

    model: 'Thesis.Manager.model.DataTest',

    autoLoad: false,

    proxy: {
        type: 'ajax',
        actionMethods: {
            read: 'GET'
        },
        useDefaultXhrHeader: false,
        cors: true,
        url: 'http:\/\/83.212.105.139:3000',
        api: {
            read: 'http:\/\/83.212.105.139:3000/api/1/test'
        },
        writer: {
            type: 'json',
            allowSingle: true,
            writeAllFields: true
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }

    //
    // // data: { items: [
    // //     { name: 'Jean Luc', email: "jeanluc.picard@enterprise.com", phone: "555-111-1111" },
    // //     { name: 'Worf',     email: "worf.moghsson@enterprise.com",  phone: "555-222-2222" },
    // //     { name: 'Deanna',   email: "deanna.troi@enterprise.com",    phone: "555-333-3333" },
    // //     { name: 'Data',     email: "mr.data@enterprise.com",        phone: "555-444-4444" }
    // // ]},
    //
    //
    // proxy: {
    //     type: 'ajax',
    //     url: 'app/store/dataTest.json',
    //     reader: {
    //         type: 'json',
    //         rootProperty: 'items'
    //     }
    // }

//     proxy: {
//         type: 'memory',
//         reader: {
//             type: 'json',
//             rootProperty: 'items'
//         }
//     }
});
