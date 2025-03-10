// export const handleBtnCardClick = (card, wrapper, button, counter) => {
//     card.toggleSelection();
//     wrapper.style.backgroundColor = card.isSelected ? "#d1ffd1" : "#fff";
//     button.setText(card.isSelected ? "Deselect" : "Select");

//     if (card.isSelected) {
//       counter.increment();
//     } else {
//       counter.decrement();
//     }
//   };

export const handleBtnCardClick = (card, wrapper, button, counter) => {
  card.toggleSelection();
  wrapper.style.backgroundColor = card.isSelected ? "#d1ffd1" : "#fff";
  button.setText(card.isSelected ? "Deselect" : "Select");

  if (card.isSelected) {
      counter.increment();
  } else {
      counter.decrement();
  }

  // Manage selected card IDs in local storage
  const storageKey = "selectedCards";
  const selectedIds = JSON.parse(localStorage.getItem(storageKey)) || [];

  if (card.isSelected) {
      if (!selectedIds.includes(card.id)) {
          selectedIds.push(card.id);
      }
  } else {
      const index = selectedIds.indexOf(card.id);
      if (index > -1) {
          selectedIds.splice(index, 1);
      }
  }

  // Update local storage
  localStorage.setItem(storageKey, JSON.stringify(selectedIds));
  localStorage.setItem("counter", counter.getCount());
};
