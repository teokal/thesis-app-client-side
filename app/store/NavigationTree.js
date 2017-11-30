Ext.define('LearningAnalytics.store.NavigationTree', {
    extend: 'Ext.data.TreeStore',

    id: 'navigationTree',
    alias: 'store.navigationTree',

    viewModel: 'main',

    storeId: 'NavigationTree',

    fields: [{
        name: 'text'
    }],

    root: {
        expanded: true,
        children: [
            {
                text: 'Dashboard',
                id:'dash',
                iconCls: 'x-fa fa-desktop',
                viewType: 'admindashboard',
                routeId: 'dashboard',
                leaf: true
            },
            {
                text: 'Courses',
                iconCls: 'x-fa fa-leanpub',
                leaf: false,
                id:'courses'
            },
            {
                text: 'About',
                iconCls: 'x-fa fa-info-circle',
                viewType: 'about',
                leaf: true
            },
            {
                text: 'Logout',
                iconCls: 'x-fa fa-sign-out',
                id: 'logout',
                // viewType: 'about',
                leaf: true
            }


        ]
    }
});
