// Internal node representation
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

export default class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  insertAt(position, value) {
    if (position < 0 || position > this.size) {
      throw new Error("Invalid position");
    }

    const node = new Node(value);

    if (position === 0) {
      node.next = this.head;
      this.head = node;
    } else {
      let prev = this.head;
      for (let i = 0; i < position - 1; i++) {
        prev = prev.next;
      }
      node.next = prev.next;
      prev.next = node;
    }

    this.size++;
  }

  deleteAt(position) {
    if (position < 0 || position >= this.size) {
      throw new Error("Invalid position");
    }

    if (position === 0) {
      this.head = this.head.next;
    } else {
      let prev = this.head;
      for (let i = 0; i < position - 1; i++) {
        prev = prev.next;
      }
      if (prev.next) prev.next = prev.next.next;
    }

    this.size--;
  }

  search(value) {
    let curr = this.head;
    let index = 0;
    while (curr) {
      if (curr.value === value) return index;
      curr = curr.next;
      index++;
    }
    return -1;
  }

  reverse() {
    let prev = null;
    let curr = this.head;
    while (curr) {
      const next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }
    this.head = prev;
  }

  toArray() {
    const arr = [];
    let curr = this.head;
    while (curr) {
      arr.push(curr.value);
      curr = curr.next;
    }
    return arr;
  }
}
