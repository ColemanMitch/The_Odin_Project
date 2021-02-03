import {
    generateHeader
} from './modules/header';
import {
    generateAbout
} from './modules/about';
import {
    generateMenu
} from './modules/menu';
import {
    generateContact
} from './modules/contact';




// Default view for page is to show the about
(() => {
    const content = document.getElementById('content');
    generateHeader(content);
})();

const tabWrap = document.getElementById('tab-wrap-1');
generateAbout(tabWrap);
generateMenu(tabWrap);
generateContact(tabWrap);


/* let tabs = document.getElementsByClassName('tab')

for (var t=0; t < tabs.length; t++) {
    tabs[t].addEventListener("click", routePage, false);

}


function routePage () {
    switch (this.id){
        case 'tab1':
            console.log('show the about');
            break;
        case 'tab2':
            console.log('show the menu');
            break;
        case 'tab3':
            console.log('show the location');
            break;
    }
} */
