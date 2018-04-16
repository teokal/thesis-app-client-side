Ext.define('LearningAnalytics.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    listen: {
        controller: {
            '#': {
                unmatchedroute: 'onRouteChange'
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

    setCurrentView: function (hashTag) {
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

    onMainViewRender: function () {
        if (window.location.hash === "" || window.location.hash === "#courses" || window.location.hash === "#dashboard") {
            this.redirectTo("dashboard");
            this.setCurrentView("dashboard");
        } else {
            this.setCurrentView(window.location.hash.replace(/^#+/i, ''));
        }
    },

    onRouteChange: function (id) {
        this.setCurrentView(id);
    },

    onBeforeRender: function () {
        var viewModel = this.getViewModel();
        var store = viewModel.getStore('courses');
        var coursesTree = this.lookupReference('navigationTreeList').rootItem.getNode().getChildAt(1);

        store.load({
            callback: function (records, operation, success) {
                store.each(function (record) {
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

    onAfterRender: function () {
        var username = this.lookupReference('username');
        var userImage = this.lookupReference('userImage');
        var object = Ext.util.Cookies.get('AccessToken');
        var cookies = JSON.parse(object);

        username.setText(cookies.full_name);
        userImage.setSrc(cookies.picture_url);
    },

    onItemClick: function (view, rec, item) {
        if (rec.node.parentNode.id === 'courses') {
            var viewModel = this.getViewModel();
            this.currentCourseId = rec.node.id;
            var store = viewModel.getStore('courseEnrolledStudents');
            store.load({
                params: {
                    courseid: this.currentCourseId
                },
                callback: function (records, operation, success) {
                    if (success === true) {
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
                callback: function (records, operation, success) {
                    if (success === true) {
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
                callback: function (records, operation, success) {
                    if (success === true) { //courseFileTypeNoDateText
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
    onExpand: function (event, toolEl, panel) {
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

    onCollapse: function (event, toolEl, panel) {
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

    onRefreshToggle: function (event, toolEl, panel) {
        var me = this;
        var dateFrom = me.lookupReference('dateFromCourseLog');
        var dateTo = me.lookupReference('dateToCourseLog');
        var view = me.lookupReference('actionViewCourseLog');
        var actionQuery = me.lookupReference('actionsQueryCourseLog');

        if (dateFrom.getSubmitValue() === "" || dateTo.getSubmitValue() === "") {
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
                callback: function (records, operation, success) {
                    if (success === true) {
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
            callback: function (records, operation, success) {
                if (success === true) {
                    if (records.length > 0) {
                        viewModel.setData({
                            riskAnalysisScorms: store.first().scorms(),
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
                            title: 'Risk Analysis',
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

    onCompareButtonClick: function (bt) {
        var cfg = Ext.apply({
            xtype: 'popUpWindow',
            items: [
                {
                    xtype: 'riskAnalysisSummaryChart'
                }
            ],
            title: 'Compare Chart'
        });
        Ext.create(cfg);
    },

    onComposeMessageClick: function (bt) {
        var viewModel = this.getViewModel();
        var panel = bt.up('panel');
        var layout = panel.getLayout();
        var curActiveItem = layout.getActiveItem();
        var selections = curActiveItem.items.items[0].items.items[1].getSelection();

        if (selections.length > 0) {
            viewModel.data.composeEmailStudentsData = selections;
            // var win = bt.up('window');
            // if (win) {
            //     win.close();
            // }

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
                sendersData = sendersData + element.data.name + ', ' ;
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
        var columns = view.getColumnManager().columns;
        if(columns[cellIndex].dataIndex !== 'title'){
            for (var i = 1; i < columns.length; i++) {
                if (i === cellIndex) {
                    record.set(columns[i].dataIndex, true);
                } else {
                    record.set(columns[i].dataIndex, false);
                }
            }
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
        var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        this.getViewModel().set('atBeginning', false);
        if (curActiveIndex === 0) {

            var gridStore = this.lookupReference('riskAnalysisGridPanel').items.items[0];
            var columns = gridStore.getColumnManager().columns;
            // var grid = gridStore.getStore();
            var panelStepTwo = this.lookupReference('riskAnalysisStepTwoPanel');
            var algorithOne = "", algorithTwo = "", columnsPSummary = "";

            panelStepTwo.removeAll();

            panelStepTwo.add(new Ext.form.Panel({
                html : '<p>If you want, you can change the default parameter\'s value</p>'
            }));

            algorithOne = "Y1 = ";
            algorithTwo = "Y2 = ";
            columnsPSummary = "Where: </br>";
            for (var y = 2; y < columns.length; y ++) { // create viewmodel data
                var alpha = alphabet[y-2];
                var index = eval("y-1");
                if (y > 2) {
                    algorithOne = algorithOne + " + ";
                    algorithTwo = algorithTwo + " + "
                }
                algorithOne = algorithOne + alphabet[y-2] + "1*P" + index;
                algorithTwo = algorithTwo + alphabet[y-2] + "2*P" + index;
                columnsPSummary = columnsPSummary + "P" + index + ": " + columns[index].dataIndex + "</br>";

                if (alpha !== "A" && alpha !== "B") {
                    var key1 = 'riskParameter' + alphabet[y-2] + '1';
                    var key2 = 'riskParameter' + alphabet[y-2] + '2';
                    this.getViewModel().data[key1] = 0;
                    this.getViewModel().data[key2] = 0;
                }
            }
            algorithOne = algorithOne + " + Constant1";
            algorithTwo = algorithTwo + " + Constant2";

            var fieldsFirst = [];
            var fieldsSecond = [];
            for (var index = 2; index < columns.length; index ++){
                //TODO: create and add numberfields
                var alpha = alphabet[index-2];
                fieldsFirst.push(new Ext.form.NumberField({
                        xtype: 'numberfield',
                        name: 'riskAnalysisParameter' + alpha + '1',
                        width: 180,
                        bind: '{riskParameter' + alpha + '1}',
                        margin: '0 30 5 0',
                        forcePrecision: true,
                        decimalPrecision: 10,
                        fieldLabel: alpha+'1',
                        labelAlign: 'top',
                        allowBlank: false
                    })
                );

                fieldsSecond.push(new Ext.form.NumberField({
                        xtype: 'numberfield',
                        name: 'riskAnalysisParameter' + alpha + '2',
                        width: 180,
                        bind: '{riskParameter' + alpha + '2}',
                        margin: '0 30 5 0',
                        forcePrecision: true,
                        decimalPrecision: 10,
                        fieldLabel: alpha+'2',
                        labelAlign: 'top',
                        allowBlank: false
                    })
                )
            }

            fieldsFirst.push(new Ext.form.NumberField({
                    xtype: 'numberfield',
                    name: 'riskParameterConstant1',
                    width: 180,
                    bind: '{riskParameterConstant1}',
                    margin: '0 30 5 0',
                    forcePrecision: true,
                    decimalPrecision: 10,
                    fieldLabel: 'Constant1',
                    labelAlign: 'top',
                    allowBlank: false
                })
            );

            fieldsSecond.push(new Ext.form.NumberField({
                    xtype: 'numberfield',
                    name: 'riskParameterConstant2',
                    width: 180,
                    bind: '{riskParameterConstant2}',
                    margin: '0 30 5 0',
                    forcePrecision: true,
                    decimalPrecision: 10,
                    fieldLabel: 'Constant2',
                    labelAlign: 'top',
                    allowBlank: false
                })
            );

            panelStepTwo.add(new Ext.form.Panel({
                layout: {
                    type:'hbox',
                    align:'stretch'
                },
                items: [{  }],
                listeners: {
                    afterrender: function(){
                        for (var i=0; i < fieldsFirst.length; i ++) {
                            this.add(fieldsFirst[i])
                        }
                    }
                }

            }));

            panelStepTwo.add(new Ext.form.Panel({
                layout: {
                    type:'hbox',
                    align:'stretch'
                },
                items: [{  }],
                listeners: {
                    afterrender: function(){
                        for (var i=0; i < fieldsSecond.length; i ++) {
                            this.add(fieldsSecond[i])
                        }
                    }
                }

            }));
            panelStepTwo.add(new Ext.form.Panel({
                html : '<p><b>' + algorithOne + '</b></br>' +
                '<b>' + algorithTwo + '</b></br></br>' +
                columnsPSummary + '</p>'
            }));

        } else if(curActiveIndex === 1) {
            var grid = this.lookupReference('riskAnalysisGridPanel').items.items[0];
            var gridStore = grid.getStore();
            var itemsCount = gridStore.count();
            var columns = grid.getColumnManager().columns;
            var studentsStore = viewModel.data.riskAnalysisUsers;
            var scormsDataForStudent;
            var item, scormData, resultY1, resultY2;
            var student;
            var result = [], summary = [], parameters = [], variableP = [], studentCourseDetails = [];

            for (var i = 0; i < itemsCount; i++) {
                summary.push({
                    index: i,
                    title: gridStore.getAt(i).data.title,
                    success: 0,
                    failure: 0
                });
                studentCourseDetails.push({
                    index: i,
                    title: gridStore.getAt(i).data.title,
                    activityResult: false
                })

            }

            for (var y = 0; y < columns.length - 2; y ++) {
                parameters.push('riskParameter' + alphabet[y] + '1');
                parameters.push('riskParameter' + alphabet[y] + '2');
            }
            parameters.push('riskParameterConstant1');
            parameters.push('riskParameterConstant2');

            for (var studentIndex = 0; studentIndex < studentsStore.count(); studentIndex++) {
                student = studentsStore.getAt(studentIndex);
                scormsDataForStudent = student.analysis();
                variableP = [];
                for (var i = 0; i < itemsCount; i++) {
                    item = gridStore.getAt(i);
                    scormData = scormsDataForStudent.getAt(i);
                    if (typeof item.data['None'] === 'undefined') {
                        summary[i].failure ++;
                        studentCourseDetails[i].activityResult = false;
                    } else {
                        // TODO: calculate the A1, B1 etc
                        for (var columnIndex = 1; columnIndex < columns.length; columnIndex ++){
                            var columnDataIndex = columns[columnIndex].dataIndex;
                            if (item.data[columnDataIndex] === true) {
                                if (scormData.data.value === true) {
                                    summary[i].success ++;
                                    studentCourseDetails[i].activityResult = true;
                                    var found = variableP.some(function (el) {
                                        if (el.id === columnDataIndex) {
                                            el.success += 1;
                                            el.all += 1;
                                            return true
                                        }
                                        return false
                                    });
                                    if (!found){
                                        variableP.push({
                                            id: columnDataIndex,
                                            success: 1,
                                            all: 1
                                        })
                                    }
                                } else {
                                    summary[i].failure ++;
                                    studentCourseDetails[i].activityResult = false;
                                    var found = variableP.some(function (el) {
                                        if (el.id === columnDataIndex) {
                                            el.all += 1;
                                            return true
                                        }
                                        return false
                                    });
                                    if (!found){
                                        variableP.push({
                                            id: columnDataIndex,
                                            success: 0,
                                            all: 1
                                        })
                                    }
                                }
                            }
                        }
                    }
                }
                resultY1 = 0;
                resultY2 = 0;
                for (var columnI = 0; columnI < columns.length - 2; columnI ++) {
                    if (typeof variableP[columnI] === 'undefined') {
                        resultY1 += 0;
                        resultY2 += 0;
                    } else if (typeof variableP[columnI].success === 'undefined') {
                        resultY1 += 0;
                        resultY2 += 0;
                    } else {
                        resultY1 += viewModel.data[parameters[(columnI)*2]] * (variableP[columnI].success / variableP[columnI].all);
                        resultY2 += viewModel.data[parameters[(columnI)*2 + 1]] * (variableP[columnI].success / variableP[columnI].all)
                    }
                }
                resultY1 += viewModel.data.riskParameterConstant1;
                resultY2 += viewModel.data.riskParameterConstant2;
                viewModel.data.riskAnalysisResultsId = student.data.id;
                viewModel.data.riskAnalysisResultsName = student.data.name;

                viewModel.data.riskAnalysisResultsStatus = resultY1 > resultY2;

                result.push({
                    id: student.data.id,
                    name: student.data.name,
                    status: viewModel.data.riskAnalysisResultsStatus
                });

                for (var itemIndex = 0; itemIndex < itemsCount; itemIndex++) {
                    result[result.length - 1][studentCourseDetails[itemIndex].title] = studentCourseDetails[itemIndex].activityResult;
                }
            }

            viewModel.data.riskAnalysisResultChart = summary;

            var storeSummary =  viewModel.getStore('courseRiskAnalysisSummary');
            storeSummary.addData(summary);

            var mystore = viewModel.getStore('courseRiskAnalysisResults');
            mystore.addData(result)
        }
        else if(curActiveIndex === 2) {


        }
        this.navigate(button, panel, 'next');
    },

    onDetailsButtonClick: function(button){
        var gridView = this.lookupReference('riskAnalysisResultsGridPanel').items.items[0];
        var gridActivity = this.lookupReference('riskAnalysisGridPanel').items.items[0];
        var gridStore = gridActivity.getStore();
        var itemsCountActivity = gridStore.count();

        for (var i = 0; i < itemsCountActivity; i++) {
            var column = Ext.create('Ext.grid.column.Column', {
                text: gridStore.getAt(i).data.title,
                dataIndex: gridStore.getAt(i).data.title,
                width: 150,
                renderer: function(value) {
                    return '<span class="x-fa '+ (value ? 'fa-check-circle' : 'fa-exclamation-circle') +'" style="color:'+ (value ? 'green' : 'red') + '"></span>';
                }
            });
            gridView.headerCt.insert(gridView.getColumnManager().columns.length - 1, column);
        }

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

        if (activeIndex === 2) {
            this.getViewModel().set('atResultPage', true);
        } else {
            this.getViewModel().set('atResultPage', false);
        }
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
        if (activeIndex === 2) {
            model.set('atEnd', true);
        }
    },

    onRiskAnalysisChartDownload: function() {
        if (Ext.isIE8) {
            Ext.Msg.alert('Unsupported Operation', 'This operation requires a newer version of Internet Explorer.');
            return;
        }
        var chart = this.lookupReference('viewRiskAnalysisSummaryChart');
        if (Ext.os.is.Desktop) {
            chart.download({
                filename: 'Risk Analysis Summary'
            });
        } else {
            chart.preview();
        }
    },

    onAddColumn: function() {
        Ext.MessageBox.prompt('Add Column', 'Enter the column name:', function(btnText, sInput){
            if(btnText === 'ok'){
                var gridView = this.lookupReference('riskAnalysisGridPanel').items.items[0];
                var column = Ext.create('Ext.grid.column.Column', {
                    text: sInput,
                    dataIndex: sInput,
                    id: sInput,
                    width: 130,
                    renderer: function(value) {
                        return '<span class="x-fa fa-'+ (value ? 'check-square-o' : 'square-o') +'"></span>';
                    }
                });
                gridView.headerCt.insert(gridView.getColumnManager().columns.length - 1, column);
            }
        }, this);
    },

    onRemoveColumn: function() {
        var grid = this.lookupReference('riskAnalysisGridPanel');
        var gridView = this.lookupReference('riskAnalysisGridPanel').items.items[0];
        var columns = gridView.getColumnManager().columns;
        var result = "";
        for (var i=0; i < columns.length; i++) {
            if (columns[i].dataIndex !== "None" && columns[i].dataIndex !== "title"){
                result = result + '<option value="' + columns[i].dataIndex + '">' + columns[i].dataIndex + '</option>';
            }
        }
        Ext.MessageBox.show({
            title: 'Delete Column',
            msg: 'Select which column to delete.<br /><br /><select style="height:25px;width:200px;font-size:12px;" id="columnToBeRemoved">' +
            result +
            '</select>',
            width:300,
            buttons: Ext.MessageBox.OKCANCEL,
            multiline: false,
            fn: function(btn) {
                if (btn === 'ok') {
                    gridView.headerCt.remove(Ext.get('columnToBeRemoved').getValue());
                    grid.getView().refresh();
                }
            }
        });
    }

});
