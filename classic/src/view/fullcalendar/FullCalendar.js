/**
 *  Created by n.vasileiadis on 09.12.17
 */

Ext.define('Ext.ux.FullCalendar', {
    extend: 'Ext.Component',
    alias: 'widget.fullcalendar',
    config:{
        map: null
    },

    // height: 680,

    afterRender: function(t, eOpts){
        this.callParent(arguments);

        var calendarRef = window.$('#calendar');

        if (calendarRef === null){
            this.update('No calendar library loaded');
        } else {
            window.$('#calendar').fullCalendar({
                themeSystem: 'standard',
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay,listMonth'
                },
                editable: false,
                defaultView: 'month',
                events: [
                    // all day event
                    {
                        title  : 'Meeting',
                        start  : '2017-12-12',
                        description: 'long description'
                    },
                    // long-term event
                    {
                        title  : 'Conference',
                        start  : '2017-12-13',
                        end    : '2017-12-15'
                    },
                    // short term event
                    {
                        title  : 'Dentist',
                        start  : '2017-12-09T11:30:00',
                        end  : '2017-12-09T012:30:00',
                        allDay : false // will make the time show
                    }
                ],
                eventClick: function(calEvent, jsEvent, view) {
                    alert('Event: ' + calEvent.title + '\nDescription: ' + calEvent.description);
                    // alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
                    // alert('View: ' + view.name);

                    // change the border color just for fun
                    $(this).css('border-color', 'red');

                }
            })

        }
    }
});