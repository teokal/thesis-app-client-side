Ext.define('LearningAnalytics.view.pages.BlankPage', {
    extend: 'Ext.container.Container',
    xtype: 'pageblank',

    requires: [
        'Ext.container.Container'
    ],

    anchor : '100% -1',

    data: {
        course: 'test123'
    },

    layout:{
        type:'vbox',
        pack:'center',
        align:'center'
    },

    items: [
        {
            xtype: 'box',
            cls: 'blank-page-container',
            // language=HTML
            html: '<div class=\'fa-outer-class\'><span class=\'x-fa fa-clock-o\'></span></div><h1>Coming Soon!</h1><span class=\'blank-page-text\'>Stay tuned for updates, {course}</span><div class="infodiv">{course}</div>'
        }
    ],

    initComponent: function(){
        var me = this;

        me.callParent(arguments);
    }

});
