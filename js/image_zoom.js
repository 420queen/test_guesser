(function(){
    const img = document.getElementById('image');
    if(!img) return;

    let scale = 1;
    const minScale = 1;
    const maxScale = 5;
    let tx = 0;
    let ty = 0;

    const pointers = new Map();
    const start = {};

    function clamp(){
        const rect = img.getBoundingClientRect();
        const sw = rect.width * scale;
        const sh = rect.height * scale;
        const minX = Math.min(0, rect.width - sw);
        const minY = Math.min(0, rect.height - sh);
        tx = Math.min(Math.max(tx, minX), 0);
        ty = Math.min(Math.max(ty, minY), 0);
    }

    function apply(){
        clamp();
        img.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
    }

    function onWheel(e){
        e.preventDefault();
        const rect = img.getBoundingClientRect();
        const ox = e.clientX - rect.left;
        const oy = e.clientY - rect.top;
        const prev = scale;
        scale *= e.deltaY < 0 ? 1.1 : 0.9;
        scale = Math.min(Math.max(scale, minScale), maxScale);
        tx = ox - (ox - tx) * (scale / prev);
        ty = oy - (oy - ty) * (scale / prev);
        apply();
    }

    function pointerDown(e){
        pointers.set(e.pointerId, e);
        img.classList.add('grabbing');
        if(pointers.size === 1){
            start.x = e.clientX - tx;
            start.y = e.clientY - ty;
        } else if(pointers.size === 2){
            const [a, b] = Array.from(pointers.values());
            start.dist = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
            start.mid = {x:(a.clientX + b.clientX)/2, y:(a.clientY + b.clientY)/2};
        }
        img.setPointerCapture(e.pointerId);
    }

    function pointerMove(e){
        if(!pointers.has(e.pointerId)) return;
        pointers.set(e.pointerId, e);
        if(pointers.size === 1){
            e.preventDefault();
            tx = e.clientX - start.x;
            ty = e.clientY - start.y;
            apply();
        } else if(pointers.size === 2){
            e.preventDefault();
            const [a, b] = Array.from(pointers.values());
            const dist = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
            const factor = dist / start.dist;
            const mid = {x:(a.clientX + b.clientX)/2, y:(a.clientY + b.clientY)/2};
            const prev = scale;
            scale = Math.min(Math.max(scale * factor, minScale), maxScale);
            tx += mid.x - start.mid.x;
            ty += mid.y - start.mid.y;
            tx = mid.x - (mid.x - tx) * (scale / prev);
            ty = mid.y - (mid.y - ty) * (scale / prev);
            start.dist = dist;
            start.mid = mid;
            apply();
        }
    }

    function pointerUp(e){
        if(!pointers.has(e.pointerId)) return;
        pointers.delete(e.pointerId);
        img.releasePointerCapture(e.pointerId);
        if(pointers.size === 0){
            img.classList.remove('grabbing');
        } else if(pointers.size === 1){
            const p = Array.from(pointers.values())[0];
            start.x = p.clientX - tx;
            start.y = p.clientY - ty;
        }
    }

    img.addEventListener('wheel', onWheel, {passive: false});
    img.addEventListener('pointerdown', pointerDown);
    img.addEventListener('pointermove', pointerMove);
    img.addEventListener('pointerup', pointerUp);
    img.addEventListener('pointercancel', pointerUp);
    img.addEventListener('pointerleave', pointerUp);
})();
