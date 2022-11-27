const menu = document.getElementById('1')

console.log(menu);

function toggleMenu(){
    // when the menu is active, the menu will be shown
    // a close button will be shown

    menu.classList.toggle('active')
    // create a close button
    const close = document.createElement('button')
    close.innerHTML = 'Close'
    close.classList.add('close')
    close.addEventListener('click', () => {
        menu.classList.remove('active')
        close.remove()
    })
    menu.appendChild(close)
}
