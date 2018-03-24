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
                    viewed: view.getSubmitValue(),
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
    },

    // RiskAnalysis Controller
    onRiskAnalysisClick: function () {
        var viewModel = this.getViewModel();
        var store = viewModel.getStore('riskAnalysis');
        store.load({
            params: {
                courseid: this.currentCourseId
            },
            callback: function(records, operation, success) {
                if (success === true){
                    if (records.length > 0) {
                        viewModel.setData({
                            riskAnalysisScorms:  store.first().scorms(),
                            riskAnalysisUsers: store.first().users(),
                            riskAnalysisUsersAnalysis: store.first().users().first().analysis()
                        });

                        var cfg = Ext.apply({
                            xtype: 'popUpWindow',
                            reference: 'riskAnalysisGridWindow',
                            items: [
                                {
                                    id: 'riskAnalysisGridWindow',
                                    // reference: 'riskAnalysisGridWindow',
                                    xtype: 'riskAnalysisWindowForm'
                                }
                            ],
                            title: 'Risk Analysis Overview'
                        });

                        Ext.create(cfg);
                    } else {
                        Ext.Msg.alert({
                            title:'Risk Analysis',
                            message: 'This course does not have any scorm data for students',
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            draggable: false
                        });
                    }
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
    },

    // onCompareButtonClick: function (bt) {
    //     var win = bt.up('window');
    //     var heigh = win.getY();
    //     win.setPosition([ 0, heigh - 1 ]);
    //     win.modal = false;
    //     bt.hide();
    //     var cfg = new Ext.apply({
    //         xtype: 'popUpWindow',
    //         modal: false,
    //         title: 'Students Overview - Compare',
    //         reference: 'compareWindow',
    //
    //         items: [
    //             {
    //                 id: 'compareWindow',
    //                 xtype: 'riskAnalysisWindow',
    //                 bbar: {
    //                     overflowHandler: 'menu',
    //                     items: [
    //                         '->',
    //                         {
    //                             xtype: 'button',
    //                             ui: 'soft-green',
    //                             text: 'Compose Message',
    //                             disabled: false,
    //                             handler: 'onComposeMessageClick'
    //                         }
    //                     ]
    //                 }
    //
    //
    //             }
    //         ],
    //
    //         syncSize: function () {
    //             var width = Ext.Element.getViewportWidth(),
    //                 height = Ext.Element.getViewportHeight();
    //             this.setSize(Math.floor(width * 0.5), Math.floor(height * 0.6));
    //             this.setPosition([ Math.floor(width * 0.5), Math.floor(height * 0.20) ]);
    //         }
    //
    //     });
    //
    //     Ext.create(cfg);
    // },

    onComposeMessageClick: function (bt) {
        var viewModel = this.getViewModel();
        var selections = bt.getRefOwner().ownerCt.items.items[0].getSelection();
        if (selections.length > 0) {
            viewModel.data.composeEmailStudentsData = selections;
            var win = bt.up('window');
            if (win) {
                win.close();
            }

            var cfg = Ext.apply({
                xtype: 'popUpWindow',
                items: [
                    {
                        xtype: 'composeMessage',
                        sendersName: '',

                        beforeRender: function () {
                            Ext.ComponentQuery.query('[name=composeMessageToTextField]')[0].setValue(this.sendersName)
                        }
                    }
                ],
                title: 'Compose Message'

            });

            var sendersData = '';
            selections.forEach(function(element) {
                sendersData = sendersData + element.data.fullname + ', ' ;
            });

            cfg.items[0].sendersName = sendersData ;
            Ext.create(cfg);
        } else {
            Ext.Msg.alert({
                title:'Compose Message',
                message: 'Please select one or more students to send a message',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.INFO,
                draggable: false
            });
        }
    },

    onComposeDiscardClick: function(bt) {
        var win = bt.up('window');
        if (win) {
            win.close();
        }
    },

    onComposeSendClick: function(bt) {
        var viewModel = this.getViewModel();
        var message = this.lookupReference('composeMessageEditor').getValue();
        var students = viewModel.data.composeEmailStudentsData;
        Ext.toast({
            html: 'Coming soon!!',
            width: 200,
            align: 't'
        });
    },

    onRiskAnalysisGridCellItemClick: function(view, td, cellIndex, record){
        if(cellIndex > 0){
            record.set('page', false);
            record.set('quiz', false);
            record.set('none', false);
        }
        if (cellIndex === 1) {
            record.set('page', !record.get('page'));
        }
        if (cellIndex === 2) {
            record.set('quiz', !record.get('quiz'));
        }
        if (cellIndex === 3) {
            record.set('none', !record.get('none'));
        }
    },

    initForRiskForm: function(view) {
        var tb = this.lookupReference('navigation-toolbar'),
            buttons = tb.items.items,
            ui = view.colorScheme;

        //Apply styling buttons
        if (ui) {
            buttons[1].setUI(ui);
            buttons[2].setUI(ui);
        }
    },

    onNextClick: function(button) {
        var panel = button.up('panel');
        var layout = panel.getLayout();
        var curActiveItem = layout.getActiveItem();
        var curActiveIndex = panel.items.indexOf(curActiveItem);
        var viewModel = this.getViewModel();

        this.getViewModel().set('atBeginning', false);
        if (curActiveIndex === 0) {

        } else if(curActiveIndex === 1) {
            var gridStore = this.lookupReference('riskAnalysisGridPanel').items.items[0].getStore();
            var itemsCount = gridStore.count();
            var studentsStore = viewModel.data.riskAnalysisUsers;
            var scormsDataForStudent;
            var item, scormData, parameterP1, parameterP2, resultY1, resultY2;
            var student, pageAll, pageSuccess, quizAll, quizSuccess;
            var result = [];
            var parameterA1 = viewModel.data.riskParameterA1,
                parameterB1 = viewModel.data.riskParameterB1,
                parameterC1 = viewModel.data.riskParameterC1,
                parameterA2 = viewModel.data.riskParameterA2,
                parameterB2 = viewModel.data.riskParameterB2,
                parameterC2 = viewModel.data.riskParameterC2;

            for (var studentIndex = 0; studentIndex < studentsStore.count(); studentIndex++) {
                student = studentsStore.getAt(studentIndex);
                scormsDataForStudent = student.analysis();
                pageAll = 0, pageSuccess = 0, quizAll = 0, quizSuccess = 0;
                for (var i = 0; i < itemsCount; i++) {
                    item = gridStore.getAt(i);
                    scormData = scormsDataForStudent.getAt(i);
                    if (typeof item.data.none === 'undefined' || typeof item.data.quiz === 'undefined' || typeof item.data.page === 'undefined') {
                    } else {
                        // TODO: calculate the A1, B1 etc
                        if (item.data.page === true) {
                            pageAll ++;
                            if (scormData.data.value === true){
                                pageSuccess ++;
                            }
                        } else if(item.data.quiz === true) {
                            quizAll ++;
                            if (scormData.data.value === true){
                                quizSuccess ++;
                            }
                        }
                    }
                }
                parameterP1 = ( pageSuccess / pageAll );
                parameterP2 = ( quizSuccess / quizAll );

                resultY1 = parameterA1 * parameterP1 + parameterB1 * parameterP2 - parameterC1;
                resultY2 = parameterA2 * parameterP1 + parameterB2 * parameterP2 - parameterC2;
                viewModel.data.riskAnalysisResultsId = student.data.id;
                viewModel.data.riskAnalysisResultsName = student.data.name;

                viewModel.data.riskAnalysisResultsStatus = resultY1 > resultY2;

                result.push({
                    id: student.data.id,
                    name: student.data.name,
                    status: viewModel.data.riskAnalysisResultsStatus
                });
            }

            var mystore = viewModel.getStore('courseRiskAnalysisResults');
            mystore.load({
                params: {
                    data: JSON.stringify(result)
                },
                callback: function(records, operation, success) {
                    if (success === true){
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
        this.navigate(button, panel, 'next');
    },

    onPreviousClick: function(button) {
        var panel = button.up('panel');

        this.getViewModel().set('atEnd', false);
        this.navigate(button, panel, 'prev');
    },

    navigate: function(button, panel, direction) {
        var layout = panel.getLayout(),
            progress = this.lookupReference('progress'),
            model = this.getViewModel(),
            progressItems = progress.items.items,
            item, i, activeItem, activeIndex;

        layout[direction]();

        activeItem = layout.getActiveItem();
        activeIndex = panel.items.indexOf(activeItem);

        for (i = 0; i < progressItems.length; i++) {
            item = progressItems[i];

            if (activeIndex === item.step) {
                item.setPressed(true);
            }
            else {
                item.setPressed(false);
            }

            // IE8 has an odd bug with handling font icons in pseudo elements;
            // it will render the icon once and not update it when something
            // like text color is changed via style addition or removal.
            // We have to force icon repaint by adding a style with forced empty
            // pseudo element content, (x-sync-repaint) and removing it back to work
            // around this issue.
            // See this: https://github.com/FortAwesome/Font-Awesome/issues/954
            // and this: https://github.com/twbs/bootstrap/issues/13863
            if (Ext.isIE8) {
                item.btnIconEl.syncRepaint();
            }
        }

        activeItem.focus();

        // beginning disables previous
        if (activeIndex === 0) {
            model.set('atBeginning', true);
        }

        // wizard is 4 steps. Disable next at end.
        if (activeIndex === 3) {
            model.set('atEnd', true);
        }
    },

});
