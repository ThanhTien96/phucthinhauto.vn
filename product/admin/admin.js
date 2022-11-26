
var products = [];
var posts = [];

const PRODUCT_URL_API = 'https://phucthinhauto.herokuapp.com/products/';
const POST_URL_API = 'https://phucthinhauto.herokuapp.com/posts/';

// add product;
function getEle(id) {
  return document.getElementById(id)
}




const fetchProductApi = async function () {
  try {
    const res = await axios({
      method: 'get',
      url: PRODUCT_URL_API,
    });
    products = res.data
    renderProducts(res.data);
    console.log(res.data)

  } catch (err) {
    console.log(err)
  }
}
const fetchPostApi = async function () {
  try {
      const res = await axios({
          method: 'get',
          url: POST_URL_API,
      });
      renderPost(res.data);
      console.log(res.data)
  } catch (err) {
      console.log(err)
  }
}
function createPost() {
  let title = getEle("title").value;
  let newsType = getEle("newsType").value;
  let Hinh1 = getEle("Hinh1").value;
  let Hinh2 = getEle("Hinh2").value;
  let Hinh3 = getEle("Hinh3").value;
  let link = getEle("link").value;
  let like = getEle("like").value;
  let content = getEle("content").value;


  const newPost = new Post(
      title,
      content,
      link,
      Hinh1,
      Hinh2,
      Hinh3,
      like,
      newsType,
  );

  fetchPost(newPost);
  fetchPostApi();

}
async function fetchPost (data) {
  try{
      axios({
          method: 'post',
          url: POST_URL_API,
          data: data,
      });
  }catch(err) {
      console.log(err)
  }
}



function renderPost(data) {
  let html = data.map((post, index) => {
      return `<tr>
      <td>${index + 1}</td>
      <td>${post.title}</td>
      <td>
        <img src="${post.image_1}" class="img-fluid" alt="" style="width: 100px;"></td>
      </td>
      
      <td>${post.content}</td>
      <td>
        <button class="btn btn-success"><i class="fa fa-cog"></i></button>
        <button onclick="deletePost('${post._id}')"  class="btn btn-danger"><i class="fa fa-times"></i></button>
      </td>
    </tr>`
  })

  getEle('contentPost').innerHTML = html;
}



window.onload = function () {
  fetchProductApi();
  fetchPostApi();
}



//deleted product

const deleteProduct = async (id) => {
  try {
    await axios({
      method: 'delete',
      url: PRODUCT_URL_API + id,
    });
    fetchProductApi();
  } catch (err) {
    console.log(err)
  }
}

const deletePost = async (id) => {
  try {
    await axios({
      method: 'delete',
      url: POST_URL_API + id,
    });
    fetchPostApi();
  } catch (err) {
    console.log(err)
  }
}



// in danh sach san pham

function renderProducts(data) {
  let productList = data

  var html = productList.map((item, i) => `
  <tr>
  <td>${i + 1}</td>
  <td>${item.name}</td>
  <td>${item.price.toLocaleString()}</td>
  <td>
    <img src="${item.image_1}" class="img-fluid" alt="" style="width: 100px;"></td>
  </td>
  
  <td>${item.desc}</td>
  <td>
    <button class="btn btn-success"><i class="fa fa-cog"></i></button>
    <button onclick="deleteProduct('${item._id}')"  class="btn btn-danger"><i class="fa fa-times"></i></button>
  </td>
</tr>
  `)

  document.getElementById('tblDanhSachSP').innerHTML = html;
}





function createProduct() {
  let name = getEle("TenSP").value;
  let type = getEle('type').value;
  let price = getEle('GiaSP').value;
  let hinh1 = getEle('HinhSP1').value;
  let hinh2 = getEle('HinhSP2').value;
  let hinh3 = getEle('HinhSP3').value;
  let hinh4 = getEle('HinhSP4').value;
  let like = getEle('Like').value;
  let moTa = getEle('MoTa').value;
  let noiThat = getEle('noiThat').value;
  let ngoaiThat = getEle('ngoaiThat').value;


  const newProduct = new Product(
    type,
    name,
    moTa,
    hinh1,
    hinh2,
    hinh3,
    hinh4,
    like,
    price,
    noiThat,
    ngoaiThat,

  ); 

  fetchProduct(newProduct);
  fetchProductApi();

}
async function fetchProduct(data) {
  try {
    await axios({
      method: 'post',
      url: PRODUCT_URL_API,
      data: data,
    })
  } catch (err) {
    console.log(err)
  }
}
