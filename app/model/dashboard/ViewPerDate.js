/**
 *  Created by n.vasileiadis on 09.10.17
 */
Ext.define('LearningAnalytics.model.dashboard.ViewPerDate', {
    extend: 'LearningAnalytics.model.Base',

    fields: [
        { name: 'date', type: 'date' },
        { name: 'view', type: 'int'}
    ]
});