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
class Group extends Model{
    
    protected $id;
    
    protected $name; 
        
    //Custom Table Name
    public function getSource()
    {
        return "to_group";
    }
    
    //Init - call once
    public function initialize()
    {
        $this->setSource("to_group"); //database table link
        
        $this->hasMany("id", "TodoGroup", "group_id");
        
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

    function getName() {
        return $this->name;
    }

  
    function setId($id) {
        $this->id = $id;
    }

    function setName($name) {
        $this->name = $name;
    }

}
