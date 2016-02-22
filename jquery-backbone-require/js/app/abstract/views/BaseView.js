/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define([
    'underscore',
    'backbone'

], function (_, Backbone) {

    'use strict';

    // Our overall **AppView** is the top-level piece of UI.
    var baseView = Backbone.View.extend({
        
        params: (self.params != undefined) ? self.params :  'pipi',
            
        showPoney: function () {
            console.log("1");
            console.log("poney");
        },
        assign: function (view, selector) {
            view.setElement(this.$(selector)).render();
        }, 
        tatatata:function (){
            
        }
        

    });
    
    baseView.prototype.initialize = function(){
        this.render();         
    }
    
    baseView.prototype.render = function (){
        this.$el.html(this.template);
    }
    
    return baseView;
});

//define([], function () {
//    return{
//        
//        assign: function (view, selector) {
//            view.setElement(this.$(selector)).render();
//        }
//        
//    };
//});
//var BaseView = function (){
//    
//    this.test = function (){
//        console.log("poney")
//    },
//    this.assign = function (view, selector) {
//        view.setElement(this.$(selector)).render();
//    };
//    
//};


//var BaseView = {
//    
//    assign : function (view, selector) {
//        view.setElement(this.$(selector)).render();
//    }
//    
//};