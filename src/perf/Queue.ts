import Benchmark from "benchmark";
import JSQueue from "../classes/JSQueue";

const queue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const jsqueue = new JSQueue(queue);

const suite = new Benchmark.Suite();

suite
  .add("Array methods", () => {
    queue.push(1);
    queue.shift();
  })

  .add("JSQueue", () => {
    jsqueue.enqueue(1);
    jsqueue.deque();
  })
  .run({ async: true })
  .on("cycle", function (event: { target: any }) {
    console.log(String(event.target));
  })
  .on("complete", function () {
    console.log("Fastest is " + this.filter("fastest").map("name"));
  });
