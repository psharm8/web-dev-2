$(function() {
    $('#item-details').on('show.bs.modal', function(e) {
    
        var target = $(e.relatedTarget);
        var productName = target.data("product-name");
        var details = target.data("product-details");
        var img = target.data("product-img");
        //populate the textbox
        var modal = $(e.currentTarget);
        modal.find('#product-title').text(productName);
        modal.find('#product-img').attr('src',img);
        modal.find('#product-details').text(details);
    });
});