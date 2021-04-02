import Time from 'Time';

export abstract class BlockingAction {
    abstract Setup(iter: IterableIterator<BlockingAction>): void;

    public static HandleNext(iter: IterableIterator<BlockingAction>): void {
        let n = iter.next();
        if (n.done) {
            return;
        }

        n.value.Setup(iter);
    };
}

export class Wait extends BlockingAction {
    private waitTime: number;

    constructor(waitTime: number) {
        super();
        this.waitTime = waitTime;
    }

    Setup(iter: IterableIterator<BlockingAction>): void {
        let timerID = Time.setTimeout(function (): void {
            BlockingAction.HandleNext(iter);
        }, this.waitTime);
    }
}

export function StartCoroutine(func: () => IterableIterator<BlockingAction>): void {
    BlockingAction.HandleNext(func());
}