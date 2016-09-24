var ChampionshipPresenter = function () {
    var champData = null;
    var db = null;

    function initTabSet(data) {
        var tabSetElement = document.getElementById('tab-set');
        var allTabElem = document.createElement('a');
        allTabElem.innerHTML = 'All';
        allTabElem.href = '#all';
        tabSetElement.appendChild(allTabElem);
        data.forEach(function (tab) {
            var tabElem = document.createElement('a');
            tabElem.href = tabElem.innerHTML = '#' + tab.name;
            tabSetElement.appendChild(tabElem);
        });
    }

    function initTabContent(data) {
        var champResMode = !data;
        if (champResMode) {
            var champResults = [];
            champData.forEach(function (wknd) {
                var race = wknd.race;
                champResults = updateChampState(champResults, race);
            });
        }

        renderResults(data || champResults);
    }

    function updateChampState(state, race) {
        for (var i = 0; i < race.length; i++) {
            var driver = race[i];
            var driverWithScores = state.find(function (_driver) {
                return _driver.driverId === driver.driverId;
            });
            if (driverWithScores) {
                driverWithScores.points += (pointsMap[i+1] + 0) || 0;
            } else {
                var _driver = Object.create(driver);
                _driver.points = (pointsMap[i+1] + 0) || 0;
                state.push(_driver)
            }
        }

        state = state.sort(function(a, b){
            return a.points > b.points ? -1 : (a.points < b.points ? 1 : 0);
        });

        return state;
    }

    function getDriverById(id){
        return getById(db.drivers, id).name;
    }

    function getTeamInfoById(id){
        var team = getById(db.team, id);
        var und = getById(db.und, team.undId);
        var eng = getById(db.eng, team.engId);

        return team.name + '  ' + und.name + '  ' + eng.name;
    }


    function renderResults(data){
        var contentElem = document.getElementById('tab-content');
        var htmlString = '';
        data.forEach(function(driver, index){
            htmlString += '<div>' + '<span>' + (index + 1) +'. ' +'</span><span>' + '  ' + getDriverById(driver.driverId) + '</span>';
            htmlString += '  ' + '<span>' + getTeamInfoById(driver.teamId) + '</span>';
            if(driver.points){
                htmlString += '  ' + '<span>' + driver.points || 0 + '</span>';
            }
            htmlString += '</div>';
        });
        contentElem.innerHTML = htmlString;
    }


//    moduleService.loadJsonData('champ').then(function(data){
//        champData = data;
//        initTabSet(data);
//    });

    function hashChangeHandler() {
        var wkndName = location.hash.replace('#', '');
        var wknd = champData.find(function (wknd) {
            return wknd.name === wkndName;
        }) || {};
        initTabContent(wknd.race);
    }

    window.addEventListener("hashchange", hashChangeHandler, false);

    window.addEventListener('modules-are-loaded', function(){
        Promise.all([moduleService.loadJsonData('f2500edata'), moduleService.loadJsonData('champ')]).then(function (results) {
            db = results[0];
            champData = results[1].result;
            initTabSet(champData);
            hashChangeHandler();
        });
    });

    function getById(data, id){
        return data.find(function(unit){
            return unit.id === id;
        }) || {};
    }

    var pointsMap = {
        '1': 20,
        '2': 16,
        '3': 12,
        '4': 8,
        '5': 4,
        '6': 1
    };
};
