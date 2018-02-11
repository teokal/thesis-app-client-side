Ext.define('LearningAnalytics.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    listen : {
        controller : {
            '#' : {
                unmatchedroute : 'onRouteChange'
            }
        }
    },

    routes: {
        ':node': 'onRouteChange'
    },

    requires: [
        'LearningAnalytics.config.Runtime',
        'Ext.util.TaskRunner',
        'Ext.window.Toast'
    ],

    lastView: null,
    currentCourseId: null,

    setCurrentView: function(hashTag) {
        hashTag = (hashTag || '').toLowerCase();

        var me = this,
            refs = me.getReferences(),
            mainCard = refs.mainCardPanel,
            mainLayout = mainCard.getLayout(),
            navigationList = refs.navigationTreeList,
            store = navigationList.getStore(),
            node = store.findNode('routeId', hashTag) ||
                   store.findNode('viewType', hashTag),
            view = (node && node.get('viewType')) || 'page404',
            lastView = me.lastView,
            existingItem = mainCard.child('component[routeId=' + hashTag + ']'),
            newView;

        // Kill any previously routed window
        if (lastView && lastView.isWindow) {
            lastView.destroy();
        }

        lastView = mainLayout.getActiveItem();

        if (!existingItem) {
            newView = Ext.create({
                xtype: view,
                routeId: hashTag,  // for existingItem search later
                hideMode: 'offsets'
            });
        }

        if (!newView || !newView.isWindow) {
            // !newView means we have an existing view, but if the newView isWindow
            // we don't add it to the card layout.
            if (existingItem) {
                // We don't have a newView, so activate the existing view.
                if (existingItem !== lastView) {
                    mainLayout.setActiveItem(existingItem);
                }
                newView = existingItem;
            }
            else {
                // newView is set (did not exist already), so add it and make it the
                // activeItem.
                Ext.suspendLayouts();
                mainLayout.setActiveItem(mainCard.add(newView));
                Ext.resumeLayouts(true);
            }
        }

        navigationList.setSelection(node);

        if (newView.isFocusable(true)) {
            newView.focus();
        }

        me.lastView = newView;
    },

    onNavigationTreeSelectionChange: function (tree, node) {
        var to = node && (node.get('routeId') || node.get('viewType'));

        if (to) {
            this.redirectTo(to);
        }

        if (to === 'courses') {
            if (node.isExpanded()) {
                switch (node.get('extjsview')) {
                    case 'Category':
                        newView = new MyApp.view.Category({});
                        break;
                    case 'sync.Sync':
                        newView = new MyApp.view.sync.Sync({});
                        break;
                    default:
                        break;
                }
            }

        }
    },

    onToggleNavigationSize: function () {
        var me = this,
            refs = me.getReferences(),
            navigationList = refs.navigationTreeList,
            wrapContainer = refs.mainContainerWrap,
            collapsing = !navigationList.getMicro(),
            new_width = collapsing ? 64 : 250;

        // TODO: resize chart
        // debugger;
        // var courseChartPanel = wrapContainer.down('courseStatisticsChartWidget');
        // var viewStudentsChartPanel = wrapContainer.down('viewStudentsChart');
        if (Ext.isIE9m || !Ext.os.is.Desktop) {
            Ext.suspendLayouts();

            refs.senchaLogo.setWidth(new_width);

            navigationList.setWidth(new_width);
            navigationList.setMicro(collapsing);

            Ext.resumeLayouts(); // do not flush the layout here...

            // No animation for IE9 or lower...
            wrapContainer.layout.animatePolicy = wrapContainer.layout.animate = null;
            wrapContainer.updateLayout();  // ... since this will flush them
        }
        else {
            if (!collapsing) {
                // If we are leaving micro mode (expanding), we do that first so that the
                // text of the items in the navlist will be revealed by the animation.
                navigationList.setMicro(false);
            }
            navigationList.canMeasure = false;

            // Start this layout first since it does not require a layout
            refs.senchaLogo.animate({dynamic: true, to: {width: new_width}});

            // Directly adjust the width config and then run the main wrap container layout
            // as the root layout (it and its chidren). This will cause the adjusted size to
            // be flushed to the element and animate to that new size.
            navigationList.width = new_width;
            wrapContainer.updateLayout({isRoot: true});
            navigationList.el.addCls('nav-tree-animating');

            // We need to switch to micro mode on the navlist *after* the animation (this
            // allows the "sweep" to leave the item text in place until it is no longer
            // visible.
            if (collapsing) {
                navigationList.on({
                    afterlayoutanimation: function () {
                        navigationList.setMicro(true);
                        navigationList.el.removeCls('nav-tree-animating');
                        navigationList.canMeasure = true;
                    },
                    single: true
                });
            }
        }
        //
        // if (collapsing) {
        //     var viewWidth = LearningAnalytics.config.Runtime.getContainerViewWidth();
        //     var viewHeight = view.getHeight();
        //     view.animate({dynamic: true, to: {
        //         width: viewWidth * widthValue - 40,
        //         height: viewHeight * heightValue
        //     }
        //     });
        // }
        // LearningAnalytics.config.Runtime.setViewWidthHeight(courseChartPanel, 0.5, 2)
    },

    onMainViewRender:function() {
        if (window.location.hash === "" || window.location.hash === "#courses" || window.location.hash === "#dashboard") {
            this.redirectTo("dashboard");
            this.setCurrentView("dashboard");
        } else {
            this.setCurrentView(window.location.hash.replace(/^#+/i, ''));
        }
    },

    onRouteChange:function(id){
        this.setCurrentView(id);
    },

    onBeforeRender: function() {
        var viewModel = this.getViewModel();
        var store = viewModel.getStore('courses');
        var coursesTree = this.lookupReference('navigationTreeList').rootItem.getNode().getChildAt(1);

        store.load({
            callback: function(records, operation, success) {
                store.each(function(record) {
                    var jsonObj = {
                        id: record.data.id,
                        text: record.data.fullname,
                        iconCls: 'x-fa fa-book',
                        viewType: 'courses',
                        style: {
                            'margin-left': '10px'
                        },
                        // margin: '0 5 3 10',
                        leaf: true
                    };
                    coursesTree.appendChild(jsonObj);
                });
            },
            scope: this

        });
    },

    onAfterRender: function() {
        var username = this.lookupReference('username');
        var userImage = this.lookupReference('userImage');
        var object = Ext.util.Cookies.get('AccessToken');
        var cookies = JSON.parse(object);

        username.setText(cookies.full_name);
        userImage.setSrc(cookies.picture_url);
    },

    onItemClick: function (view,rec,item) {
        if (rec.node.parentNode.id === 'courses'){
            var viewModel = this.getViewModel();
            this.currentCourseId = rec.node.id;
            var store = viewModel.getStore('courseEnrolledStudents');
            store.load({
                params: {
                    courseid: this.currentCourseId
                },
                callback: function(records, operation, success) {
                    if (success === true){
                        viewModel.setData({
                            list: store,
                            enrolledusercount: records.length
                        });
                    }
                },
                scope: this
            });

            var storeCourse = viewModel.getStore('courseStatistics');
            storeCourse.load({
                params: {
                    from_date: '2015',
                    to_date: 'now',
                    query: 'all',
                    view: 'month',
                    course: this.currentCourseId
                },
                callback: function(records, operation, success) {
                    if (success === true){
                        viewModel.setData({
                            courseStatisticsData: storeCourse,
                            recs: records
                        });
                    }
                },
                scope: this
            });

            var storeCourseContents = viewModel.getStore('courseContents');
            storeCourseContents.load({
                params: {
                    courseid: this.currentCourseId
                },
                callback: function(records, operation, success) {
                    if (success === true){ //courseFileTypeNoDateText
                        debugger;
                        var message = this.lookupReference('courseFileTypeNoDataText');
                        var layout = this.getReferences().courseFileTypePieChart.getLayout();

                        if (storeCourseContents.first().filetypes().count() === 0) {
                            // message.setHidden(false);
                            layout.setActiveItem('courseFileTypeNoDataText');
                        } else {
                            // message.setHidden(true);
                            layout.setActiveItem('courseFileTypePieChartContainer');
                            viewModel.setData({
                                courseContentsFileTypes: storeCourseContents.first().filetypes()
                            });

                        }
                    }
                },
                scope: this
            });

        }
        if (rec.node.id === "logout") {
            Ext.util.Cookies.clear('AccessToken');
            Ext.create('LearningAnalytics.view.authentication.Login');
            window.location.assign('');

        }
    },

    // Controller for Courses
    onExpand: function(event, toolEl, panel) {
        var me = this;
        var chartPanel = me.lookupReference('chartCourseLog');
        var viewChart = me.lookupReference('viewCourseStatisticsChart');
        var filterContainer = me.lookupReference('filterContainerCourseLog');

        LearningAnalytics.config.Runtime.setViewWidthHeight(chartPanel, 1, 1.5);

        filterContainer.setHidden(false);
        // viewChart.axes[0].setHidden(false);
        // viewChart.axes[1].setHidden(false);

        panel.tools.expand.setHidden(true);
        panel.tools.collapse.setHidden(false);
        panel.tools.refresh.setHidden(false);
    },

    onCollapse: function(event, toolEl, panel) {
        var me = this;
        var chartPanel = me.lookupReference('chartCourseLog');
        var viewChart = me.lookupReference('viewCourseStatisticsChart');
        var filterContainer = me.lookupReference('filterContainerCourseLog');

        LearningAnalytics.config.Runtime.setViewWidthHeight(chartPanel, 0.6, 0.666666);

        filterContainer.setHidden(true);
        // viewChart.axes[0].setHidden(true);
        // viewChart.axes[1].setHidden(true);

        panel.tools.expand.setHidden(false);
        panel.tools.collapse.setHidden(true);
        panel.tools.refresh.setHidden(true);
    },

    onRefreshToggle: function(event, toolEl, panel) {
        var me = this;
        var dateFrom = me.lookupReference('dateFromCourseLog');
        var dateTo = me.lookupReference('dateToCourseLog');
        var view = me.lookupReference('actionViewCourseLog');
        var actionQuery = me.lookupReference('actionsQueryCourseLog');

        if (dateFrom.getSubmitValue() === "" || dateTo.getSubmitValue() === "" ) {
            Ext.toast({
                html: 'Please select dates',
                width: 200,
                align: 't'
            });
        } else {
            var viewModel = this.getViewModel();
            // var mask = Ext.getBody().mask('Loading, please stand by...');
            var store = viewModel.getStore('courseStatistics');
            store.load({
                params: {
                    from_date: dateFrom.getSubmitValue(),
                    to_date: dateTo.getSubmitValue(),
                    query: actionQuery.getSubmitValue(),
                    view: view.getSubmitValue(),
                    course: this.currentCourseId
                },
                callback: function(records, operation, success) {
                    if (success === true){
                        viewModel.setData({
                            recs: records,
                            courseStatisticsData: store
                        });
                    } else {
                        Ext.toast({
                            html: 'Failure.!!',
                            width: 200,
                            align: 't'
                        });

                    }
                },
                scope: this
            });

        }
    }


});
