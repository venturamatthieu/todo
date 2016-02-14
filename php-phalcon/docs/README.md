![Todo](http://todo.com/images/todo-logo.png)


Todo Tools 
========================

Command line, code, etc



1) Project Location 
----------------------------------

Matthieu Ventura : 

    cd /Users/matthieu/Projets/INTERNET-todo


2) Apache 
----------------------------------

    sudo chmod +a "_www allow delete,write,append,file_inherit,directory_inherit" app/cache app/logs
    sudo chmod +a "matthieu allow delete,write,append,file_inherit,directory_inherit" app/cache app/logs

    sudo apachectl stop
    sudo apachectl start
    sudo apachectl restart

2) Mysql 
----------------------------------

    mysql -u root -p

2) Composer 
----------------------------------

    php composer.phar install
    php composer.phar update
    (php -d memory_limit=-1 composer.phar update)
    php composer.phar update friendsofsymfony/user-bundle

    php composer.phar show --installed

    php composer.phar self-update
    php composer self-update --rollback 

    php composer.phar remove vendor/*
    php composer.phar remove friendsofsymfony/user-bundle


2) Phalcon 
----------------------------------

### Command Line 

    php ../bin/phalcon-tools/phalcon.php commands

    Create Project 
    
    php ../bin/phalcon-tools/phalcon.php project todo

    Create Modules

    php ../../bin/phalcon-tools/phalcon.php module TodoAdmin
    php ../bin/phalcon-tools/phalcon.php module TodoApi
    php ../bin/phalcon-tools/phalcon.php module TodoWebClient
    
    


### Environnement

    

### Versioning

1.0.0-alpha < 1.0.0-alpha.1 < 1.0.0-alpha.beta < 1.0.0-beta < 1.0.0-beta.2 < 1.0.0-beta.11 < 1.0.0-rc.1 < 1.0.0

    php app/console app:version:bump
    php app/console app:version:bump -l
    php app/console app:version:bump -d

    git tag -a 1.0.0-alpha -m 'the initial release'
    git push origin --tags
    git push origin : tempTag

    git tag 

### Manage Service

### Manage Bundle 
  
### Manage Data

Manager : 


Database: 

  
Fixtures: 


Getter/setters:

Debug: 


Code : 

Code collection :
    
Code  Phql:


### Manage Asset (css, js)
    

### Manage Translation (extern ressources)

### Extra 


X) Links 
----------------------------------

### All
* https://gowalker.org/github.com/sergeyklay/awesome-phalcon
* https://phalconist.com
* https://github.com/Riu/phalconization
* https://github.com/ovr/phalcon-module-skeleton
* https://github.com/phalcon/invo
* https://forum.phalconphp.com
* https://github.com/mikegioia/phalcon-boilerplate
