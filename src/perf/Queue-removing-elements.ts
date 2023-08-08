import Benchmark from "benchmark";
import JSQueue from "../classes/JSQueue";
import { LoremIpsum } from "lorem-ipsum";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

const numberElements = Array.from({ length: 1000 }, (value, index) => index);
const numberQueue = [...numberElements];
const jsqueueNumbers = new JSQueue(numberElements);

const stringElements = Array.from({ length: 1000 }, (value, index) =>
  lorem.generateSentences(1),
);
const stringQueue = [...stringElements];
const jsqueueStrings = new JSQueue(stringElements);

const suite = new Benchmark.Suite();

suite
  .add("Array number popping", () => {
    numberQueue.pop();
  })
  .add("JSQueue number deque", () => {
    jsqueueNumbers.deque();
  })
  .add("Array string popping", () => {
    stringQueue.pop();
  })
  .add("JSQueue string deque", () => {
    jsqueueStrings.deque();
  })
  .run({ async: true })
  .on("cycle", function (event: { target: any }) {
    console.log(String(event.target));
  })
  .on("complete", function () {
    console.log("Fastest is " + this.filter("fastest").map("name"));
  });
