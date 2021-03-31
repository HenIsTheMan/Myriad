class EaseInBack extends Easing {
	Ease(x: number): number {
		return Easing.c3 * x * x * x - Easing.c1 * x * x;
	}

	public static globalObj: EaseInBack = new EaseInBack();
}

module.exports = {
	EaseInBack
};