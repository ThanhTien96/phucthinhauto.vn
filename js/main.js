

window.onload = function () {
    var loading = document.getElementById('loading');


    setTimeout(function () {
        loading.style.display = 'none';
    }, 200)

}

$(document).scroll(function () {
    let position = $(document).scrollTop();
    if (position > 10) {
        $('.navbar').addClass('menu-fixed')
    } else {
        $('.navbar').removeClass('menu-fixed')
    }
})

function truncateText(text) {
    if (text.length > 200) {
        return text.substr(0, 200) + '...';
    }
    return text;
}


