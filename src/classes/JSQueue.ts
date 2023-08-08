export default class JSQueue<T> {
  private start: number;
  private end: number;

  private queue: (T | undefined)[];

  constructor(initial: T[] = []) {
    this.queue = [...initial];
    this.end = this.queue.length;
    this.start = 0;
  }

  enqueue(item: T): JSQueue<T> {
    this.queue.push(item);
    this.end++;
    return this;
  }

  deque(): T | undefined {
    if (this.start > this.end) {
      return undefined;
    }

    const value = this.queue[this.start];
    this.queue[this.start] = undefined;
    this.start++;

    return value;
  }

  length(): number {
    return this.end - this.start;
  }
}
