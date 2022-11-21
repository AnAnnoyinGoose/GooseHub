let menu = () => {
    const nav = document.querySelector('nav');
    console.log(nav);

    if (nav.style.display === 'none') {
        nav.style.display = 'block';
        nav.style.top = '200px';
    }
    else {
        nav.style.display = 'none';
        nav.style.top = '0px';
    }
}
