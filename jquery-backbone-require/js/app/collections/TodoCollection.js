define([
    'jquery',
    'underscore',
    'backbone',
    'backbonelocalstorage',
    'modeltodo'
    //'text!templatequestioncheckbox'
    
], function ($, _, Backbone, LocalStorage, Todo) {

    'use strict';

    var todoCollection = Backbone.Collection.extend({
        initialize: function () {
            console.log('New collection initialized...');
        },
        model: Todo,
        localStorage: new LocalStorage("todos-backbone") // Unique name within your app.
    });

    return todoCollection;

});