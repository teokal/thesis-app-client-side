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

    lastView: null,

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
        // debugger;
        var to = node && (node.get('routeId') || node.get('viewType'));

        if (to) {
            this.redirectTo(to);
        }

        if (node.parentNode.id === 'courses'){
            // debugger;
            var viewModel = this.getViewModel();
            viewModel.setData({
                courseid: '123'
            });
            // this.redirectTo('pageblank');
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

    onMainViewRender:function() {
        if (!window.location.hash) {
            this.redirectTo("dashboard");
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
                        text: record.data.fullname,
                        iconCls: 'x-fa fa-lightbulb-o',
                        viewType: 'courseView',
                        leaf: true
                    };
                    coursesTree.appendChild(jsonObj);
                });
            },
            scope: this

        });
    },

    onItemClick: function (view,rec,item) {
        if (rec.node.parentNode.id === 'courses'){
            var viewModel = this.getViewModel();

            var store = viewModel.getStore('courseEnrolledStudents');
            store.load({
                params: {
                    courseid: '5'
                },
                callback: function(records, operation, success) {
                    // do something after the load finishes
                    if (success == true){
                        debugger;
                        // form.expand(false);
                        viewModel.setData({
                            list: store,
                            enrolledusercount: 23
                        });
                    }
                },
                scope: this

            });

            // this.redirectTo('pageblank');
        }
    }

});
