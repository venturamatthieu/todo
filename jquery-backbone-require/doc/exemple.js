

//Class parent - syntaxe Backbone

var AbstractBaseView = Backbone.View.extend({
        
        showPoney: function () {
            console.log("1");
            console.log("poney");
        },
        assign: function (view, selector) {
            view.setElement(this.$(selector)).render();
        }

});



//Class IndexView - vue par default page index

 var DefaultIndexView = function (){
     
     showPoney = function () {
            console.log("2");
            console.log("mon poney override");
     }
     
 };
 
 //Gestion de l'heritage
_.extend(DefaultIndexView, AbstractBaseView);
_.extend(DefaultIndexView.prototype, AbstractBaseView.prototype);   
      
 //Overtide du constructor 
 
 DefaultIndexView.prototype.initialize = function(){
        
        // super !
 	AbstractBaseView.prototype.initialize.call(this);
        
        console.log("new obj"); 
        
        this.showPoney();

        
}

DefaultIndexView.prototype.showPoney = function(){
    
       console.log("2");
       console.log("mon poney override (via Proto)"); 
        
}
      
      
// Class Router 

app_router.on('route:defaultIndexAction', function() {
            
    console.log("Route - Default - Index");
    // We have no matching route, lets display the home page
    var defaultIndexView = new DefaultIndexView();  
    
    // ICI ???? - Quel est la meilleur solution ? 

});