$(function(){
    var img = $('#image');
    var scale = 1;
    var minScale = 1;
    var maxScale = 5;
    var transX = 0;
    var transY = 0;
    var dragging = false;
    var startX = 0;
    var startY = 0;

    function updateTransform(){
        img.css('transform','translate('+transX+'px,'+transY+'px) scale('+scale+')');
    }

    img.on('wheel', function(e){
        e.preventDefault();
        var delta = e.originalEvent.deltaY;
        if(delta < 0){
            scale *= 1.1;
        } else {
            scale /= 1.1;
        }
        scale = Math.min(Math.max(scale, minScale), maxScale);
        updateTransform();
    });

    img.on('mousedown touchstart', function(e){
        var ev = e.type === 'touchstart' ? e.touches[0] : e;
        dragging = true;
        img.addClass('grabbing');
        startX = ev.clientX - transX;
        startY = ev.clientY - transY;
    });

    $(document).on('mousemove touchmove', function(e){
        if(!dragging) return;
        if(e.type === 'touchmove') e.preventDefault();
        var ev = e.type === 'touchmove' ? e.touches[0] : e;
        transX = ev.clientX - startX;
        transY = ev.clientY - startY;
        updateTransform();
    });

    $(document).on('mouseup touchend touchcancel', function(){
        dragging = false;
        img.removeClass('grabbing');
    });
});
