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

    // controller: 'fullcalendar',
    // viewModel: {
    //     type: 'fullcalendar'
    // },
    //
    // listeners: {
    //     beforerender: 'onShow'
    // },

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
                events: function(start, end, timezone, callback) {
                    var object = Ext.util.Cookies.get('AccessToken');
                    var cookies = JSON.parse(object);
                    $.ajax({
                        url: LearningAnalytics.config.Runtime.getBaseUrl() + '/api/1/events',
                        dataType: 'json',

                        type: 'GET',
                        useDefaultXhrHeader: false,
                        cors: true,
                        headers: {
                            'Authorization': 'Token token=' + cookies.access_token
                        },
                        success: function(doc) {
                            var eventsArray = [];
                            doc.response.events.forEach(function(element) {
                                eventsArray.push({
                                    title: element.title,
                                    start: element.start,
                                    end: element.end,
                                    description: element.description,
                                    allDay: element.allDay
                                });
                            });
                            callback(eventsArray);
                        },
                        error: function() {
                            alert('there was an error while fetching events!');
                        }
                    });
                },
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