define([
  'jquery',
  'underscore',
  'backbone', 
  'abstractbasecontroller', 
  'indexdefaultview',
  
  //'text!templatequestioncheckbox'
], function($, _, Backbone, AbstractBaseController, IndexDefaultView) {
    
    'use strict'; 
    
    // Our overall **AppView** is the top-level piece of UI.
    var defaultController = function (){ //AbstractBaseView.extend
        
        this.index = function(){
            
            // We have no matching route, lets display the home page
            var indexDefault = new IndexDefaultView(); 
            indexDefault.trigger('customEvent', {id:'page-index'});

        };
        
        AbstractBaseController.call(this);
        
    };
    
    //Gestion de l'heritage si besoin 
    _.extend(defaultController, AbstractBaseController);
    _.extend(defaultController.prototype, AbstractBaseController.prototype);
    //_.extend(defaultController, Backbone.Events);
    
    
    defaultController.prototype.initialize = function(){
        
        // super !
 	AbstractBaseController.prototype.initialize.call(this);
        
        //Events Custom
        this.on('customEvent', this.showLoad, this);
    };
    
    return defaultController;
});