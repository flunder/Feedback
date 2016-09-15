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
        this.$pages = $('.feedback-page');
    },

    bindEvents: function(){
        this.$pages.on('show', this.showPage.bind(this));
    },

    ready: function(){
        this.showPage(this.$pages.first().data('pagename'));
    },

    showPage: function(name){
        this.$pages.removeClass('isVisible');
        this.$currentPage = this.$pages.filter('[data-pagename="' + name + '"]').addClass('isVisible');
    },

}

$(function(){
    Feedback.init();
    Pages.init();
})
