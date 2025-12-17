
export function* insertSteps(list, position, value) {
  if (position < 0 || position > list.size) {
    yield { type: "error", message: "Invalid position" };
    return;
  }

  if (position === 0) {
    yield {
      type: "insert",
      index: 0,
      value,
      message: `Insert ${value} at head`
    };
    return;
  }

  for (let i = 0; i < position - 1; i++) {
    yield {
      type: "visit",
      index: i,
      message: `Traversing index ${i}`
    };
  }

  yield {
    type: "insert",
    index: position,
    value,
    message: `Insert ${value} at index ${position}`
  };
}

export function* deleteSteps(list, position) {
  if (position < 0 || position >= list.size) {
    yield { type: "error", message: "Invalid position" };
    return;
  }

  if (position === 0) {
    yield {
      type: "delete",
      index: 0,
      message: "Delete head"
    };
    return;
  }

  for (let i = 0; i < position - 1; i++) {
    yield {
      type: "visit",
      index: i,
      message: `Traversing index ${i}`
    };
  }

  yield {
    type: "delete",
    index: position,
    message: `Delete index ${position}`
  };
}

export function* searchSteps(list, value) {
  let curr = list.head;
  let index = 0;

  while (curr) {
    yield {
      type: "visit",
      index,
      message: `Visiting index ${index}`
    };

    if (curr.value === value) {
      yield {
        type: "found",
        index,
        message: `Found ${value} at index ${index}`
      };
      return;
    }

    curr = curr.next;
    index++;
  }

  yield {
    type: "done",
    index: null,
    message: `${value} not found`
  };
}

export function* reverseSteps(list) {
  list.reverse();
  yield {
    type: "done",
    index: null,
    message: "Linked list reversed"
  };
}
