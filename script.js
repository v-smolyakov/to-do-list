let tasks = [];
let updateValue = " ";
let input = ' ';
let editext = null;

window.onload = function init(){
    input = document.getElementById('add-task')
    input.addEventListener('change',(e) => {
        updateValue = e.target.value;
    })
}

onclickButton = () => {
    tasks.push({
        text: updateValue,
        check: false
    });
    updateValue = ' ';
    input.value = ' ';
    render()
}

render = () => {
    const content = document.getElementById("content-div")
    while(content.firstChild){
        content.removeChild(content.firstChild)
    }
    tasks.sort((a,b) => a.check > b.check? 1: a.check < b.check? -1 : 0)
    tasks.map((item,index) => {
        const container = document.createElement('div');
        container.id = `task-${index}`;
        container.className = 'container-class';
        const checkbox = document.createElement('input'); 
        checkbox.type = "checkbox";
        checkbox.checked = item.check;
        checkbox.onchange  = function (){
            checkboxRes(index)
        }
        container.appendChild(checkbox);
        const text = document.createElement('p');
        text.className = item.check ? 'text-task done-text' : 'text-task';
        content.appendChild(container)

        if(index === editext){
            const inTask = document.createElement('input');
            inTask.type = 'text';
            inTask.value = item.text;
            inTask.addEventListener('change',editFunc)
            inTask.addEventListener('blur',doneTask)
            container.appendChild(inTask)
        }
        else{
            const text = document.createElement('p');
            text.innerText = item.text;
            text.className = item.check ? 'text-task done-text' : 'text-task';
            container.appendChild(text);
        }

        if(!item.check){
            if(index === editext){
                const okImage = document.createElement('img');
                okImage.className = "image"
                okImage.src = 'img/ok.png';
                okImage.onclick = function(){
                    doneTask()
                }
                container.appendChild(okImage)
            }
        }
        const editImage = document.createElement('img')
        editImage.className = "image"
        editImage.src = 'img/edit.png'
        editImage.onclick = function(){
            editext = index
            render()
        }
        container.appendChild(editImage)
        content.appendChild(container)

        const imageB = document.createElement('img')
        imageB.src = "img/close.png"
        imageB.className = 'image'
        imageB.onclick = function(){
            closefunc();
        }
        container.appendChild(imageB)

        const rest = document.getElementById("restoreButton")
        rest.onclick = function(){
            restoreFunc()
        }
    })

    checkboxRes = (index) => {
        tasks[index].check = !tasks[index].check
        render()
    }

    closefunc = (index) => {
        tasks.splice(index,1)
        render()
    }

    editFunc = (event) => {
        tasks[editext].text = event.target.value
        render()
    }

    doneTask = () => {
        editext = null;
        render()
    }
    restoreFunc = () =>{
        tasks = [];
        render()
    }

}

