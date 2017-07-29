/**
 * Created by n.vasileiadis on 7/6/2017.
 */

Ext.define('Thesis.Manager.view.main.courses.LineChart', {
    extend: 'Ext.Panel',
    xtype: 'area-basic',
    controller: 'courseController',

    width: 650,

    viewModel: {
        type: 'courseModel'
    },

    // tbar: [
    //     '->',
    //     {
    //         text: 'Preview',
    //         handler: 'onPreview'
    //     }
    // ],

    items: [{
        xtype: 'cartesian',
        reference: 'chart',
        width: '100%',
        height: 600,
        insetPadding: '40 40 40 40',
        store: {
            type: 'gdp'
        },
        legend: {
            docked: 'bottom'
        },
        sprites: [{
            type: 'text',
            text: 'Economic Development in the USA, Japan and China',
            fontSize: 22,
            width: 100,
            height: 30,
            x: 40, // the sprite x position
            y: 20  // the sprite y position
        }, {
            type: 'text',
            text: 'Data: Gross domestic product based on purchasing-power-parity (PPP) valuation of country GDP. Figures for FY2014 are forecasts.',
            fontSize: 10,
            x: 12,
            y: 525
        }, {
            type: 'text',
            text: 'Source: http://www.imf.org/ World Economic Outlook Database October 2014.',
            fontSize: 10,
            x: 12,
            y: 540
        }],
        axes: [{
            type: 'numeric',
            position: 'left',
            fields: 'value',
            title: 'GDP in billions of US Dollars',
            grid: true,
            minimum: 0,
            maximum: 20000,
            majorTickSteps: 10,
            renderer: 'onAxisLabelRender'
        }, {
            type: 'category',
            position: 'bottom',
            fields: 'date',
            label: {
                rotate: {
                    degrees: -45
                }
            }
        }]
        // No 'series' config here,
        // as series are dynamically added in the controller.
    }],

    listeners: {
        afterrender: 'onAfterRender'
    }

});
