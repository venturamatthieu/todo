<?php

namespace Todo\ApiModule\Models;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

use Phalcon\Mvc\Model;

/**
 * Description of Todo
 *
 * @author matthieu
 */
class Todo extends Model{
    
    protected $id;
    
    protected $title; 
    
    protected $completed;
    
    //Custom Table Name
    public function getSource()
    {
        return "to_todo";
    }
    
    //Init - call once
    public function initialize()
    {
        $this->setSource("to_todo"); //database table link
        
        $this->hasOne("id", "TodoGroup", "todo_id");
        
    }
    
    //Constructor - call on each object
    public function onConstruct()
    {
        
    }
    
    
    public function beforeSave(){}
    public function afterFetch(){}
    public function afterSave(){}
    
    
    //Auto Generated 
    
    function getId() {
        return $this->id;
    }

    function getTitle() {
        return $this->title;
    }

    function getCompleted() {
        return $this->completed;
    }

    function setId($id) {
        $this->id = $id;
    }

    function setTitle($title) {
        $this->title = $title;
    }

    function setCompleted($completed) {
        $this->completed = $completed;
    }    
    
}
