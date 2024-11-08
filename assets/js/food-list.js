// Mong muốn không được phép gán lại giá trị
let listFood = [];
let isEdit = false;

document.querySelector('#btnThemMon').onclick = function () {
    console.log("Them mon");
    // ----------

    // 1. Lấy giá trị input
    let foodID = document.querySelector('#foodID').value;
    let tenMon = document.querySelector('#tenMon').value;
    let loai = document.querySelector('#loai').value;
    let giaMon = document.querySelector('#giaMon').value;
    let khuyenMai = document.querySelector('#khuyenMai').value;
    let tinhTrang = document.querySelector('#tinhTrang').value;
    let hinhMon = document.querySelector('#hinhMon').value;
    let moTa = document.querySelector('#moTa').value;

    // 2. Tạo object 
    let food = {
        id: foodID,
        ten: tenMon,
        loai: loai,
        gia: giaMon,
        khuyenMai: khuyenMai,
        tinhTrang: tinhTrang,
        hinh: hinhMon,
        moTa: moTa,
    };
    // 3. Thêm một phần tử vào mảng
    listFood.push(food);

    // Render
    renderListFood();

    // Reset form
    resetFormAddFood();

    saveListFood();
}

function resetFormAddFood() {
    let foodID = document.querySelector('#foodID');
    let tenMon = document.querySelector('#tenMon');
    let loai = document.querySelector('#loai');
    let giaMon = document.querySelector('#giaMon');
    let khuyenMai = document.querySelector('#khuyenMai');
    let tinhTrang = document.querySelector('#tinhTrang');
    let hinhMon = document.querySelector('#hinhMon');
    let moTa = document.querySelector('#moTa');

    foodID.value = '';
    tenMon.value = '';
    loai.value = '';
    giaMon.value = ''
    khuyenMai.value = ''
    tinhTrang.value = '';
    hinhMon.value = '';
    moTa.value = '';
}

function renderListFood() {
    const tbodyFood = document.getElementById('tbodyFood');

    if (listFood.length == 0) {
        tbodyFood.innerHTML = "";

        return;
    }

    let content = "";

    for (let i = 0; i < listFood.length; i++) {
        const food = listFood[i];

        content += `
            <tr>
                <td>${food.id}</td>            
                <td>${food.ten}</td>            
                <td>${showLoai(food.loai)}</td>            
                <td>${food.gia}</td>            
                <td>${food.khuyenMai}</td>        
                <td>
                ${tinhGiaKhuyenMai(
            Number(food.gia),
            Number(food.khuyenMai)
        )}
                </td>            
                <td>${showTinhTrang(food.tinhTrang)}</td>            
                <td>
                    <button
                        data-toggle="modal"
                        data-target="#exampleModal"

                        onclick="handleEditFood('${food.id}')"
                    >
                        Edit
                    </button>
                    <button onclick="handleDeleteFood('${food.id}')">Delete</button>
                </td>            
            </tr>
        `
    }

    console.log(content);

    tbodyFood.innerHTML = content;
}

function renderListFood2(lf) {
    const tbodyFood = document.getElementById('tbodyFood');

    if (lf.length == 0) {
        tbodyFood.innerHTML = "";

        return;
    }

    let content = "";

    for (let i = 0; i < lf.length; i++) {
        const food = lf[i];

        content += `
            <tr>
                <td>${food.id}</td>            
                <td>${food.ten}</td>            
                <td>${showLoai(food.loai)}</td>            
                <td>${food.gia}</td>            
                <td>${food.khuyenMai}</td>        
                <td>
                ${tinhGiaKhuyenMai(
            Number(food.gia),
            Number(food.khuyenMai)
        )}
                </td>            
                <td>${showTinhTrang(food.tinhTrang)}</td>            
                <td>
                    <button
                        data-toggle="modal"
                        data-target="#exampleModal"

                        onclick="handleEditFood('${food.id}')"
                    >
                        Edit
                    </button>
                    <button onclick="handleDeleteFood('${food.id}')">Delete</button>
                </td>            
            </tr>
        `
    }

    console.log(content);

    tbodyFood.innerHTML = content;
}

function handleDeleteFood(id) {
    console.log("id", id);

    const index = findIndex(listFood, id);

    // Kiểm tra coi thử id có tồn tại trong mảng hay không
    // -1: không tồn tại
    if (index == -1) {
        // Thoát khỏi function, không tính toán nữa.
        return;
    }

    // Xóa
    listFood.splice(index, 1);

    // Render lại mảng listFood
    renderListFood();

    saveListFood();
}

function saveListFood() {
    const listFoodJSON = JSON.stringify(listFood)
    localStorage.setItem('listFood', listFoodJSON);
}

function restoreListFood() {
    const foods = localStorage.getItem("listFood");

    // Nếu có tồn tại giá trị
    if (foods) {
        // Gán lại giá trị lưu trong localStorage lại cho biến listFood
        listFood = JSON.parse(foods);
    }
}

function init() {
    restoreListFood();
    renderListFood();
}

// Khi vừa vào trang web thì gọi hàm init ngay lặp tức
init();

// -------------------
// disable button cập nhật của modal khi click vào thêm món ăn
// disable button thêm của modal khi click vào edit


// click -> hiển thị modal -> thư viện hỗ trợ ✅
// click -> disable button cập nhật 
document.querySelector("#btnThem").onclick = function () {
    // Ẩn đi
    const btnCapNhatEle = document.querySelector("#btnCapNhat");
    btnCapNhatEle.style.display = 'none';

    // Hiển thị lên
    document.getElementById('btnThemMon').style.display = 'block';
}

function handleEditFood(id) {
    isEdit = true;
    // Hiển thị lên
    document.getElementById('btnCapNhat').style.display = 'block';
    // Ẩn đi
    document.getElementById('btnThemMon').style.display = 'none';

    const item = findItem(listFood, id);

    if (item === null) {
        return;
    }

    let foodID = document.querySelector('#foodID');
    let tenMon = document.querySelector('#tenMon');
    let loai = document.querySelector('#loai');
    let giaMon = document.querySelector('#giaMon');
    let khuyenMai = document.querySelector('#khuyenMai');
    let tinhTrang = document.querySelector('#tinhTrang');
    let hinhMon = document.querySelector('#hinhMon');
    let moTa = document.querySelector('#moTa');

    console.log(item);

    // Không cho phép người dùng chỉnh sửa field mã món
    foodID.value = item.id;
    foodID.disabled = true;

    tenMon.value = item.ten;
    loai.value = item.loai;
    giaMon.value = item.gia;
    khuyenMai.value = item.khuyenMai;
    tinhTrang.value = item.tinhTrang;
    hinhMon.value = item.hinh;
    moTa.value = item.moTa;

    document.getElementById('btnCapNhat').onclick = function () {
        handleUpdateFood(item.id);
    }
}

function handleUpdateFood(id) {
    // 1. Lấy giá trị input
    let tenMon = document.querySelector('#tenMon').value;
    let loai = document.querySelector('#loai').value;
    let giaMon = document.querySelector('#giaMon').value;
    let khuyenMai = document.querySelector('#khuyenMai').value;
    let tinhTrang = document.querySelector('#tinhTrang').value;
    let hinhMon = document.querySelector('#hinhMon').value;
    let moTa = document.querySelector('#moTa').value;

    // 2. Tạo object 
    let food = {
        id: id,
        ten: tenMon,
        loai: loai,
        gia: giaMon,
        khuyenMai: khuyenMai,
        tinhTrang: tinhTrang,
        hinh: hinhMon,
        moTa: moTa,
    };

    const index = findIndex(listFood, id);

    if (index === -1) {
        return;
    }

    // Cập nhật lại listFood
    listFood[index] = food;

    // Render lại
    renderListFood2(listFood);

    handleResetFormEdit();
}

function handleResetFormEdit() {
    if (isEdit) {
        // reset form
        resetFormAddFood();
        // mở lại input
        document.querySelector('#foodID').disabled = false;

        isEdit = false;
    }
}

document.getElementById('exampleModal').onclick = function (event) {
    if (event.target.id === 'exampleModal') {
        handleResetFormEdit();
    }
};
document.getElementById('btn-close').onclick = handleResetFormEdit;
document.getElementById('icon-close').onclick = handleResetFormEdit;


document.getElementById('selLoai').onchange = function (event) {
    console.log(event.target.value);

    const loai = event.target.value;
    const newArr = filterArr(listFood, loai);

    renderListFood2(newArr);
}