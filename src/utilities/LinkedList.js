class LinkedList {
  constructor(value = null) {
    this.head = null;
    this.tail = null;

    if (value) {
      this.addToFront(value);
    }
  }

  addToFront(value) {
    let node = new Node(value);
    node.next = this.head;

    if (this.head) {
      this.head.prev = node;
    } else {
      this.tail = node;
    }
    this.head = node;
  }

  addToBack(value) {
    let node = new Node(value);
    if (this.head) {
      this.tail.next = node;
      node.prev = this.tail;
    } else {
      this.head = node;
    }
    this.tail = node;
  }

  dropFromBack() {
    if (this.tail) {
      this.tail = this.tail.prev;
      if (this.tail) {
        this.tail.next = null;
      }
    }
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

export default LinkedList;
