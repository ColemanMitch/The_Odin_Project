// menu.js


export function generateMenu(tabWrap) {
    let menuTabContent = document.createElement('div');
    let title = document.createElement('h3');
    title.textContent = 'Menu';
    menuTabContent.appendChild(title);
    menuTabContent.setAttribute('class', 'tab__content');

    // Apps
    let apps = document.createElement('div');
    let appsTitle = document.createElement('p')
    appsTitle.textContent = 'APPETIZERS';
    appsTitle.style.textDecoration='underline';
    apps.appendChild(appsTitle);
    let appsList1 = document.createElement('p')
    appsList1.textContent = 'Calamari';
    let appsList2 = document.createElement('p')
    appsList2.textContent = 'Capicola';
    apps.appendChild(appsList1);
    apps.appendChild(appsList2);
    apps.setAttribute('class', 'menu-course');


    // First Courses
    let first = document.createElement('div');
    let firstTitle = document.createElement('p')
    firstTitle.textContent = 'FIRST COURSE';
    firstTitle.style.textDecoration='underline';
    first.appendChild(firstTitle);    
    let firstList1 = document.createElement('p')
    firstList1.textContent = 'Bruschetta';
    let firstList2 = document.createElement('p')
    firstList2.textContent = 'Gabagool!';
    first.appendChild(firstList1);
    first.appendChild(firstList2);
    first.setAttribute('class', 'menu-course');

     // Main Courses
    let main = document.createElement('div');
    let mainTitle = document.createElement('p')
    mainTitle.textContent = 'MAIN COURSE';
    mainTitle.style.textDecoration='underline';
    main.appendChild(mainTitle); 
    let mainList1 = document.createElement('p')
    mainList1.textContent = 'Spaghetti & Meatballs';
    let mainList2 = document.createElement('p')
    mainList2.textContent = 'Osso Bucco';
    main.appendChild(mainList1);
    main.appendChild(mainList2);
    main.setAttribute('class', 'menu-course');

     // Desserts
    let dessert = document.createElement('div');
    let dessertTitle = document.createElement('p')
    dessertTitle.textContent = 'DESSERT';
    dessertTitle.style.textDecoration='underline';
    dessert.appendChild(dessertTitle); 
    let dessertList1 = document.createElement('p')
    dessertList1.textContent = 'Tiramisu';
    let dessertList2 = document.createElement('p')
    dessertList2.textContent = 'Gelato';
    dessert.appendChild(dessertList1);
    dessert.appendChild(dessertList2);
    dessert.setAttribute('class', 'menu-course');

     // Wine
    let wine = document.createElement('div');
    let wineTitle = document.createElement('p')
    wineTitle.textContent = 'WINE';
    wineTitle.style.textDecoration='underline';
    wine.appendChild(wineTitle); 
    let wineList1 = document.createElement('p')
    wineList1.textContent = 'Pinot Grigio'
    let wineList2 = document.createElement('p')
    wineList2.textContent = 'Chardonnay'
    wine.appendChild(wineList1);
    wine.appendChild(wineList2);
    wine.setAttribute('class', 'menu-course');

    menuTabContent.appendChild(apps);
    menuTabContent.appendChild(first);
    menuTabContent.appendChild(main);
    menuTabContent.appendChild(dessert);
    menuTabContent.appendChild(wine);

    tabWrap.appendChild(menuTabContent);
    console.log('yuh');


}