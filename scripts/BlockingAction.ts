import Time from 'Time';

export abstract class BlockingAction {
    type: string;
    abstract setup(iter: IterableIterator<BlockingAction>): void;
    handleNext(iter: IterableIterator<BlockingAction>): void {
        let n = iter.next();
        if (n.done)
            return;

        n.value.setup(iter);
    };

    public static startCoroutine(func: () => IterableIterator<BlockingAction>): void {
        let iter = func();
        let n = iter.next();
        if (n.done)
            return;

        n.value.setup(iter);
    }
}

export class Wait extends BlockingAction {
    wait: number;

    constructor(timeout: number) {
        super();
        this.wait = timeout;
    }

    setup(iter: IterableIterator<BlockingAction>): void {
        let t = this;

        let timerID = Time.setTimeout(function () {
            t.handleNext(iter);
        }, this.wait);
    }
}