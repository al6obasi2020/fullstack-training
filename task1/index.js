

import { Navbar } from "./organism/Navbar/navbar.js";
import{ Tabs } from "./organism/Tabbed/Tabbed.js";
import { Page } from "./pages/Home.js";

 // Initialize Navbar

new Navbar();

const page = new Page();

page.init();



