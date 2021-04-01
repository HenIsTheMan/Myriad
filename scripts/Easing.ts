abstract class Easing {
    protected static readonly c1 = 1.70158;
    protected static readonly c3 = Easing.c1 + 1.0;

    constructor() {
    }

    abstract Ease(x: number): number;
}

module.exports = {
    Easing
};