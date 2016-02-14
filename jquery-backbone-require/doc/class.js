var aView = function (params_){

 	// public properties
	this.foo = null;
 
	// call the super constructor with params
 	AbstractDOMView.call(this, params_);

};

// inheritance, une fois pour etendre l'objet et ses propriétés
// une autre pour étendre le prototype, aka les method public en quelques sortes
_.extend(aView, AbstractDOMView);
_.extend(aView.prototype, AbstractDOMView.prototype);

// Exemple d'ovveride d'une method "publique"
aView.prototype.initDOM = function() {
	
	// call d'une methode "privée"
	// une fonction qui n'est pas dans le prototype donc pas accessible en cas d'instance de classe
    // mais accessible dans la classe en utilisant .call(this) (toujours passer le contexte courant)
	_privateMethod.call(this);
	
 	// super !
 	AbstractDOMView.prototype.initDOM.call(this);
}

// exemple private method
// le _ c'est une convention

var _privateMethod = function() {
	
}
