// Filename: router.js
define([
    'jquery',
    'underscore',
    'backbone',
    'controllerDefault', 
    'controllerTodo'
], function($, _, Backbone, defaultController, todoController) {
    
    'use strict'; 
    
    var AppDesktopRouter = Backbone.Router.extend({
                
        routes: {
            
            // Default - Index
            '' : 'default:index',
            
            // Todo - index
            'todo': 'todo:index',
            'todo/edit/:id': 'todo:edit'
            
            // More
            // 'show/:id': 'show',
            // 'download/*random': 'download'
            // 'search/:query': 'search',
            // '*default': 'default'
            
            
        },
        _bindRoutes: function() {
            
            var self = this;
            
            if (!self.routes) return;
                        
            _.each(self.routes, function(routeAction, route){
                
                var routeHash = routeAction.split(':');
                
                //on recupere le controller
                var controllerClassName =  routeHash[0]+"Controller";
                var controller = new (eval(controllerClassName));
                
                var actionName = routeHash[1]; //todo
                var actionMethod = controller[actionName]; //index, edit, etc

                self.route(route, routeAction, _.bind(actionMethod, controller));
                
            });
        }
    });

    var initialize = function() {
        //Route pour le desktop
        var app_desktop_router = new AppDesktopRouter();

        // Unlike the above, we don't call render on this view as it will handle
        // the render call internally after it loads data. Further more we load it
        // outside of an on-route function to have it loaded no matter which page is
        // loaded initially.
        //var footerView = new FooterView();

        Backbone.history.start({
            //pushState: true, 
            //hashChange: false, 
            //root: baseFolder
            
        });
        
        return app_desktop_router;

    };

    return {
        initialize: initialize
    };
});