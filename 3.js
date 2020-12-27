let input = document.querySelectorAll('input');

function returnRegex(id){
    let regex = ''

    switch(id){
    case 'name': return regex = /\WL|\d/gmi;
    case 'tel': return regex = /\+[7]\([0-9]{3}\)[0-9]{3}\-[0-9]{4}/;
    case 'email': return regex = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/;
    case 'text': return regex = /./;
    }
}

for (let i of input){
    i.addEventListener('change', (e) => {
        let type = e.target.id;
        let value = e.target.value;
        let object = document.querySelector(`#${type}`)
        regex = returnRegex(object.id);
        switch(object.id){
            case 'name': if (value.search(regex) != -1) object.classList.add('red');
                    break;
            case 'tel': if (!value.match(regex)) object.classList.add('red');
                    break;
            case 'email': if (!value.match(regex)) object.classList.add('red');
                    break;
            case 'text': if (!value.match(regex)) object.classList.add('red');
                    break;
        }
     })
}
