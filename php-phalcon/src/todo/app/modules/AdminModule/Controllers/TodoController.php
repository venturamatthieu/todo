<?php

namespace Todo\AdminModule\Controllers;

use Backman\Controllers\ControllerBase;
use Todo\ApiModule\Models\Group;
use Todo\ApiModule\Models\Todo;
use Todo\ApiModule\Models\TodoGroup;

class TodoController extends ControllerBase {

    public function indexAction() {
        //On recupere tous les groups 
        $this->view->todos = Todo::find();

        //On recupere tous les todos 
        $this->view->groups = Group::find();
    }

    public function showAction($todoId) {

        $this->view->todo = Todo::findFirstById($todoId);
    }

    public function addAction() {

        if ($this->request->isPost()) {

            $model = new Todo();
            $post = $this->request->getPost();

            //$form->bind($post, $model);

            $model->setTitle($post["title"]);
            $model->setCompleted(1);
            
            $model->save();

            $this->response->redirect($this->url->get().'admin/todo');
        }
    }

    public function editAction($id) {
        $model = AdminUser::findFirst($id);
        if (!$model) {
            $this->redirect($this->url->get() . 'admin/admin-user');
        }
        $form = new AdminUserForm();
        if ($this->request->isPost()) {
            $post = $this->request->getPost();
            $form->bind($post, $model);
            if ($form->isValid()) {
                $model->setCheckboxes($post);
                if ($model->save() == true) {
                    $this->flash->success('User <b>' . $model->getLogin() . '</b> has been saved');
                    return $this->redirect($this->url->get() . 'admin/admin-user');
                } else {
                    $this->flashErrors($model);
                }
            } else {
                $this->flashErrors($form);
            }
        } else {
            $form->setEntity($model);
        }
        $this->view->submitButton = $this->helper->at('Save');
        $this->view->form = $form;
        $this->view->model = $model;
        $this->helper->title($this->helper->at('Manage Users'), true);
    }

    public function deleteAction($id) {
        $model = AdminUser::findFirst($id);
        if (!$model) {
            return $this->redirect($this->url->get() . 'admin/admin-user');
        }
        if ($model->getLogin() == 'admin') {
            $this->flash->error('Admin user cannot be deleted');
            return $this->redirect($this->url->get() . 'admin/admin-user');
        }
        if ($this->request->isPost()) {
            $model->delete();
            $this->flash->warning('Deleting user <b>' . $model->getLogin() . '</b>');
            return $this->redirect($this->url->get() . 'admin/admin-user');
        }
        $this->view->model = $model;
        $this->helper->title($this->helper->at('Delete User'), true);
    }

}
