function openTab(event, tabId) {
    // Get all elements with the class tabcontent and hide them
    tabcontent = document.getElementsByClassName('tabcontent');
    for (i=0; i<tabcontent.lenght; i++) {
        tabcontent[i].style.display = 'none';
    }
    // Get all elements with the class tablinks and remove the class is-active
    tablinks = document.getElementsByClassName('tablinks');
    for (i=0; i<tablinks.lenght; i++) {
        tablinks[i].className = tablinks[i].className.replace('is-active', '')
    }
    // Show current tab and add is-active to that tab and show it's content
    document.getElementById(tabId).style.display = 'block';
    event.currentTarget.className += 'is-active';
}