/**
 *  Created by n.vasileiadis on 05.10.17
 */

Ext.define('LearningAnalytics.model.dashboard.ViewAndStudent', {
    extend: 'LearningAnalytics.model.Base',

    fields: [
        { name: 'enrolledusercount', type: 'int' }
    ],

    hasMany: [
        {
            model: 'LearningAnalytics.model.dashboard.ViewPerDate',
            name: 'viewed',
            associationKey: 'viewed'
        }
    ]


});
