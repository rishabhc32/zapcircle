$('.dropdown-trigger').dropdown();

$(document).ready(function(){
  $('.sidenav').sidenav();
});

ulElements = document.getElementsByTagName('ul');

for(let i = 0 ; i < ulElements.length ; i++) {
    ulElements[i].classList.add('browser-default');
}
