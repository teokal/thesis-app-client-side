/**
 *  Created by n.vasileiadis on 06.10.17
 */

Ext.define('LearningAnalytics.view.widgets.WidgetSmall', {
    extend: 'Ext.panel.Panel',
    xtype: 'widgetSmall',

    cls: 'info-card-item',

    containerColor: '',

    value: 0,

    style: {
        'box-shadow': '0 0 5px rgba(0, 0, 0, 0.3)'
    },

    // data: {
    //     amount: 0,
    //     type: '',
    //     icon: '',
    // },
    // tpl: '<div><h2>{enrolledusercount}</h2><span class="x-fa fa-{icon}"></span><div class="infodiv">{type}</div></div>',

    initComponent: function(){
        var me = this;

        Ext.apply(me, {
            cls: me.config.containerColor
        });

        me.callParent(arguments);
    }

});
