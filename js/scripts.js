/* SCREENS
--------------------------------------- */

var Feedback = {

    init: function(){
        this.cacheDom();
        this.settings();
        this.bindEvents();
    },

    settings: function(){

    },

    cacheDom: function(){
        this.$el = $(".feedback-container");
        this.$feedbackTrigger = this.$el.find('.feedback-trigger');
    },

    bindEvents: function(){
        this.$feedbackTrigger.on('click', this.toggleWidget.bind(this));
    },

    toggleWidget: function(e){
        this.$el.toggleClass('isOpen');
        e.preventDefault()
    }

}

/* SCREENS
--------------------------------------- */

var Pages = {

    $currentPage: false,

    init: function(){
        this.cacheDom();
        this.bindEvents();
        this.ready();
    },

    cacheDom: function(){
        this.$container = $('.feedback-container');
        this.$pages = $('.feedback-page');
    },

    bindEvents: function(){
        this.$pages.on('show', this.showPage.bind(this));
        this.$pages.on('click', '*[data-go-to-page]', this.showPage.bind(this));
    },

    ready: function(){
        this.showPage(this.$pages.first().data('pagename'));
    },

    showPage: function(name){

        name = (typeof name == "object") ? $(name.target).data('go-to-page') : name;

        var id = this.$pages.filter('*[data-pagename="' + name + '"]').index() + 1;

        this.$container.attr('data-show-page', id);
    },

}

$(function(){
    Feedback.init();
    Pages.init();
})
