// contact.js

export function generateContact(tabWrap) {

    //Creat and add title
    let contactTabContent = document.createElement('div');
    contactTabContent.setAttribute('class', 'tab__content');
    let title = document.createElement('h3');
    title.textContent = 'Contact & Location';
    contactTabContent.appendChild(title);
    let linebreak = document.createElement('br');
    let line = document.createElement('hr');
    let contactPage = document.createElement('div');
    contactPage.setAttribute('id', 'contact-page')


    // Contact & Location 
    let cL = document.createElement('div')
    cL.setAttribute('id', 'location-phone')
    let cL1 = document.createElement('p');
    cL1.textContent = 'Contact & Location:';
    cL1.setAttribute('class', 'subtitle')
    cL.appendChild(cL1);
    let cL2 = document.createElement('p');
    cL2.textContent = '14 Aspen Drive';
    cL.appendChild(cL2);
    let cL3 = document.createElement('p');
    cL3.textContent = 'North Caldwell, NJ 07006';
    cL.appendChild(cL3);
    let cL4 = document.createElement('a');
    cL4.textContent = '1-(862)-SOPRANO';
    cL4.setAttribute('href', 'tel:18776085405'); 
    cL.appendChild(cL4);
    contactPage.appendChild(cL);

    // Restaurant Hours 
    let rH = document.createElement('div')
    rH.setAttribute('id', 'rest-hours')
    let rH1 = document.createElement('p');
    rH1.textContent = 'Restaurant Hours:';
    rH1.setAttribute('class', 'subtitle')
    rH.appendChild(rH1);
    let rH2 = document.createElement('p');
    rH2.textContent = 'Mon: Closed ';
    rH.appendChild(rH2);
    let rH3 = document.createElement('p');
    rH3.textContent = 'Tue-Thu: 12:00p-9:00p';
    rH.appendChild(rH3);
    let rH4 = document.createElement('p');
    rH4.textContent = 'Fri-Sun: 12:00p-10:00p';
    rH.appendChild(rH4);
    contactPage.appendChild(rH);


    // Add in iframe for map
    let gMap = document.createElement('iframe');
    gMap.setAttribute('src', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3017.1748498174475!2d-74.24744048459029!3d40.868036879315206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c3004ba360a45d%3A0x40e2b98a49411f85!2s14%20Aspen%20Dr%2C%20Caldwell%2C%20NJ%2007006!5e0!3m2!1sen!2sus!4v1606087594620!5m2!1sen!2sus')
    gMap.setAttribute('id', 'google-map')
    gMap.setAttribute('style', '"border:0;" allowfullscreen="" aria-hidden="false"tabindex="0"');
    
    contactTabContent.appendChild(contactPage);
    contactTabContent.appendChild(line);
    contactTabContent.appendChild(gMap);

    // 
    tabWrap.appendChild(contactTabContent);



}