'use strict'

// // Requirejs compatibility in Electron app
if (window.require) {
  window.requireNode = window.require
  window.moduleNode = window.module

  window.require = undefined
  window.module = undefined
}

function electron_statusbar_cao_injectjs(){
    var s = document.createElement("script");
    s.type = 'text/javascript';
    s.innerHTML = `
    // alert('cao');
    function electron_hover_delegate_cao (event, selector) {
        var target = event.target;
        var related = event.relatedTarget;
        var match;
    
        // search for a parent node matching the delegation selector
        while (target && target !== document && !(match = target.matches(selector))) {
          target = target.parentNode;
        }
    
        // exit if no matching node has been found
        if (!match) {
          return;
        }
    
        // loop through the parent of the related target to make sure that it's not a child of the target
        while (related && related !== target && related !== document) {
          related = related.parentNode;
        }
    
        // exit if this is the case
        if (related === target) {
          return;
        }
        return target;
    }
  
    document.addEventListener('mouseover', (event) => {
        var target = electron_hover_delegate_cao(event, 'a');
        if (target) {
            var bar = document.getElementById('electron_statusbar_cao');
            bar.innerHTML=target.href;
            bar.style.visibility='visible';
        }
    });
  
    document.addEventListener('mouseout', (event) => {
        if (electron_hover_delegate_cao(event, 'a')) {
            var bar = document.getElementById('electron_statusbar_cao');
            bar.innerHTML='';
            bar.style.visibility='hidden';
        }
    });
  
    `;
    document.head.appendChild(s);
  }
  
  function electron_statusbar_cao_injecthtml(){
    var d = document.createElement("span");
    d.id='electron_statusbar_cao';
    d.style.cssText = `position:fixed;
    bottom:0px;
    left:0;
    z-index:9999;
    min-width:35%;
    border-radius: 0 3px 0 0;
    background-color:#f2f2f2;
    font-family: Consolas,"courier new";
    font-size: 12px;
    color:#666666;
    padding:3px;
    border:1px  solid #ddd;
    visibility: hidden;`;
    d.innerHTML = '';
    document.body.appendChild(d);
  }
  
process.once('loaded', function () {
    window.onload = function() {
      electron_statusbar_cao_injecthtml()
      electron_statusbar_cao_injectjs()
    }
})