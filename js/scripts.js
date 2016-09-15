var Cart = {

    init: function(){
        this.cacheDom();
        this.settings();
        this.bindEvents();
    },

    settings: function(){
        itemsInCart: 0
    },

    cacheDom: function(){
        this.$el = $(".cd-cart-container");
        this.$cartList = this.$el.find('ul');
        this.$productTemplate = this.$el.find('#product-template').html();
        this.$openCloseTrigger = this.$el.find('.cd-cart-trigger');
    },

    bindEvents: function(){
        $(document).on('click', '.cd-add-to-cart', this.addToCart.bind(this));
        this.$openCloseTrigger.on('click', this.openCloseCart.bind(this));
    },

    openCloseCart: function(){
        this.$el.toggleClass('cart-open');
    },

    addToCart: function(e){
        this.addProduct(e);
        this.$el.removeClass('empty');
        e.preventDefault();
    },

    addProduct: function(e){

        var data = {
            image:     $(e.target).data('productImage'),
            price:     $(e.target).data('price'),
            productId: $(e.target).data('productId')
        }

        var productAdded = Mustache.render(this.$productTemplate, data);

        this.$cartList.prepend(productAdded);

    },

    cartUpdated: function(){

    }

}



$(function(){
    Cart.init();
})
