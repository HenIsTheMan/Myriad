abstract class Easing {
    protected static c1: number = 1.70158;
    protected static c3: number = Easing.c1 + 1.0;

    abstract Ease(x: number): number;
}

module.exports = {
    Easing
};