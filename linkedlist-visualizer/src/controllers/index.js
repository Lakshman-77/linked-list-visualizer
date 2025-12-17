import LinkedList from "../engine/LinkedList.js";
import {
  insertSteps,
  deleteSteps,
  searchSteps,
  reverseSteps
} from "../steps/LinkedListSteps.js";
import { runSteps } from "../ui/stepRunner.js";
import { renderLinkedList } from "../ui/renderer.js";

const list = new LinkedList();

const operation = document.getElementById("operation");
const subOperation = document.getElementById("subOperation");
const dataInput = document.getElementById("data");
const positionInput = document.getElementById("position");
const goBtn = document.getElementById("goBtn");

renderLinkedList(list.toArray());

/* ---------------- UI CONFIG ---------------- */

const config = {
  insert: {
    options: [
      { value: "head", label: "Insert at Head" },
      { value: "tail", label: "Insert at Tail" },
      { value: "position", label: "Insert at Position" }
    ]
  },
  delete: {
    options: [
      { value: "head", label: "Delete at Head" },
      { value: "tail", label: "Delete at Tail" },
      { value: "position", label: "Delete at Position" },
      { value: "value", label: "Delete by Value" }
    ]
  },
  search: {
    options: [
      { value: "value", label: "Search by Value" }
    ]
  }
};

/* ---------------- OPERATION CHANGE ---------------- */

operation.addEventListener("change", () => {
  const op = operation.value;

  subOperation.innerHTML = "";
  subOperation.style.display = "none";
  dataInput.style.display = "none";
  positionInput.style.display = "none";

  if (op === "reverse") return;

  subOperation.style.display = "inline-block";

  config[op].options.forEach(opt => {
    const option = document.createElement("option");
    option.value = opt.value;
    option.textContent = opt.label;
    subOperation.appendChild(option);
  });

  subOperation.dispatchEvent(new Event("change"));
});

/* ---------------- SUB OPERATION CHANGE ---------------- */

subOperation.addEventListener("change", () => {
  const op = operation.value;
  const sub = subOperation.value;

  dataInput.style.display = "none";
  positionInput.style.display = "none";

  if (op === "insert") {
    if (sub === "head" || sub === "tail") {
      dataInput.style.display = "inline-block";
    }
    if (sub === "position") {
      dataInput.style.display = "inline-block";
      positionInput.style.display = "inline-block";
    }
  }

  if (op === "delete") {
    if (sub === "position") {
      positionInput.style.display = "inline-block";
    }
    if (sub === "value") {
      dataInput.style.display = "inline-block";
    }
  }

  if (op === "search") {
    dataInput.style.display = "inline-block";
  }
});

/* ---------------- EXECUTION ---------------- */

goBtn.addEventListener("click", async () => {
  const op = operation.value;
  const sub = subOperation.value;
  const value = Number(dataInput.value);
  const pos = Number(positionInput.value);

  let steps;

  try {
    if (op === "insert") {
      if (sub === "head") steps = insertSteps(list, 0, value);
      if (sub === "tail") steps = insertSteps(list, list.size, value);
      if (sub === "position") steps = insertSteps(list, pos, value);
    }

    if (op === "delete") {
      if (sub === "head") steps = deleteSteps(list, 0);
      if (sub === "tail") steps = deleteSteps(list, list.size - 1);
      if (sub === "position") steps = deleteSteps(list, pos);
      if (sub === "value") {
        const index = list.search(value);
        if (index === -1) {
          alert("Value not found");
          return;
        }
        steps = deleteSteps(list, index);
      }
    }

    if (op === "search") {
      steps = searchSteps(list, value);
    }

    if (op === "reverse") {
      steps = reverseSteps(list);
    }

    if (steps) {
      goBtn.disabled = true;
      await runSteps(steps, list);
      goBtn.disabled = false;
    }
  } catch (err) {
    alert(err.message);
    goBtn.disabled = false;
  }
});
