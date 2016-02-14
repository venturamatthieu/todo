var DOMView = function (options, datas){

  /**
   * Params object from router
   * @type {Objet}
   */
  this.params = {};

  /**
   * Option object
   * @type {Objet}
   */
  this.options = {};

  /**
   * Datas object template
   * @type {Objet}
   */
  this.datas = {};

  /**
   * Assets object template
   * @type {Objet}
   */
  this.assets = {};

  /**
   * template
   * @type {Mustache.template}
   */
  this.template =  (this.template != undefined) ? this.template : null;

  /**
   * container element which contains the $el
   * @type {$}
   */
  this.$container = null;

  /**
   * Resize breakpoint
   * @type {Number}
   */
  this.refWidth = 1280;

  /**
   * Selector for render
   * @type {String}
   */
  this.selectorRender = (this.selectorRender != undefined) ? this.selectorRender : null;

  /**
   * Current ID View
   * @type {String}
   */
  this.idView = (this.idView != undefined) ? this.idView : '';

  /**
   * dataID in case of no id
   * @type {String}
   */
  this.dataID =  (this.dataID != undefined) ? this.dataID : null;

  /**
   * Set the basic Datas
   * @type {String}
   */
  this.setBasicDatas = (this.setBasicDatas != undefined) ? this.setBasicDatas : true;

  /**
   * Append it?
   * @type {Boolean}
   */
  this.appendEl = (this.appendEl != undefined) ? this.appendEl : true;

  /**
   * array of subviews (children)
   * @type {array.<DOMViews>}
   */
  this.aSubViews = [];

  this.hasLoginListener = false;

  AbstractView.call(this);
  Backbone.View.call(this, options, datas);

};

_.extend(DOMView, Backbone.View);

// Composition!
_.extend(DOMView.prototype, AbstractView.prototype);
_.extend(DOMView.prototype, Backbone.View.prototype);