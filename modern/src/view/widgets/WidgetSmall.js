/**
 *  Created by n.vasileiadis on 06.10.17
 */

Ext.define('LearningAnalytics.view.widgets.WidgetSmall', {
    extend: 'Ext.panel.Panel',
    xtype: 'widgetSmall',

    cls: 'info-card-item shadow',

    containerColor: '',

    height: 170,

    value: 0,


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
