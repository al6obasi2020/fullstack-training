console.log(' Profile Page')
import { createElement } from '../../../utils';

export class ProfilePage {
  init(container) {
    container.className = 'profile-page';
    const title = createElement('h1', {}, 'Profile Page');
    container.appendChild(title);
  }
}
