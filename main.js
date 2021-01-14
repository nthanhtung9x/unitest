const btnOxstreet = document.querySelector('#btnOx');
const btnTd = document.querySelector('#btnTd');
const tabOx = document.querySelector('#oxstreet');
const listOx = document.querySelector('#listOx');
const tabTd = document.querySelector('#tuduy');
const issue = document.querySelector('#issue');
const inputValue = document.querySelector('#inputValue');
const outputValue = document.querySelector('#outputValue');
let dataList = [];
tabOx.setAttribute('class','hidden');
tabTd.setAttribute('class','hidden');

btnOxstreet.addEventListener('click', handleToggle);
btnTd.addEventListener('click', handleToggle);


function handleToggle(e) {
    if(e.target.id === "btnOx") {
        tabOx.classList.toggle('activeShow');
    } else {
        tabTd.classList.toggle('activeShow');
    }
}

function handleCheck(e) {
    const ele = e.target;

    ele.classList.forEach((item, index) => {
        if(item.indexOf('checkIcon') !== -1) {
            ele.parentElement.classList.toggle('checked');
        } else if(item.indexOf('trashIcon') !== -1) {
            handleDelete(ele.parentElement.parentElement);
        }
    })
}

function handleSubmit(e) {
    e.preventDefault();
    const issueValue = issue.value;
    const inputVal = inputValue.value;
    const outputVal = outputValue.value;
    if(!issueValue) {
        return;
    }
    console.log(dataList);
    dataList.push({issueValue, inputVal, outputVal});
    console.log(dataList);
    localStorage.setItem('data', JSON.stringify(dataList));
    listOx.innerHTML += `
        <li class="list-group-item  d-flex justify-content-between">
            <h4>${issueValue}</h4>
            <h4>${inputVal}</h4>
            <h4>${outputVal}</h4>
            <h4>
                <i class="fa fa-check checkIcon" onclick="handleCheck(event)"></i>
                <i class="fa fa-trash trashIcon" onclick="handleDelete(event)"></i>
            </h4>
        </li>
    `;
    issue.value = '';
    inputValue.value = '';
    outputValue.value = '';
}

function getDataOx() {
    dataList = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : null;
    console.log(dataList);
    if(dataList) {
        for(let i = 0; i < dataList.length; i++) {
            listOx.innerHTML += `
                <li class="list-group-item  d-flex justify-content-between">
                    <h4>${dataList[i].issueValue}</h4>
                    <h4>${dataList[i].inputVal}</h4>
                    <h4>${dataList[i].outputVal}</h4>
                    <h4>
                        <i class="fa fa-check checkIcon" onclick="handleCheck(event)"></i>
                        <i class="fa fa-trash trashIcon" onclick="handleCheck(event)"></i>
                    </h4>
                </li>
            `;
        }
    }
    return null;
}

function handleDelete(item) {
    removeLocalTodo(item);
    item.target.parentElement.parentElement.remove();
}

function removeLocalTodo(todo) {
    const todoIndex = todo.innerText;
    let index;
    for(let i = 0; i < dataList.length; i++) {
        if(dataList[i].issueValue.indexOf(todoIndex) !== -1) {
            index = i;
        }
    }
    dataList.splice(index, 1);
    localStorage.setItem('data', JSON.stringify(dataList));
}

window.addEventListener('DOMContentLoaded', (event) => {
    getDataOx();
});