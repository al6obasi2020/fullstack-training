export class KanbanBoard {
    constructor(id, name, imageUrl, type) {
      this.id = id;
      this.name = name;
      this.imageUrl = imageUrl;
      this.type = type;
      this.cards = [];
    }

    addCard(card) {
      this.cards.push(card);
    }

    render() {
      const boardElement = document.createElement('div');
      boardElement.classList.add('board-kanban');
      boardElement.setAttribute('data-id', this.id);

      const boardHeader = document.createElement('div');
      boardHeader.classList.add('board-header-kanban');

      const boardImage = document.createElement('img');
      boardImage.src = this.imageUrl;
      boardImage.alt = this.name;
      boardImage.classList.add('board-image-kanban');

      const boardName = document.createElement('div');
      boardName.classList.add('board-name-kanban');
      boardName.textContent = this.name;

      boardHeader.appendChild(boardImage);
      boardHeader.appendChild(boardName);
  
      const boardContent = document.createElement('div');
      boardContent.classList.add('board-content-kanban');
  
      this.cards.forEach(card => {
        boardContent.appendChild(card.render());
      });
  
      boardElement.appendChild(boardHeader);
      boardElement.appendChild(boardContent);
  
      return boardElement;
    }
  }
