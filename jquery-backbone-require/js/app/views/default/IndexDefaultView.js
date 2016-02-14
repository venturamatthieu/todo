define([
  'jquery',
  'underscore',
  'backbone', 
  'abstractbaseview',
  'text!templatepagedefaultindex'
  
  //'text!templatequestioncheckbox'
], function($, _, Backbone, AbstractBaseView, defaultIndexTmpl) {
    
    'use strict'; 
    
    // Our overall **AppView** is the top-level piece of UI.
    var defaultIndexView = function (){ //AbstractBaseView.extend
                        
        this.el = $("#app"),
        this.params = "dede",
        
        this.template = _.template(defaultIndexTmpl),
        
        this.render = function(){            
            this.$el.html(this.template);
        }
        
        AbstractBaseView.call(this);
    };
    
    
    
    //Gestion de l'heritage si besoin 
    _.extend(defaultIndexView, AbstractBaseView);
    _.extend(defaultIndexView.prototype, AbstractBaseView.prototype);
    
    
    defaultIndexView.prototype.initialize = function(){
        
        // super !
 	AbstractBaseView.prototype.initialize.call(this);
        
        
        this.render(); 
        //this.showPoney();
        
    }
    
    defaultIndexView.prototype.showPoney = function (){
        console.log(this.params);
    }    
    
      
    return defaultIndexView;
});