export function renderLinkedList(values) {
  const container = document.querySelector(".ll");

  // Capture old positions
  const oldNodes = Array.from(container.children).filter(
    el => el.classList.contains("node")
  );
  const oldPositions = new Map();

  oldNodes.forEach(node => {
    oldPositions.set(node.dataset.value, node.getBoundingClientRect());
  });

  // Clear and re-render
  container.innerHTML = "";

  values.forEach((val, index) => {
    const node = document.createElement("div");
    node.className = "node";
    node.textContent = val;
    node.dataset.value = val;
    node.dataset.index = index;

    container.appendChild(node);

    if (index < values.length - 1) {
      const arrow = document.createElement("span");
      arrow.className = "arrow";
      arrow.textContent = "→";
      container.appendChild(arrow);
    }
  });

  // Animate movement
  requestAnimationFrame(() => {
    const newNodes = Array.from(container.querySelectorAll(".node"));

    newNodes.forEach(node => {
      const oldPos = oldPositions.get(node.dataset.value);
      if (!oldPos) return;

      const newPos = node.getBoundingClientRect();
      const dx = oldPos.left - newPos.left;

      node.style.transform = `translateX(${dx}px)`;
      node.style.transition = "none";

      requestAnimationFrame(() => {
        node.style.transform = "";
        node.style.transition = "transform 0.4s ease";
      });
    });
  });
}
