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

/* VALIDATION
--------------------------------------- */

var Validation = {

    init: function(){
        this.cacheDom();
        this.bindEvents();
    },

    cacheDom: function(){
        this.$inputs = $('input.required');
    },

    bindEvents: function(){
        this.$inputs.on('keyup', this.onKeyPress.bind(this));
    },

    onKeyPress: function(e){

        var $input = this.$inputs.filter($(e.target));

        if ($input.attr('type') == "email") {
            $input.state = this.validateEmail($input.val());
            this.setState($input, $input.state);
        }

    },

    setState: function($input, state){
        $input.toggleClass('isValid', state)
    },

    validateEmail: function(email){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
}


/* PAGES
--------------------------------------- */

var Pages = {

    $currentPage: false,
    currentPageId: false,

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

        // Event or string

        name = (typeof name == "object") ? $(name.target).data('go-to-page') : name;

        // Going forward or backward?

        var newpageId = this.$pages.filter('*[data-pagename="' + name + '"]').index() + 1;
        var lastpageId = this.currentPageId;

        // If going forward ( not previous ) do some validations
        // Focus on the first field and return if we have invalids

        if (newpageId > lastpageId) {

            if (this.$currentPage && this.$currentPage.find('input.required')){

                var invalidFields = this.$currentPage.find('input.required:not(".isValid")').length;

                if (invalidFields > 0) {
                    this.$currentPage.find('input.required').first().focus();
                    return;
                }

            }

        }

        // All good, we can move to the next page ------------------------------

        // Hold onto currentPage and Id
        this.$currentPage = this.$pages.filter('*[data-pagename="' + name + '"]');
        this.currentPageId = this.$currentPage.index() + 1;

        // Change class attr on the container to trigger the animation
        this.$container.attr('data-show-page', this.currentPageId);
    },

}

$(function(){
    Pages.init();
    Validation.init();
    Feedback.init();
})
