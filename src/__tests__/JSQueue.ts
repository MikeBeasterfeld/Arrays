import JSQueue from "../classes/JSQueue";

test("JSQueue any type", function () {
  const requests = new JSQueue<number | string | {} | undefined>();

  requests.enqueue(0);
  requests.enqueue("foo");
  requests.enqueue({ foo: "bar" });
  requests.enqueue(undefined);

  expect(requests.length).toEqual(4);
  expect(requests.deque()).toEqual(0);
  expect(requests.deque()).toEqual("foo");
  expect(requests.deque()).toEqual({ foo: "bar" });
  expect(requests.deque()).toBeUndefined();
  expect(requests.length).toEqual(0);

  const initalQueue = [1, 2, 3, 4];
  const numbers = new JSQueue<number>(initalQueue);

  expect(numbers.length).toEqual(4);
  expect(numbers.deque()).toEqual(1);
});
