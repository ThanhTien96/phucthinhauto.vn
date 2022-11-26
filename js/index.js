
let products = [];
let posts = [];

var productSearch = null

const PRODUCT_URL = 'https://phucthinhauto.herokuapp.com/products/';
const POSTS_URL = 'https://phucthinhauto.herokuapp.com/posts/';


async function fetchProducts() {
    try{
        const productsData = await axios({
            method: 'get',
            url: PRODUCT_URL,
        });
        const postsData = await axios({
            method: 'get',
            url: POSTS_URL,
        });
        productSearch = productsData.data
        products = productsData.data;
        posts = postsData.data;
        renderNewsTab(postsData.data)
        renderSide(postsData.data)

    }catch(err) {
        console.log(err)
    }
}


fetchProducts()



function renderSide(data) {

    let newData = data.reverse();

    let html = '';
    for (let i = 0; i < 2; i++) {
        if (i % 2 === 0) {
            html += `<div class="col-12">
            <div class="news-post">
                <div class="row">
                    <div class="col-12 col-lg-4">
                        <img src="${newData[i].image_1}"
                            alt="" class="img-fluid">
                    </div>
                    <div class="col-12 col-lg-8">
                        <div class="news-text line-left">
                            <h4
                            onclick="renderDetail('${newData[i].type}')"
                            ><a href="./news.html">${newData[i].title}</a></h4>
                            <p>${truncateText(newData[i].content)}</p>

                        </div>
                    </div>
                </div>
            </div>
        </div>`
        } else {
            html += ` <div class="col-12">
            <div class="news-post">
                <div class="row">
                    <div class="col-12 col-lg-8">
                        <div class="news-text line-right">
                            <h4
                            onclick="renderDetail('${newData[i].type}')"
                            ><a href="./news.html">${newData[i].title}</a></h4>
                            <p>${truncateText(newData[i].content)}</p>

                        </div>
                    </div>

                    <div class="col-12 col-lg-4">
                        <img src="${newData[i].image_1}"
                            alt="" class="img-fluid">
                    </div>
                </div>
            </div>
        </div>`
        }
    }
    document.querySelector('#newPostSide').innerHTML = html;
};

function renderNewsTab(data) {

    let newData = data.reverse();

    let html = '';
    for (let i = 0; i < 2; i++) {
        
            html += `<div class="tab-item">
            <div class="tab-img">
                <img src="${newData[i].image_1}"
                    alt="" class="img-fluid">
            </div>
            <div class="tap-content">
                <p><a href="./news.html">${newData[i].title}</a></p>
            </div>
        </div>`
        
    }
    document.querySelector('#postNewsTab').innerHTML = html;
};



function searchPhone() {
    let keyWord = document.getElementById('inputSearch').value.toLowerCase().trim();

    let result = [];

    for (let i = 0; i < productSearch.length; i++) {
        let productName = productSearch[i].name.toLowerCase().trim();
        let productType = productSearch[i].type;


        if (productName.includes(keyWord) || productType.includes(keyWord)) {
            result.push(productSearch[i]);
        }
    }
    renderSearch(result);
}


function renderSearch(data) {
    document.getElementById('search').style.display = 'block'
    let html = '';
    for (let i = 0; i < data.length; i++) {
        html += `<div class="col-12 col-lg-3 py-3">
        <div class="search-item">
            <img class="img-fluid" src="${data[i].image_1}">
            <p><a href="./portfolio.html">${data[i].name}</a></p>
        </div>
    </div>`
    }
    document.getElementById('showProductSearch').innerHTML = html;
}

window.onclick = function() {
    document.getElementById('search').style.display = 'none';
}