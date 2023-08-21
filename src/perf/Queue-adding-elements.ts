import Benchmark from "benchmark";
import JSQueue from "../classes/JSQueue";

const elements = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const suite = new Benchmark.Suite();

suite
  .add("Array pushing", () => {
    const queue = [...elements];

    queue.push(1);
  })
  .add("JSQueue enqueue", () => {
    const jsqueue = new JSQueue(elements);

    jsqueue.enqueue(1);
  })
  .run({ async: true })
  .on("cycle", function (event: { target: any }) {
    console.log(String(event.target));
  })
  .on("complete", function () {
    console.log("Fastest is " + this.filter("fastest").map("name"));
  });
