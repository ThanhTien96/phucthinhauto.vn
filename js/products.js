var products = [];



async function fetchProductApi(){
    try{
        const res = await axios({
            method: 'get',
            url: 'https://phucthinhauto.herokuapp.com/products/',
        });

       products= res.data;
       renderProducts(res.data, "AllProduct"); 
       renderNewProduct(res.data)
    }catch(err) {
        console.log(err)
    }
}

fetchProductApi()

function renderType(type, id) {

    let productType = products.filter(item => item.type === type);
    let html = '';

    for (i =0; i < productType.length; i++) {
        html += `<div class="col-4">
        <div class="products">
            <div class="product__img">
                <img src="${productType[i].image_1}" alt="" class="img-fluid">
            </div>
            <h1>${productType[i].name}</h1>
            <p>${productType[i].price.toLocaleString()} VND</p>
        </div>
    </div>`
    }

    document.getElementById(id).innerHTML = html;
}

function renderDetail(id) {
    document.getElementById('arrProduct').style.display = 'none';
    document.getElementById('detailProduct').style.display = 'block';
    let data = products.filter(item => item._id === id)
    let html = data.map(ele => {
        return `
        <div class="container">
            

        <div class="row">
            <div class="col-12">
                <div class="product__show__img">
                    <img src="${ele.image_1}" alt="" class="img-fluid img-1">
                    <img src="${ele.image_2}" alt="" class="img-fluid img-3">
                    <img src="${ele.image_3}" alt="" class="img-fluid img-4">
                    <img src="${ele.image_4}" alt="" class="img-fluid img-5">
                </div>
            </div>

        </div>

        <div class="row">
            <div class="col-12 col-lg-8 offset-lg-2">
                <h1>${ele.name}</h1>

                <table class="table">
                    <thead class="table-dark">
                        <tr>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Giá Bán</td>
                            <td>${ele.price.toLocaleString()} VNĐ</td>
                        </tr>
                        <tr>
                            <td>Ngoại Thất</td>
                            <td>${ele.ngoaiThat}</td>
                        </tr>
                        <tr>
                            <td>Nội Thất</td>
                            <td>${ele.noiThat}</td>
                        </tr>
                    </tbody>
                </table>
                <i>*Giá bán có thể thay đổi tùy theo trang thiết bị lắp thêm ở Việt Nam</i>

                <a href="tell:0903694150"></a><button class="btn btn-danger ms-5">Liên Hệ: 0903694150</button></a>
            </div>
        </div>
    </div>
        `
    })
    document.getElementById('detailProduct').innerHTML = html;
}


function renderProducts(data, id) {
    let html = '';

    for (let i = 0; i < data.length; i++){
        html += `<div class="col-4">
        <div class="products">
            <div class="product__img">
                <img src="${data[i].image_1}" alt="" class="img-fluid">
            </div>
            <h1
            onclick="renderDetail('${data[i]._id}')"
            >${data[i].name}</h1>
            <p>${data[i].price.toLocaleString()} VND</p>
        </div>
    </div>`
    }

       document.getElementById(id).innerHTML = html;
}

function renderNewProduct (data) {
    let arr = [...data]
    arr.reverse()
    let html = '';

    for(let i = 0; i < arr.length; i++){
        if(i <= 5) {
            html += `
            <div class="product-item">
            <div class="product-img">
                <img src="${arr[i].image_1}" alt="" class="img-fluid">
            </div>
            <h1
            onclick="renderDetail('${arr[i]._id}')"
            >${arr[i].name}</h1>
            <p>${arr[i].price.toLocaleString()} VNĐ</p>
        </div>
            `
        }
    }
        
    document.getElementById('newProduct').innerHTML = html;
}


function searchPhone() {
    let keyWord = document.getElementById('inputSearch').value.toLowerCase().trim();
    let result = [];

    for (let i = 0; i < products.length; i++) {
        let productName = products[i].name.toLowerCase().trim();
        let productType = products[i].type;


        if (productName.includes(keyWord) || productType.includes(keyWord)) {
            result.push(products[i]);
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
            <p
            onclick="renderDetail('${data[i]._id}')"
            >${data[i].name}</p>
        </div>
    </div>`
    }
    document.getElementById('showProductSearch').innerHTML = html;
}

window.onclick = function() {
    document.getElementById('search').style.display = 'none';
}