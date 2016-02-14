// Filename: app.js
define([
    'backbone',
    'router', // Request router.js, 
], function(Backbone, Router) {
    
    'use strict'; 
    
    var initialize = function() {
                
        // Pass in our Router module and call it's initialize function
        Router.initialize();        
    };

    return {
        initialize: initialize
    };
});