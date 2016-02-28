define([
  'jquery',
  'underscore',
  'backbone', 
  'abstractbasecontroller', 
  'indextodoview',
  
  //'text!templatequestioncheckbox'
], function($, _, Backbone, AbstractBaseController, IndexTodoView) {
    
    'use strict'; 
    
    // Our overall **AppView** is the top-level piece of UI.
    var todoController = function (){ //AbstractBaseView.extend
        
        this.index = function(){
            console.log("Route - Todo - Index");
            // We have no matching route, lets display the home page
            var indexTodo = new IndexTodoView();
        };
        
        this.edit = function(id){
            console.log("Route - Todo - Edit -" + id);
            // We have no matching route, lets display the home page
            var indexTodo = new IndexTodoView();
        };
        
        AbstractBaseController.call(this);
        
    };
    
    //Gestion de l'heritage si besoin 
    _.extend(todoController, AbstractBaseController);
    _.extend(todoController.prototype, AbstractBaseController.prototype);
    //_.extend(todoController, Backbone.Events);
    
    
    todoController.prototype.initialize = function(){
        
        // super !
 	AbstractBaseController.prototype.initialize.call(this);
        
        //Events Custom
        //this.on('customEvent', this.showLoad, this);
        
    };
    
    return todoController;
});