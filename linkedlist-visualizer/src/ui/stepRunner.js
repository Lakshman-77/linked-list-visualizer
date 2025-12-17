import { renderLinkedList } from "./renderer.js";

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function clearHighlights() {
  document.querySelectorAll(".node").forEach(node => {
    node.classList.remove("active");
  });
}

function highlightNode(index) {
  const node = document.querySelector(`.node[data-index="${index}"]`);
  if (node) {
    node.classList.add("active");
  }
}

export async function runSteps(steps, list, speed = 600) {
  const explanation = document.getElementById("explanation");

  for (const step of steps) {
    // Update explanation
    explanation.textContent = step.message || "";

    // Clear previous highlights
    clearHighlights();

    // Highlight traversal / target node
    if (step.index !== null && step.index !== undefined) {
      highlightNode(step.index);
    }

    // INSERT
    if (step.type === "insert") {
      await delay(speed / 2);

      list.insertAt(step.index, step.value);
      renderLinkedList(list.toArray());

      const newNode = document.querySelector(
        `.node[data-index="${step.index}"]`
      );
      if (newNode) {
        newNode.classList.add("moving");
        setTimeout(() => newNode.classList.remove("moving"), 400);
      }

      await delay(speed);
      continue;
    }

    // DELETE
    if (step.type === "delete") {
      const node = document.querySelector(
        `.node[data-index="${step.index}"]`
      );

      if (node) {
        node.classList.add("removing");
        await delay(300);
      }

      list.deleteAt(step.index);
      renderLinkedList(list.toArray());

      await delay(speed);
      continue;
    }

    // SEARCH FOUND
    if (step.type === "found") {
      highlightNode(step.index);
      await delay(speed * 1.2);
      continue;
    }

    // REVERSE (already mutates list in steps)
    if (step.type === "done") {
      renderLinkedList(list.toArray());
      await delay(speed);
      continue;
    }

    // VISIT / TRAVERSAL
    await delay(speed);
  }

  clearHighlights();
}
