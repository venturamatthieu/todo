<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
        <title>Phalcon PHP Framework</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
    </head>
    <body>
        <div class="container">
            

<div> Todos </div> 
<table>
<tr>
    <td>Id</td>
    <td>Title</td>
    <td>Completed</td>
    <td>*</td>
</tr>

<?php $v3959357221288851501iterated = false; ?><?php foreach ($todos as $todo) { ?><?php $v3959357221288851501iterated = true; ?>
    <tr>
        <td><?php echo $todo->id; ?></td>
        <td><?php echo $todo->title; ?></td>
        <td><?php echo $todo->completed; ?></td>
        <td><?php echo $this->tag->linkTo(array(array('for' => 'todo_admin_todo_show', 'id' => $todo->id), 'Show', 'class' => 'show-btn')); ?></td>
    </tr>
<?php } if (!$v3959357221288851501iterated) { ?>
    <tr>
        <td colspan="4">Nothing</td>
    </tr> 
<?php } ?>

</table>

<?php echo $this->tag->linkTo(array(array('for' => 'todo_admin_todo_add'), 'Add todo')); ?>

<br/>
<br/>
<br/>


<div> Groups </div> 
<table>
<tr>
    <td>Id</td>
    <td>Name</td>
    <td>*</td>
</tr>

<?php $v3959357221288851501iterated = false; ?><?php foreach ($groups as $group) { ?><?php $v3959357221288851501iterated = true; ?>
<tr>
    <td><?php echo $group->id; ?></td>
    <td><?php echo $group->title; ?></td>
    <td><?php echo $this->tag->linkTo(array(array('for' => 'todo_admin_group_show', 'id' => $group->id), 'Show', 'class' => 'show-btn')); ?></td>
</tr>
<?php } if (!$v3959357221288851501iterated) { ?>
    <tr>
        <td colspan="3">Nothing</td>
    </tr> 
<?php } ?>

</table>

<?php echo $this->tag->linkTo(array(array('for' => 'todo_admin_group_add'), 'Add group')); ?>



        </div>
        <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
        <!-- Latest compiled and minified JavaScript -->
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
    </body>
</html>
