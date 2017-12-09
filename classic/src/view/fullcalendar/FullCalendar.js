/**
 *  Created by n.vasileiadis on 09.12.17
 */

Ext.define('Ext.ux.FullCalendar', {
    extend: 'Ext.Component',
    alias: 'widget.fullcalendar',
    config:{
        map: null
    },

    afterRender: function(t, eOpts){
        this.callParent(arguments);

        var calendarRef = window.$('#calendar');

        if (calendarRef === null){
            this.update('No calendar library loaded');
        } else {
            window.$('#calendar').fullCalendar({
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                }
            })

        }
    }
});