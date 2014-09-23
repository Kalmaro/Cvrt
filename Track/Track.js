var Track = function (title, aeroK, shK, engK) {
    this.title = function () {
        return title;
    };

    this.koeff = function () {
        return [aeroK, shK, engK];
    };
};

Track.prototype.version = function () {
    return '1.0';
};
