(function(math){
    math.randomInt = function(min, max){
        return Math.floor(Math.random() * (max - min)) + min;
    };

    math.randomFloat = function(min, max){
        return Math.random() * (max - min) + min;
    };
})(this.Math)
