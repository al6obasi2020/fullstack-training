import { countAndCreateElement } from "../Molecule/countAndCreateElement/countAndCreateElement.js";
import { CardList } from "../Templates/CardList/CardList.js";
import { Navbar } from "../organism/Navbar/navbar.js";
import { Tabs } from "../organism/Tabbed/Tabbed.js";
import { setupLayout } from "../organism/setupLayout/setupLayout.js";
export class Page {
    constructor() {

      this.counter = countAndCreateElement();
      this.cardList = new CardList(this.counter);
    }

    init() {
      setupLayout(this.cardList, this.counter);
      this.cardList.loadCards();
    }



  }