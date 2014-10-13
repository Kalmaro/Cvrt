var Qualification =  function(drivers){
    var results = [];

    this.doQualification = function(){
        drivers.forEach(function(driver){
            driver.qualRes = driver.koeff * (Math.random()*(1 - 0.7 + 1) + 0.7);
        });

        drivers.sort(function(d1, d2){
            return d1.qualRes > d2.qualRes ? -1 : d1.qualRes < d2.qualRes ? 1 : 0;
        });

        drivers.forEach(function(driver, index){
            driver.racePos = ++index;
        });

        return drivers;
    };
};

Qualification.prototype.version = function(){
    return '1.0';
};
