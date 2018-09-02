Ext.define('LearningAnalytics.view.pages.Error404Window', {
    extend: 'LearningAnalytics.view.pages.ErrorBase',
    xtype: 'page404',

    requires: [
        'Ext.container.Container',
        'Ext.form.Label',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Spacer'
    ],

    items: [
        {
            xtype: 'container',
            width: 400,
            cls:'error-page-inner-container',
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            items: [
                {
                    xtype: 'label',
                    cls: 'error-page-top-text',
                    text: '404'
                },
                {
                    xtype: 'label',
                    cls: 'error-page-desc',
                    html: '<div>Seems you\'ve hit a wall!</div>'
                },
                {
                    xtype: 'tbspacer',
                    flex: 1
                }
            ]
        }
    ]
});
