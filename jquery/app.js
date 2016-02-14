"use strict";

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(function () {
    
    //Init - Verfier dans la session si il n'existe pas des taches
    
    
    //Event - Ajout d'une tache 
    $("input:text[name=addnewtodo]").keypress(function (event) {
        //KeyPress Enter
        if (event.which == 13) {
            addTodo($(this));
            refreshNbTask();
        }
        

    });

    //Event - Filtre la liste des taches 
    $("#filtres button").on("click", function(event) {
        filterListTask($(this).attr("data-statut"));
    });
    

    //Event - Change statut de la tache 
    $("ul#todos").on("click", "li.todo input:checkbox", function(event) {
        changeStatutTask($(this)); 
    });

    //Event - Supprime une tache
    $("ul#todos").on("click", "li.todo button.remove", function(event) {
        suppressionTask($(this)); 
    });

});


//CONSTANTES
var _statut = {
    1: "active",
    2: "complete"
};

//MODELES

var Tasks = function (){
    
    this.list = null,
    this.nb =  0,        
            
    this.addTask = function(task){
        this.list.push(task);
    },
            
    this.removeTask = function(task){
        this.list.splice(task);
    }, 
    this.getList = function (list){
        return this.list;
    }    
}

var _tasks;

var Task = function (name, statut) {
    this.name = name; 
    this.statut = statut; 
};


//FUNCTIONS - ACTIONS
function addTodo(element) {

    var $e = element;

    //On recupere la valeur saisie
    var todo = $e.val();

    //On ajoute la nouvelle tache dans la liste 
    $("#todos").append(templateTodo(todo, _statut[1]));

}

function filterListTask(statut) {

    //On affiche ou cache les task en fonction de leur statut
    
    if (statut == _statut[1] || statut == _statut[2]) {
        
        $("li.todo[data-statut='" + statut + "']").show();
        $("li.todo[data-statut!='" + statut + "']").hide();
    }

    if (statut == "all") {
        $("li.todo[data-statut]").show();
    }

}


//FUNCTIONS - CORE

function verifDataSession(){
    
    //On recupere les taches de la session
    _tasks = $(document).data("datas");
    
    if(_tasks.nb > 0){
                
        for (var i = 0; i < _tasks.nb ; i++){
            
            addTodo($(this));
            
        }
        
    }
    
    refreshNbTask();

}

function changeStatutTask(element) {

    var $e = element;
    
    if($e.is(":checked")) {
        $e.parent("li").attr("data-statut", _statut[2]);
    }else{
        $e.parent("li").attr("data-statut", _statut[1]);
    }
  
}

function suppressionTask(element) {

    var $e = element;
    
    $e.parent("li").remove();  
      
}

function refreshNbTask() {

    var nb = $("li.todo").length;
    $("#nb-task").text(nb);

}



function sessionTaskSave(){
    
    //Enregistre en session
    var task = new Task(todo, _statut[1]);
    _tasks.addTask(task);
    
}

function sessionTaskRemove(){
    
    //Supprime de la session
    $(document).removeData("datas");
    $(document).data( "datas", "");
    
    
}






//TEMPLATES
function templateTodo(task, statut) {

    var html = '<li class="todo" data-statut="' + statut + '">';
    html += '<input type="checkbox" name="task-statut" value="complete">';
    html += '<span class="task">' + task + '</span>';
    html += '<button class="remove">X</button>';
    html += '</li>';

    return html;

}
