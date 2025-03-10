import { FALLBACK_IMAGE } from "../../config.js";

// KanbanBoardCard.js
export class KanbanBoardCard {
  constructor(id, name, imageUrl, type, boardId = 1) {
    this.id = id;
    this.name = name;
    this.imageUrl = imageUrl;
    this.type = type;
    this.boardId = boardId;
  }

  render() {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card-kanban-kanban');
    cardElement.setAttribute('draggable', 'true');
    cardElement.setAttribute('data-id', this.id);

    const cardImage = document.createElement('img');
    cardImage.src = this.imageUrl ||   FALLBACK_IMAGE;
    cardImage.alt = this.name;
    cardImage.classList.add('card-image-kanban');

    const cardName = document.createElement('div');
    cardName.classList.add('card-name-kanban');
    cardName.textContent = this.name;

    cardElement.appendChild(cardImage);
    cardElement.appendChild(cardName);

    return cardElement;
  }
}
