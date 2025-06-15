$(function(){
    var img = $('#image');
    var scale = 1;
    var minScale = 1;
    var maxScale = 5;
    var transX = 0;
    var transY = 0;
    var dragging = false;
    var pinching = false;
    var startX = 0;
    var startY = 0;
    var pinchDist = 0;
    var pinchMid = {x:0, y:0};

    function clamp(){
        var cw = img.width();
        var ch = img.height();
        var sw = cw * scale;
        var sh = ch * scale;
        var minX = Math.min(0, cw - sw);
        var minY = Math.min(0, ch - sh);
        transX = Math.min(Math.max(transX, minX), 0);
        transY = Math.min(Math.max(transY, minY), 0);
    }

    function update(){
        clamp();
        img.css('transform', 'translate(' + transX + 'px,' + transY + 'px) scale(' + scale + ')');
    }

    function zoomAt(x, y, factor){
        var prev = scale;
        scale *= factor;
        scale = Math.min(Math.max(scale, minScale), maxScale);
        var rect = img[0].getBoundingClientRect();
        var ox = x - rect.left;
        var oy = y - rect.top;
        transX = ox - (ox - transX) * (scale/prev);
        transY = oy - (oy - transY) * (scale/prev);
        update();
    }

    function distance(p1, p2){
        var dx = p1.clientX - p2.clientX;
        var dy = p1.clientY - p2.clientY;
        return Math.sqrt(dx*dx + dy*dy);
    }

    function midpoint(p1, p2){
        return {x:(p1.clientX + p2.clientX)/2, y:(p1.clientY + p2.clientY)/2};
    }

    img.on('wheel', function(e){
        e.preventDefault();
        var factor = e.originalEvent.deltaY < 0 ? 1.1 : 0.9;
        zoomAt(e.clientX, e.clientY, factor);
    });

    img.on('mousedown touchstart', function(e){
        if(e.type === 'touchstart' && e.touches.length === 2){
            pinching = true;
            pinchDist = distance(e.touches[0], e.touches[1]);
            pinchMid = midpoint(e.touches[0], e.touches[1]);
            img.addClass('grabbing');
            return;
        }
        var ev = e.type === 'touchstart' ? e.touches[0] : e;
        dragging = true;
        startX = ev.clientX - transX;
        startY = ev.clientY - transY;
        img.addClass('grabbing');
    });

    $(document).on('mousemove touchmove', function(e){
        if(pinching && e.type === 'touchmove' && e.touches.length === 2){
            e.preventDefault();
            var newMid = midpoint(e.touches[0], e.touches[1]);
            var newDist = distance(e.touches[0], e.touches[1]);
            var factor = newDist / pinchDist;
            transX += newMid.x - pinchMid.x;
            transY += newMid.y - pinchMid.y;
            pinchDist = newDist;
            pinchMid = newMid;
            zoomAt(newMid.x, newMid.y, factor);
            return;
        }
        if(!dragging) return;
        var ev = e.type === 'touchmove' ? e.touches[0] : e;
        if(e.type === 'touchmove') e.preventDefault();
        transX = ev.clientX - startX;
        transY = ev.clientY - startY;
        update();
    });

    $(document).on('mouseup touchend touchcancel', function(){
        dragging = false;
        pinching = false;
        img.removeClass('grabbing');
    });
});
