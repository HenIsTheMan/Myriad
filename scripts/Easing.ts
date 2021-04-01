abstract class Easing {
    protected static c1: number;
    protected static c3: number;

    constructor() {
        Easing.c1 = 1.70158;
        Easing.c3 = Easing.c1 + 1.0;
    }

    abstract Ease(x: number): number;
}

module.exports = {
    Easing
};