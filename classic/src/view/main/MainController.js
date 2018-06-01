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
                    course_id: this.currentCourseId
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
                    query: 'viewed',
                    view: 'month',
                    module: 'course',
                    course_id: this.currentCourseId
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
                    course_id: this.currentCourseId
                },
                callback: function (records, operation, success) {
                    if (success === true) { //courseFileTypeNoDateText
                        var layout = this.getReferences().courseFileTypePieChart.getLayout();

                        if (storeCourseContents.first().filetypes().count() === 0) {
                            layout.setActiveItem('courseFileTypeNoDataText');
                        } else {
                            layout.setActiveItem('courseFileTypePieChartContainer');
                            viewModel.setData({
                                courseContentsFileTypes: storeCourseContents.first().filetypes()
                            });

                        }
                    }
                },
                scope: this
            });

            var storeCourseModule = viewModel.getStore('courseModules');
            storeCourseModule.load({
                params: {
                    course_id: this.currentCourseId
                },
                callback: function (records, operation, success) {
                    if (success === true) { 
                    }
                },
                scope: this
            });
            this.loadCourseCategoriesGraph();
        }
        if (rec.node.id === "logout") {
            Ext.util.Cookies.clear('AccessToken');
            Ext.create('LearningAnalytics.view.authentication.Login');
            window.location.assign('');
        }
    },

    loadCourseCategoriesGraph: function() {
        var viewModel = this.getViewModel();
        var storeCourseCategoriesGraph = viewModel.getStore('courseCategoriesGraph');
        storeCourseCategoriesGraph.load({
            params: {
                course_id: this.currentCourseId
            },
            callback: function (records, operation, success) {
                if (success === true) { 
                    var layout = this.getReferences().courseCategoriesGraphPieChart.getLayout();
                    if (storeCourseCategoriesGraph.data.items.length === 0) {
                        layout.setActiveItem('courseCategoriesGraphNoDataText');
                    } else {
                        layout.setActiveItem('courseCategoriesGraphPieChartContainer');
                    }
                }
            },
            scope: this
        });
    },

    // Controller for Courses
    onExpand: function (event, toolEl, panel) {
        var me = this;
        var chartPanel = me.lookupReference('chartCourseLog');
        var viewChart = me.lookupReference('viewCourseStatisticsChart');
        var filterContainer = me.lookupReference('filterContainerCourseLog');

        LearningAnalytics.config.Runtime.setViewWidthHeight(chartPanel, 1, 1.5);

        filterContainer.setHidden(false);

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

        panel.tools.expand.setHidden(false);
        panel.tools.collapse.setHidden(true);
        panel.tools.refresh.setHidden(true);
    },

    onRefreshToggle: function (event, toolEl, panel) {
        var me = this;
        var dateFrom = me.lookupReference('dateFromCourseLog');
        var dateTo = me.lookupReference('dateToCourseLog');
        var view = me.lookupReference('actionViewCourseLog');
        var modules = me.lookupReference('courseModulesCombo');

        if (dateFrom.getSubmitValue() === "" || dateTo.getSubmitValue() === "") {
            Ext.toast({
                html: 'Please select dates',
                width: 200,
                align: 't'
            });
        } else {
            var viewModel = this.getViewModel();
            var store = viewModel.getStore('courseStatistics');
            store.load({
                params: {
                    from_date: dateFrom.getSubmitValue(),
                    to_date: dateTo.getSubmitValue(),
                    query: 'viewed',
                    view: view.getSubmitValue(),
                    module: 'course_module',
                    module_ids: viewModel.data.courseModulesId,
                    course_id: this.currentCourseId
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

    onModuleComboSelect: function (combo, records) {
        var node;
        var viewModel = this.getViewModel();

        Ext.each(records, function (rec) {                                
            node = combo.getPicker().getNode(rec);
            Ext.get(node).down('input').dom.checked = true;
            viewModel.setData({
                courseModulesId: rec.data.id
            })
        });
    },

    // RiskAnalysis Controller
    onRiskAnalysisClick: function () {
        var me = this;
        var viewModel = this.getViewModel();

        Ext.Ajax.request({
            url: '/api/1/courses/initialized_course',
            method: 'GET',
            params: {
                course_id: this.currentCourseId
            },
            useDefaultXhrHeader: false,
            cors: true,
            headers: {
                'Authorization': ''
            },
            callback:function(records, operation, success){
                var jsonData = Ext.util.JSON.decode(success.responseText);
                var statusMessage = jsonData.response.type;
                if(statusMessage === 'ok'){
                    if (jsonData.response.data.initialized_course) {
                        me.initCourseCategoriesActivitiesStore();
                    } else {
                        Ext.Msg.alert({
                            title: 'Risk Analysis',
                            message: 'Please first initialize the activity type',
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            draggable: false
                        });    
                    }
                } else {
                    Ext.Msg.alert({
                        title: 'Risk Analysis',
                        message: 'Something went wrong',
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO,
                        draggable: false
                    });
                }
            }
        });
                    
        var store = viewModel.getStore('riskAnalysis');
        var storeParameters = viewModel.getStore('courseParameters');
        Ext.getBody().mask('Please wait', 'loading');

        store.load({
            params: {
                course_id: this.currentCourseId
            },
            callback: function (records, operation, success) {
                if (success === true) {
                    if (records.length > 0) {
                        viewModel.setData({
                            riskAnalysisUsers: store.first().users()
                        });

                        storeParameters.load({
                            params: {
                                course_id: this.currentCourseId
                            },
                            callback: function (records, operation, success) {
                                if (success === true) {
                                    if (records[0].data.constants.length === 0) {
                                        viewModel.setData({
                                            riskAnalysisParameters: records[0].data.parameters,
                                            riskParameterConstant1: 0,
                                            riskParameterConstant2: 0
                                        });    
                                    } else {
                                        viewModel.setData({
                                            riskAnalysisParameters: records[0].data.parameters,
                                            riskParameterConstant1: records[0].data.constants[1],
                                            riskParameterConstant2: records[0].data.constants[2]
                                        });    
                                    }
            
                                    var cfg = Ext.apply({
                                        xtype: 'popUpWindow',
                                        reference: 'riskAnalysisGridWindow',
                                        items: [
                                            {
                                                id: 'riskAnalysisGridWindow',
                                                xtype: 'riskAnalysisWindowForm'
                                            }
                                        ],
                                        title: 'Risk Analysis Overview'
                                    });
                                    Ext.create(cfg);     
                                    this.initRiskAnalysisParameters();       
                                } else {

                                }
                            },
                            scope: this
                        });
                
                        Ext.getBody().unmask();
                    } else {
                        Ext.Msg.alert({
                            title: 'Risk Analysis',
                            message: 'This course does not have any scorm data for students',
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            draggable: false
                        });
                    }
                    Ext.getBody().unmask();
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
        var me = this;
        var viewModel = this.getViewModel();
        var message = this.lookupReference('composeMessageEditor').getValue();
        var students = viewModel.data.composeEmailStudentsData;
        var studentsId = [];
        if (message === "") {
            Ext.Msg.alert('Message is empty');
        } else {
            for (var i=0; i<students.length; i++){
                studentsId.push(students[i].id);
            }
            Ext.Ajax.request({
                url: '/api/1/send_message',
                method: 'POST',
                jsonData: {
                    'student_ids' : studentsId,
                    'message' : message
                },
                useDefaultXhrHeader: false,
                cors: true,
                headers: {
                    'Authorization': ''
                },
                callback:function(records, operation, success){
                    var jsonData = Ext.util.JSON.decode(success.responseText);
                    var statusMessage = jsonData.response.status;
                    if (statusMessage === 'success') {
                        Ext.WindowManager.getActive().close();
                    }
                    Ext.Msg.alert(jsonData.response.data);
                }
            });
        }
    },

    onRiskAnalysisGridCellItemClick: function(view, td, cellIndex, record){
        var columns = view.getColumnManager().columns;
        if(columns[cellIndex].dataIndex !== 'title'){
            for (var i = 1; i < columns.length; i++) {
                if (i === cellIndex) {
                    record.set(columns[i].dataIndex.toString(), true);
                } else {
                    record.set(columns[i].dataIndex.toString(), false);
                }
            }
        }        
        var grid = this.lookupReference('riskAnalysisGridPanel');
        grid.getView().refresh();
    },

    initForRiskForm: function(view) {
        var viewModel = this.getViewModel();

        var tb = this.lookupReference('navigation-toolbar'),
            buttons = tb.items.items,
            ui = view.colorScheme;

        //Apply styling buttons
        if (ui) {
            buttons[1].setUI(ui);
            buttons[2].setUI(ui);
        }
        viewModel.set('atBeginning', true);
        viewModel.set('atEnd', false);
        viewModel.set('atResultPage', false);
    },

    //RiskAnalysis Form
    onNextClick: function(button) {
        var panel = button.up('panel');
        var layout = panel.getLayout();
        var curActiveItem = layout.getActiveItem();
        var curActiveIndex = panel.items.indexOf(curActiveItem);

        this.getViewModel().set('atBeginning', false);
        if (curActiveIndex === 0) {
            this.initRiskAnalysisResult();
        } 
        this.navigate(button, panel, 'next');
    },

    initRiskAnalysisParameters: function() {
        var viewModel = this.getViewModel();
        var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        var parameters = viewModel.data.riskAnalysisParameters;

        var panelStepTwo = this.lookupReference('riskAnalysisStepTwoPanel');
        var algorithOne = "", algorithTwo = "", columnsPSummary = "";
        panelStepTwo.removeAll();

        panelStepTwo.add(new Ext.form.Panel({
            html : '<p>Please select the dates to calculate the risk analysis.</p>'
        }));

        panelStepTwo.add(new Ext.form.Panel({
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'datefield',
                    reference: 'dateFromRiskAnalysis',
                    name: 'dateFromRiskAnalysis',
                    itemId: 'dateFromRiskAnalysis',
                    format: 'Y-m-d',
                    labelAlign: 'top',
                    labelSeparator: '',
                    endDateField: 'dateToRiskAnalysis',
                    submitFormat: 'd-m-Y',
                    padding: '0 0 0 30',
                    fieldLabel: 'Date From',
                    maxWidth: 200,
                    flex: 1
                },
                {
                    reference: 'dateToRiskAnalysis',
                    xtype: 'datefield',
                    format: 'Y-m-d',
                    labelAlign: 'top',
                    labelSeparator: '',
                    name: 'dateToRiskAnalysis',
                    itemId: 'dateToRiskAnalysis',
                    startDateField: 'dateFromRiskAnalysis',
                    submitFormat: 'd-m-Y',
                    padding: '0 0 0 30',
                    fieldLabel: 'Date To',
                    maxWidth: 200,
                    flex: 1
                }
            ]
        }));

        panelStepTwo.add(new Ext.form.Panel({
            html : '</br><p>If you want, you can change the default parameter\'s value</p>'
        }));

        algorithOne = "Y1 = ";
        algorithTwo = "Y2 = ";
        columnsPSummary = "Where: </br>";
        var indexForName = 0;
        for (var y = 0; y < parameters.length; y ++) { // create viewmodel data
            var alpha = alphabet[y];
            var index = eval("y");
            var columnName = parameters[index].category_name;
            if (columnName !== "None") {
                if (indexForName > 0) {
                    algorithOne = algorithOne + " + ";
                    algorithTwo = algorithTwo + " + "
                }
                algorithOne = algorithOne + alphabet[indexForName] + "1*P" + index;
                algorithTwo = algorithTwo + alphabet[indexForName] + "2*P" + index;
                columnsPSummary = columnsPSummary + "P" + index + ": " + columnName + "</br>";

                var key1 = 'riskParameter' + alphabet[indexForName] + '1';
                var key2 = 'riskParameter' + alphabet[indexForName] + '2';
                this.getViewModel().data[key1] = parameters[index][1];
                this.getViewModel().data[key2] = parameters[index][2];
                indexForName += 1;
            }
        }
        algorithOne = algorithOne + " + Constant1";
        algorithTwo = algorithTwo + " + Constant2";

        var fieldsFirst = [];
        var fieldsSecond = [];
        indexForName = 0;
        for (var index = 0; index < parameters.length; index ++){
            var columnName = parameters[index].category_name;
            if ( columnName === "None" ){ continue; }
            var alpha = alphabet[indexForName];
            indexForName += 1;
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
    },

    initRiskAnalysisResult: function() {
        var viewModel = this.getViewModel();
        var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        var gridStore = viewModel.data.riskAnalysisScorms;
        var itemsCount = viewModel.data.riskAnalysisScorms.data.length;
        var columns = viewModel.data.courseActivityColumns;
        var columnParameters = viewModel.data.riskAnalysisParameters;
        var studentsStore = viewModel.data.riskAnalysisUsers;
        var scormsDataForStudent;
        var item, scormData, resultY1, resultY2;
        var student;
        var result = [], summary = [], parameters = [], variableP = [], studentCourseDetails = [];
        var parametersToSave = [];
        var constantsToSave = {};
        constantsToSave["1"] = viewModel.data.riskParameterConstant1;
        constantsToSave["2"] = viewModel.data.riskParameterConstant2;

        var indexForName = 0;
        for (var i=0; i < columnParameters.length; i++) {
            var tempResult = {};
            if (columnParameters[i].category_name !== 'None' ){
                tempResult['category_id']= columnParameters[i].category_id;
                tempResult['category_name'] = columnParameters[i].category_name
                var key1 = 'riskParameter' + alphabet[indexForName] + '1';
                var key2 = 'riskParameter' + alphabet[indexForName] + '2';
                tempResult["1"]= this.getViewModel().data[key1];
                tempResult["2"]= this.getViewModel().data[key2];
                indexForName += 1;
                parametersToSave.push(tempResult);
            }    
        }

        Ext.Ajax.request({
            url: '/api/1/courses/categories_parameters',
            method: 'POST',
            jsonData: {
                'course_id': this.currentCourseId,
                'parameters': parametersToSave,
                'constants': constantsToSave
            },
            useDefaultXhrHeader: false,
            cors: true,
            headers: {
                'Authorization': ''
            },    
            callback:function(records, operation, success){
                var jsonData = Ext.util.JSON.decode(success.responseText);
                var statusMessage = jsonData.response.type;
                if(statusMessage === 'ok'){
                } else {
                }
            }
        });        

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

        for (var y = 0; y < columnParameters.length - 2; y ++) {
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
                if (Object.keys(item.data).length < 2) {
                    summary[i].failure ++;
                    studentCourseDetails[i].activityResult = false;
                } else {
                    for (var columnIndex = 1; columnIndex < columnParameters.length; columnIndex ++){
                        var columnDataIndex = columnParameters[columnIndex].category_id;
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
            for (var columnI = 0; columnI < columns.length; columnI ++) {
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

            result.push({
                id: student.data.id,
                name: student.data.name,
                status: resultY1 > resultY2
            });

            for (var itemIndex = 0; itemIndex < itemsCount; itemIndex++) {
                result[result.length - 1][studentCourseDetails[itemIndex].title] = studentCourseDetails[itemIndex].activityResult;
            }
        }

        var storeSummary =  viewModel.getStore('courseRiskAnalysisSummary');
        storeSummary.addData(summary);

        var mystore = viewModel.getStore('courseRiskAnalysisResults');
        mystore.addData(result);
    },

    onDetailsButtonClick: function(button){
        var viewModel = this.getViewModel();
        var gridView = this.lookupReference('riskAnalysisResultsGridPanel').items.items[0];
        var gridStore = viewModel.data.riskAnalysisScorms;
        var itemsCountActivity = gridStore.count();

        Ext.getBody().mask('Please wait', 'loading').dom.style.zIndex = '99999';

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

        Ext.getBody().unmask();
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

        if (activeIndex === 1) {
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

        // wizard is 2 steps. Disable next at end.
        if (activeIndex === 1) {
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
                var me = this;
                Ext.Ajax.request({
                    url: '/api/1/courses/categories',
                    method: 'POST',
                    jsonData: {
                        'name' : sInput,
                        'course_id' : this.currentCourseId
                    },
                    useDefaultXhrHeader: false,
                    cors: true,
                    headers: {
                        'Authorization': ''
                    },    
                    callback:function(records, operation, success){
                        var jsonData = Ext.util.JSON.decode(success.responseText);
                        var statusMessage = jsonData.response.status;
                        var columnId = jsonData.response.data.id;
                        var columnName = jsonData.response.data.name;
                        if(statusMessage === 'success'){
                            var gridView = me.lookupReference('riskAnalysisGridPanel').items.items[0];
                            var column = Ext.create('Ext.grid.column.Column', {
                                text: columnName,
                                dataIndex: columnId,
                                id: 'column_'+columnId,
                                width: 130,
                                renderer: function(value) {
                                    return '<span class="x-fa fa-'+ (value ? 'check-square-o' : 'square-o') +'"></span>';
                                }
                            });
                            gridView.headerCt.insert(gridView.getColumnManager().columns.length - 1, column);            
                        } else {
                            Ext.Msg.alert({
                                title: 'Something went wrong',
                                message: 'Couldn\'t add type',
                                buttons: Ext.Msg.OK,
                                icon: Ext.Msg.INFO,
                                draggable: false
                            });    
                        }
                    }
                });
        
            }
        }, this);
    },

    onRemoveColumn: function() {
        var grid = this.lookupReference('riskAnalysisGridPanel');
        var gridView = this.lookupReference('riskAnalysisGridPanel').items.items[0];
        var columns = gridView.getColumnManager().columns;
        var result = "";
        for (var i=0; i < columns.length; i++) {
            if (columns[i].text !== "None" && columns[i].text !== "Activity"){
                result = result + '<option value="' + columns[i].text + '">' + columns[i].text + '</option>';
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
                    var itemText = Ext.get('columnToBeRemoved').getValue();
                    var itemId = 0;
                    for (var i=0; i < columns.length; i++) {
                        if (columns[i].text === itemText){
                            itemId = columns[i].id;
                        }
                    }
                    Ext.Ajax.request({
                        url: '/api/1/courses/categories',
                        method: 'DELETE',
                        jsonData: {
                            'id' : itemId.replace('column_','')
                        },
                        useDefaultXhrHeader: false,
                        cors: true,
                        headers: {
                            'Authorization': ''
                        },    
                        callback:function(records, operation, success){
                            var jsonData = Ext.util.JSON.decode(success.responseText);
                            var statusMessage = jsonData.response.status;
                            var columnId = jsonData.response.data.id;
                            var columnName = jsonData.response.data.name;
                            if(statusMessage === 'success'){
                                gridView.headerCt.remove(itemId);
                                grid.getView().refresh();            
                            } else {
                                Ext.Msg.alert({
                                    title: 'Something went wrong',
                                    message: 'Couldn\'t remove type',
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.Msg.INFO,
                                    draggable: false
                                });    
                            }
                        }
                    });
    
                }
            }
        });
    },

    initCourseCategoriesActivitiesStore: function() {
        var viewModel = this.getViewModel();
        var storeCategories = viewModel.getStore('courseCategories');
        var storeActivities = viewModel.getStore('courseActivities');
        storeCategories.load({
            params: {
                course_id: this.currentCourseId
            },
            callback: function (recordsColumns, operation, success) {
                Ext.getBody().unmask();
                if (success === true) {
                    viewModel.setData({
                        courseActivityColumns: recordsColumns
                    });
                    storeActivities.load({
                        params: {
                            course_id: this.currentCourseId
                        },
                        callback: function (records, operation, success) {
                            Ext.getBody().unmask();
                            if (success === true) {
                                viewModel.setData({
                                    riskAnalysisScorms: storeActivities,
                                });
                            } else {
                                Ext.Msg.alert({
                                    title: '',
                                    message: jsonData.response.message,
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.Msg.INFO,
                                    draggable: false
                                });    
                            }
                        },
                        scope: this
                    });            
                } else {
                    Ext.Msg.alert({
                        title: '',
                        message: jsonData.response.message,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO,
                        draggable: false
                    });    
                }
            },
            scope: this
        });
    
    },

    onInitActivitiesClick: function() {
        var viewModel = this.getViewModel();
        var storeCategories = viewModel.getStore('courseCategories');
        var storeActivities = viewModel.getStore('courseActivities');
        Ext.getBody().mask('Please wait', 'loading');

        storeCategories.load({
            params: {
                course_id: this.currentCourseId
            },
            callback: function (recordsColumns, operation, success) {
                Ext.getBody().unmask();
                if (success === true) {
                    viewModel.setData({
                        courseActivityColumns: recordsColumns
                    });
                    storeActivities.load({
                        params: {
                            course_id: this.currentCourseId
                        },
                        callback: function (records, operation, success) {
                            Ext.getBody().unmask();
                            if (success === true) {
                                var gridView = this.lookupReference('riskAnalysisGridPanel').items.items[0];
                                var columns = viewModel.data.courseActivityColumns;
                                for (var index = 0; index < columns.length; index ++){
                                    var column = Ext.create('Ext.grid.column.Column', {
                                        text: columns[index].data.name,
                                        dataIndex: columns[index].data.id,
                                        id: 'column_'+columns[index].data.id,
                                        width: 130,
                                        renderer: function(value) {
                                            return '<span class="x-fa fa-'+ (value ? 'check-square-o' : 'square-o') +'"></span>';
                                        }
                                    });
                                    gridView.headerCt.insert(index + 1, column);                
                                }
                                viewModel.setData({
                                    riskAnalysisScorms: storeActivities,
                                });
                            } else {
                                Ext.Msg.alert({
                                    title: '',
                                    message: jsonData.response.message,
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.Msg.INFO,
                                    draggable: false
                                });    
                            }
                        },
                        scope: this
                    });            
                    var cfg = Ext.apply({
                        xtype: 'popUpWindow',
                        reference: 'riskAnalysisInitActivitiesWindow',
                        items: [
                            {
                                id: 'riskAnalysisInitActivitiesWindow',
                                xtype: 'riskAnalysisStepOnePanel'
                            }
                        ],
                        title: 'Initialize Activities'
                    });
                    Ext.create(cfg);
                } else {
                    Ext.Msg.alert({
                        title: '',
                        message: jsonData.response.message,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO,
                        draggable: false
                    });    
                }
            },
            scope: this
        });

    },

    onSaveInitActivitiesClick: function() {
        var me = this;
        var gridStore = this.lookupReference('riskAnalysisGridPanel').items.items[0];
        var items = gridStore.getStore().data.items;
        var result = [];
        for (var i=0; i < items.length; i++) {
            var keys = Object.keys(items[i].data);
            var tempResult = {};
            tempResult['id']= items[i].data.id;
            tempResult['title'] = items[i].data.title
            for (var y=0; y < keys.length; y++) {
                if (keys[y] !== 'title' && keys[y] !== 'id'){
                    var temp = keys[y].replace('column_','');
                    tempResult[temp]= items[i].data[keys[y]];
                }    
            }
            result.push(tempResult);
        }
        Ext.Ajax.request({
            url: '/api/1/courses/activities',
            method: 'POST',
            jsonData: {
                'course_id': this.currentCourseId,
                'activities' : result
            },
            useDefaultXhrHeader: false,
            cors: true,
            headers: {
                'Authorization': ''
            },    
            callback:function(records, operation, success){
                var jsonData = Ext.util.JSON.decode(success.responseText);
                var statusMessage = jsonData.response.type;
                if(statusMessage === 'ok'){
                    me.loadCourseCategoriesGraph();
                    Ext.Msg.alert({
                        title: 'OK',
                        message: 'Saved',
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO,
                        draggable: false
                    });
                } else {
                    Ext.Msg.alert({
                        title: 'Something went wrong',
                        message: jsonData.response.message,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO,
                        draggable: false
                    });    
                }
            }
        });
    },

});
