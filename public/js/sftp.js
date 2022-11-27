// elements ".file" on right click
let file = document.querySelectorAll('.file');
console.log(file);
file.forEach(item => {
    item.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        let menuu = document.querySelector('.menu');
        // set the position of the menu
        menuu.style = `top: ${e.clientY}px; left: ${e.clientX}px;`;
        // show the menu
        menuu.classList.add('show');
        setTimeout(() => {
            menuu.style.opacity = '1';
        } , 10);
        // menu.style.display = 'none';
    } );

});

