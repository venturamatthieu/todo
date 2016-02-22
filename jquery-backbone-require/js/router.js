// Filename: router.js
define([
    'jquery',
    'underscore',
    'backbone',
    'indexdefaultview', 
    'indextodoview'
    
    
], function($, _, Backbone, IndexDefaultView, IndexTodoView) {
    
    'use strict'; 
    
    var AppRouter = Backbone.Router.extend({
        routes: {
            
            // Default - Index
            '' : 'defaultIndexAction',
            
            
            // Todo - index
            'todo': 'todoIndexAction'
            
            // More
            // 'show/:id': 'show',
            // 'download/*random': 'download'
            // 'search/:query': 'search',
            // '*default': 'default'
            
            
        }
    });

    var initialize = function() {
                
        var app_router = new AppRouter();
        
        // Default - Index
        app_router.on('route:defaultIndexAction', function() {
            
            console.log("Route - Default - Index");
            // We have no matching route, lets display the home page
            var indexDefault = new IndexDefaultView(); 
            indexDefault.trigger('customEvent', {id:'page-index'});

            console.log(indexDefault);

        });
        
        
        // Todo - index
        app_router.on('route:todoIndexAction', function() {
            
            console.log("Route - Todo - Index");
            // We have no matching route, lets display the home page
            var indexTodo = new IndexTodoView();

        });
        
        

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
        
        return app_router;

    };

    return {
        initialize: initialize
    };
});