(function(win){
    var service = {};
    var config = null;
    var modules = {};

    function loadConfig(path, cb){
        var xhr = new XMLHttpRequest();
        xhr.overrideMimeType('application/json');
        xhr.open('GET', path, true);
        xhr.onreadystatechange = function(data){
            if (xhr.readyState == 4 && xhr.status == "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                config = JSON.parse(xhr.responseText);
                cb && cb();
            }
        };
        xhr.send(null);
    }

    function fireEvent(){
        var event; // The custom event that will be created
        var element = document.body;

        if (document.createEvent) {
            event = document.createEvent("HTMLEvents");
            event.initEvent("modules-are-loaded", true, true);
        } else {
            event = document.createEventObject();
            event.eventType = "modules-are-loaded";
        }

        event.eventName = "modules-are-loaded";

        if (document.createEvent) {
            element.dispatchEvent(event);
        } else {
            element.fireEvent(event.eventType, event);
        }
    }

    service.loadModule = function(name){
        var path = config.modules[name];
        if(!path){
           throw new Error('Module has not been found!');
        }
        return DOMService.addScript(path);
    };

    service.loadAll = function(){
        var scriptPromises = [];
        for(var name in config.modules){
            scriptPromises.push(DOMService.addScript(config.modules[name]));
        }
        Promise.all(scriptPromises).then(function(){
            fireEvent();
        });
    };

    service.addModule = function(module){
        modules[module.type] = module;
        console.log('Module', module.type, '[', module.title, ']', 'version:', module.version, 'is loaded');
    };

    service.getModule = function(name){
        return modules[name];
    };

    loadConfig('Cvrt.cfg.json', function(){
        console.log('Champ name:', config.title);
        console.log('config version:', config.version);
        service.loadAll();
    });

    win.moduleService = service;
})(window);