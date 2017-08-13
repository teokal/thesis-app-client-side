/**
 * Created by n.vasileiadis on 8/13/2017.
 */

Ext.define('EW20.view.admin.users.AdminUserModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.adminUserModel',
    stores: {
        adminUsers: {
            type: 'adminUsers'
        }
    },
    data: {
        recs: null,
        list: null
    }
});