
let posts = [];

const PRODUCT_URL = 'https://phucthinhauto.herokuapp.com/products/';
const POSTS_URL = 'https://phucthinhauto.herokuapp.com/posts/';

async function fetchPostApi() {
    try {
        const res = await axios({
            method: 'get',
            url: POSTS_URL,
        });

        posts= res.data;
        console.log(res.data)
        renderPost(res.data);
        renderTab(res.data)
        renderSide(res.data)

    } catch (err) {
        console.log(err)
    }
}


    fetchPostApi();
    renderProductMore();


function renderPost(data) {
    let newData = data.reverse();
    let html = '';
    for (let i = 0; i < 2; i++) {
        html += `<div class="content-text mt-5">
        <h4><a href="${newData[i].linkFB}" target="_blank" > ${newData[i].title}</a></h4>

        <div class="row my-4">
            <span>${newData[i].updatedAt}</span>
            <div class="col-12 mb-3">
                <img src="${newData[i].image_1}" alt="" class="img-fluid">
            </div>
            <div class="col-6">
                <img src="${newData[i].image_2}" alt="" class="img-fluid">
            </div>
            <div class="col-6">
                <img src="${newData[i].image_3}" alt="" class="img-fluid">
            </div>
        </div>

        <p>${newData[i].content}</p>
    </div>`
    }
    document.querySelector('#newsPostRender').innerHTML = html;
}


function renderTab(data) {
    let newData = data.reverse();

    let html = '';
    for (let i = 0; i < 2; i++) {
        html += `<div class="tab-item">
        <div class="tab-img">
            <img src="${newData[i].image_1}"
                alt="" class="img-fluid">
        </div>
        <div class="tap-content">
            <p
            onclick="renderDetail('${newData[i].type}')"
            >${newData[i].title}</p>
        </div>
    </div>`
    }

    document.getElementById('newsTabPost').innerHTML = html;

}


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
                            >${newData[i].title}</h4>
                            <p>${newData[i].content}</p>

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
                            >${newData[i].title}</h4>
                            <p>${newData[i].content}</p>

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
    document.querySelector('#newsTabSide').innerHTML = html;
};


async function renderProductMore() {
    try {
        const res = await axios({
            method: 'get',
            url: PRODUCT_URL,
        });
        let html = ''
        for (let i = 0; i < 4; i++) {
            html += `<div class="product-item">
            <div class="product-img">
                <img src="${res.data[i].image_1}">
            </div>
            <h1> <a href="./portfolio.html">${res.data[i].name}</a></h1>
            <p>${res.data[i].price.toLocaleString()} VNĐ</p>
        </div>`
        }
        document.getElementById('productNews').innerHTML = html;

    } catch (err) {
        console.log(err)
    }
}

function renderDetail(Type) {
    let data = posts.filter(ele => ele.type === Type);
    let html =data.map(item => {
        return`<div class="content-text mt-5">
        <h4><a href="${item.linkFB}" target="_blank" > ${item.title}</a></h4>

        <div class="row my-4">
            <span>${item.updatedAt}</span>
            <div class="col-12 mb-3">
                <img src="${item.image_1}" alt="" class="img-fluid">
            </div>
            <div class="col-6">
                <img src="${item.image_2}" alt="" class="img-fluid">
            </div>
            <div class="col-6">
                <img src="${item.image_3}" alt="" class="img-fluid">
            </div>
        </div>

        <p>${item.content}</p>
    </div>`
    });

    document.querySelector('#newsPostRender').innerHTML = html;
}

