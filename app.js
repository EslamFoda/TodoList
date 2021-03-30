const ul = document.querySelector('ul');
const add = document.querySelector('.add')


db.collection('Todos').onSnapshot(snapshot =>{
    snapshot.docChanges().forEach(change =>{
        const doc = change.doc;
        if(change.type === 'added'){
            todo(doc.data().Todo,doc.id)
        } else if(change.type === 'removed'){
            remove(doc.id)

        }
    })  
})

function remove(id){
    const li = document.querySelectorAll('li');
    li.forEach(item =>{
        if(item.getAttribute('data-id') === id){
            item.remove();
        }
    })

}
    


db.collection('Todos').get().then(snapshot => {
    const data = snapshot.docs;
    data.forEach(function(item){ 
       // todo(item.data().Todo,item.id)
    })
   
}).catch((err) => {
    console.log(err)
});

ul.addEventListener('click',function(e){

    if(e.target.classList.contains('delete')){
        const id = e.target.parentElement.getAttribute('data-id');
        db.collection('Todos').doc(id).delete();
        console.log('todo got deleted')
    } else {
        console.log('no')
    } 
})

add.addEventListener('submit',function(e){
    e.preventDefault();
    const todo = {
        Todo: add.add.value.trim()
    }
    if(todo.Todo.length){
        db.collection('Todos').add(todo);
    }
    add.reset();
    
})

function todo(item,id){
    let html = `
    <li data-id=${id} class="list-group-item d-flex justify-content-between align-items-center">
                <span>${item}</span>
                <i class="fas fa-trash-alt delete"></i>
            </li>
    `


    ul.innerHTML += html

}