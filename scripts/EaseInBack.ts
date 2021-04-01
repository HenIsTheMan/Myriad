class EaseInBack extends Easing {
	constructor() {
		super();
	}

	Ease(x: number): number {
		return Easing.c3 * x * x * x - Easing.c1 * x * x;
	}

	public static readonly globalObj = new EaseInBack();
}

module.exports = {
	EaseInBack
};