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
                // viewType: 'pageblank',
                leaf: false,
                id:'courses'
            }
        ]
    }
});
