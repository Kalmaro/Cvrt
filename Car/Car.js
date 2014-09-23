var Car = function(title, aeroK, shK, engK){
    this.title = function(){
        return title;
    };

    this.koeff = function(){
        return [aeroK, shK, engK];
    };
};

Car.prototype.version = function(){
    return '1.0';
};