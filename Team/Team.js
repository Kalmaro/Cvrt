var Team = function(name, id, drivers, car){
    var name = name,
        drivers = drivers,
        id = id;
        car = car;
    this.driverFirst = function() {return drivers[0]};
    this.driverSecond = function() {return drivers[1]};

    this.car = function() {return car;};
    this.id = function() {return id; };
};