(function (win) {
    var service = {};
    service.addScript = function (path) {
        var head = document.getElementsByTagName('head')[0];
        var promise = new Promise(function (resolve) {
            var script = document.createElement('script');
            script.src = 'modules/' + path;

            script.onload = function () {
                resolve();
            };

            head.appendChild(script);
        });

        return promise;
    };

    win.DOMService = service;
})(window);
