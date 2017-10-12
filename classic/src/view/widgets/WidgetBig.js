/**
 *  Created by n.vasileiadis on 06.10.17
 */
Ext.define('LearningAnalytics.view.widgets.WidgetBig', {
    extend: 'LearningAnalytics.view.widgets.WidgetSmall',
    xtype: 'widgetBig',

    cls:'admin-widget info-card-item info-card-large-wrap shadow',

    height: 280,

    tpl: '<div><span class="x-fa fa-{icon}"></span><h2>{amount}</h2><div class="infodiv">{type}</div></div>'
});
