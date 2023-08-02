export default class JSQueue<T> {
  public length: number;
  private queue: T[];

  constructor(initial: T[] = []) {
    this.queue = [...initial];
    this.length = this.queue.length;
  }

  enqueue(item: T): JSQueue<T> {
    this.queue.push(item);
    this.length = this.queue.length;
    return this;
  }

  deque(): T | undefined {
    const value = this.queue.shift();
    this.length = this.queue.length;
    return value;
  }
}
