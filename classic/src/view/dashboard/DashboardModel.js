Ext.define('LearningAnalytics.view.dashboard.DashboardModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.dashboard',

    requires: [
        'Ext.data.Store',
        'Ext.data.field.Integer',
        'Ext.data.field.String',
        'Ext.data.field.Boolean'
    ],

    stores: {
        courses: {
            autoLoad: true,
            type: 'courses'
        },
        viewStudents: {
            autoLoad: true,
            type: 'viewStudents'
        }
    },

    data: {
        recs: null,
        enrolledusercount: null,
        viewStudentsChart: null
    }
});
