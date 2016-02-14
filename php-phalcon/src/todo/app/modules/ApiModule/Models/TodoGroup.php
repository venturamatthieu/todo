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
class TodoGroup extends Model{
    
    protected $id;
    
    protected $group_id; 
    
    protected $todo_id; 
    
    //Custom Table Name
    public function getSource()
    {
        return "to_todo_group";
    }
    
    //Init - call once
    public function initialize()
    {
        $this->setSource("to_todo_group"); //database table link
        
        $this->hasOne("todo_id", "Todo", "id");
        $this->belongsTo("group_id", "Group", "id");
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
