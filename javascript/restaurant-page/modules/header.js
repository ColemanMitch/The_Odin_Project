// header.js


export function generateHeader(content) {
    let title = document.createElement('h1')
    title.textContent = 'Chef Tony\'s';
    let tagline = document.createElement('h2');
    tagline.textContent = '"Try the gabagool!"';
    content.appendChild(title);
    content.appendChild(tagline);
    //content.appendChild(title); 
    let tabWrap = document.createElement('div');
    tabWrap.setAttribute('class', 'tab-wrap');
    tabWrap.setAttribute('id', 'tab-wrap-1');

    content.appendChild(tabWrap);
    console.log(tabWrap);

    for (var i=0; i < 3; i++){
        let tab = document.createElement('input');
        if (i === 0) {
            tab.setAttribute('checked', true);
        }
        tab.setAttribute('name', 'tabGroup1');
        tab.setAttribute('class', 'tab')
        tab.setAttribute('id', 'tab'+String(i+1));
        tab.setAttribute('type', 'radio');
        tabWrap.appendChild(tab)

        let tabLabel = document.createElement('label');
        tabLabel.setAttribute('for', 'tab'+String(i+1));
        switch(i+1) {
            case 1:
                tabLabel.textContent = 'About';
                break;
            case 2:
                tabLabel.textContent = 'Menu';
                break;
            case 3:
                tabLabel.textContent = 'Contact';
                break;

        }
        tabWrap.appendChild(tabLabel)

    }
    console.log('deez nuts')
}

/* //<div class='tab-wrap'>
<input type="radio" id="tab1" name="tabGroup1" class="tab" checked>
<label for="tab1">About</label>
<input type="radio" id="tab2" name="tabGroup1" class="tab">
<label for="tab2">Menu</label>
<input type="radio" id="tab3" name="tabGroup1" class="tab">
<label for="tab3">Contact</label> */