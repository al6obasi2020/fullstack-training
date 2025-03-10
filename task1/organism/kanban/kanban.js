import { KanbanBoard } from "../kanbanBoard/kanbanBoard.js";
import { KanbanBoardCard } from "../kanbanBoardCard/kanbanBoardCard.js";
export class Kanban {
  constructor(elementId, dataUrl) {
    this.element = document.getElementById('card-container');
    this.dataUrl = dataUrl;
    this.boards = [];
  }

  async init() {
    const data = await this.fetchData();
    this.createBoards(data);
    this.render();
    this.initDragAndDrop();
  }

  async fetchData() {
    const response = await fetch(this.dataUrl);
    const data = await response.json();
    return {
        ...data,
        cards: data.cards.slice(0, 10) // Limit cards to 10
    };
  }

  createBoards(data) {
    console.log('Fetched data:', data);
    // Create all boards from data structure
    if (Array.isArray(data.boards)) {
      data.boards.forEach(boardData => {
        const board = new KanbanBoard(boardData.id, boardData.name, boardData.imageUrl, boardData.type);
        this.boards.push(board);
      });
    } else {
      // Fallback to create a default board if no boards array
      const board = new KanbanBoard(1, "To Do", "atoms/logo/todo.png", "todo");
      this.boards.push(board);
      const board2 = new KanbanBoard(2, "In Progress", "atoms/logo/inprogress.png", "inprogress");
      this.boards.push(board2);
      const board3 = new KanbanBoard(3, "Done", "atoms/logo/done.png", "done");
      this.boards.push(board3);
    }

    // Add cards to appropriate boards
    if (Array.isArray(data.cards)) {
      data.cards.forEach(cardData => {
        const card = new KanbanBoardCard(
          cardData.id,
          cardData.name,
          cardData.imageUrl,
          cardData.type,
          cardData.boardId || 1 // Default to first board if not specified
        );

        // Find the board to add this card to
        const targetBoard = this.boards.find(board => board.id === card.boardId);
        if (targetBoard) {
          targetBoard.addCard(card);
        } else if (this.boards.length > 0) {
          // Add to first board if target board not found
          this.boards[0].addCard(card);
        }
      });
    }
  }

  render() {
    this.element.innerHTML = '';
    this.element.classList.add('kanban-board-kanban');
    this.boards.forEach(board => {
      this.element.appendChild(board.render());
    });
  }

  initDragAndDrop() {
    let draggedCard = null;

    // Add event listeners to all cards
    document.querySelectorAll('.card-kanban-kanban').forEach(card => {
      card.addEventListener('dragstart', (e) => {
        draggedCard = card;
        card.classList.add('dragging');
        e.dataTransfer.setData('text/plain', card.getAttribute('data-id'));
        setTimeout(() => {
          card.style.display = 'none';
        }, 0);
      });

      card.addEventListener('dragend', () => {
        card.classList.remove('dragging');
        card.style.display = 'block';
        draggedCard = null;
      });
    });

    // Add event listeners to all board content areas
    document.querySelectorAll('.board-content-kanban').forEach(boardContent => {
      boardContent.addEventListener('dragover', (e) => {
        e.preventDefault();
        boardContent.classList.add('drag-over');
      });

      boardContent.addEventListener('dragleave', () => {
        boardContent.classList.remove('drag-over');
      });

      boardContent.addEventListener('drop', (e) => {
        e.preventDefault();
        boardContent.classList.remove('drag-over');

        if (draggedCard) {
          boardContent.appendChild(draggedCard);

          // Update the data model
          const cardId = parseInt(draggedCard.getAttribute('data-id'));
          const boardId = parseInt(boardContent.closest('.board-kanban').getAttribute('data-id'));

          // Find and update the card's boardId in our data model
          this.boards.forEach(board => {
            const cardIndex = board.cards.findIndex(card => card.id === cardId);
            if (cardIndex !== -1) {
              const card = board.cards.splice(cardIndex, 1)[0];
              card.boardId = boardId;

              // Find the target board and add the card
              const targetBoard = this.boards.find(b => b.id === boardId);
              if (targetBoard) {
                targetBoard.addCard(card);
              }
            }
          });
        }
      });
    });
  }
}