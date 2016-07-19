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

    service.loadModule = function(name){
        var path = config.modules[name];
        if(path){
            DOMService.addScript(path);
        } else {
            throw new Error('Module has not been found!');
        }
    };

    service.loadAll = function(){
        for(var name in config.modules){
            DOMService.addScript(config.modules[name]);
        }
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