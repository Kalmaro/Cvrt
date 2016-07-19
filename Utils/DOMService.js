(function(win){
    var service = {};
    service.addScript = function(path){
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.src = 'modules/' + path;
        head.appendChild(script);
    };

    win.DOMService = service;
})(window);
