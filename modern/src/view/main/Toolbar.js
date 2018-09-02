Ext.define('LearningAnalytics.view.main.Toolbar', {
    extend: 'Ext.Toolbar',
    xtype: 'maintoolbar',

    requires: [
        'Ext.SegmentedButton'
    ],

    items: [
        {
            // This component is moved to the floating nav container by the phone profile
            xtype: 'component',
            reference: 'logo',
            userCls: 'main-logo',
            html: 'Sencha'
        },
        {
            xtype: 'button',
            ui: 'header',
            iconCls: 'x-fa fa-bars',
            margin: '0 0 0 10',
            listeners: {
                tap: 'onToggleNavigationSize'
            }
        },
        '->',

        {
            xtype: 'component',
            html: 'Username',
            margin: '0 12 0 4',
            userCls: 'main-user-name'
        },
        {
            xtype: 'image',
            userCls: 'main-user-image small-image circular',
            alt: 'Current user image',
            src: 'resources/images/profile-icon.png'
        }
    ]
});
