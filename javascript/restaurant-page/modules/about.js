// about.js

export function generateAbout(tabWrap) {
    let aboutTabContent = document.createElement('div');
    let linebreak = document.createElement('br');
    aboutTabContent.setAttribute('class', 'tab__content');
    let title = document.createElement('h3');
    title.textContent = 'About';
    aboutTabContent.appendChild(title);

    // Picture of Tony + caption
    let fig = document.createElement('figure');
    let tonyPic = document.createElement('img');
    let figCap = document.createElement('figcaption');
    figCap.textContent = 'Executive Chef Tony Soprano';
    tonyPic.setAttribute('src', 'img/tony-soprano-smiling.jpg');
    tonyPic.setAttribute('height', '240px');
    fig.appendChild(tonyPic);
    fig.appendChild(figCap);

    // Text on the page
    let aboutText1 = document.createElement('p');
    aboutText1.setAttribute('class', 'p-about')
    aboutText1.textContent = "Since 1999, Chef Tony's has been an Essex County fixture serving delicious traditional Italian cuisine. Here at Chef Tony's, our culinary focus is on the freshest ingredients with simple preparations. The real focus is you, the customer, feeling like you can kick back and relax into the food (especially the gabagool!), wine, and warmth around you.";
    let aboutText2 = document.createElement('p');
    aboutText2.setAttribute('class', 'p-about')
    aboutText2.textContent = "Don't believe us? Just hear what our customers are saying...";

    // Videos
    let videosDiv = document.createElement('div')
    videosDiv.setAttribute('id', 'customer-videos');
    let video1= document.createElement('iframe')
    let video2= document.createElement('iframe')
    video1.setAttribute('src', 'https://www.youtube.com/embed/3poPknWsX84');
    video2.setAttribute('src', 'https://www.youtube.com/embed/YsBipoG22Nw');
    video1.setAttribute('frameborder', '0');
    video1.setAttribute('allow', "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
    video2.setAttribute('frameborder', '0');
    video2.setAttribute('allow', "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
    video1.setAttribute('allowfullscreen', true);
    video2.setAttribute('allowfullscreen', true);
    videosDiv.appendChild(video1);
    videosDiv.appendChild(video2);
   

    // Append everything to tab content
    aboutTabContent.appendChild(fig);
    aboutTabContent.appendChild(aboutText1);
    aboutTabContent.appendChild(aboutText2);
    aboutTabContent.appendChild(linebreak);
    aboutTabContent.appendChild(linebreak);
    aboutTabContent.appendChild(videosDiv);
    tabWrap.appendChild(aboutTabContent);
}