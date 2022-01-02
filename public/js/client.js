
const shortener = document.querySelector('#shortener');
const qr_code_img = document.querySelector('#qr_code_img');
const loader = document.querySelector('#loading');
const loaderBox = document.querySelector('#loader-box')
const copyBtn = document.querySelector('#copyBtn');
const copyText = document.querySelector('#copyText')
const toast = document.querySelector('.toast-body');




// local Storage
// this is the first time
if (!localStorage.noFirstVisit) {
    // show the element
    // and do the animation you want
    document.getElementById('firstTime').style.display = 'block';
    // close in tablet-to mobile size
    if (window.innerWidth <= '768') {
        console.log('hello');
        document.querySelector('.demo').style.display = 'none';
        document.querySelector('.thanks').style.marginTop = '20px';
    }
    // check this flag for escaping this if block next time
    localStorage.noFirstVisit = "1";
    qr_code_img.style.display = 'none';
}

// Copy the text to clipboard
copyBtn.addEventListener('click', () => {
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);
    toast.innerHTML = 'Copied Successfully';
    var toastElList = [].slice.call(document.querySelectorAll('.toast'))
    var toastList = toastElList.map(function (toastEl) {
        return new bootstrap.Toast(toastEl)
    })
    toastList.forEach(toast => toast.show())

})

// if the value is empty then don't show the fields
shortener.addEventListener('keyup', () => {
    if (shortener.value === '') {
        qr_code_img.style.display = 'none';
        copyText.value = '';
    }
})

// before effect animation and DOM manipulation
sendLink.addEventListener('click', (e) => {
    let input = shortener.value;
    if (input !== '') {
        qr_code_img.style.display = "none";
        loader.style.display = 'inline';
        loaderBox.style.display = 'block';
        qr_code_img.addEventListener('load', () => {
            loader.style.display = 'none';
            loaderBox.style.display = 'none';
            qr_code_img.style.display = 'inline'
        })
    }
    var toastElList = [].slice.call(document.querySelectorAll('.toast'))
    var toastList = toastElList.map(function (toastEl) {
        return new bootstrap.Toast(toastEl)
    })
    toastList.forEach(toast => toast.show())
})


