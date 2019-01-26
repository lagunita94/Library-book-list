// book constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
};

// UI constructor
 function UI() {}

// UI prototype for add book
UI.prototype.addBookToList = function(book){
    //add list 
    const list = document.querySelector('.book-list');
    //create row element
    const row = document.createElement('tr');
    // append child
    row.innerHTML= `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class = "delete">X</a></td>
    `
    //append table to list
    list.appendChild(row);
}
// clear fields
UI.prototype.clearFields = function(){
    document.getElementById('title').value = "";
    document.getElementById('author').value = "";
    document.getElementById('isbn').value = "";
}
// show alert 
UI.prototype.showAlert = function(message, className){
    // get form and container
    const form = document.getElementById('book-form');
    const container = document.querySelector(".container");
    //create div
    const div = document.createElement('div');
    //add class
    div.className = className;
    // create text node
    div.appendChild(document.createTextNode(message));
    //insert it inside container
    container.insertBefore(div, form);
    //timeout
    setTimeout(function(){
        div.remove();
    }, 3000)
}
 // event listeners
 document.getElementById('book-form').addEventListener('submit', function(e){
     //get form values
     const title = document.getElementById('title').value;
     const author = document.getElementById('author').value;
     const isbn = document.getElementById('isbn').value;
     
     // create new book
     const book = new Book(title, author, isbn); 
     // create new UI
     const ui = new UI();
     //validate
     if(title === "" || author === ""||isbn === ""){
        ui.showAlert("please fill the details", "error");
     }else{
        //add book to list
        ui.addBookToList(book);
        // clear fields
        ui.clearFields();
        // book added
        ui.showAlert('Book Added Successfully', 'success');         
     }
    
     e.preventDefault();
 });
 // delete list 
document.querySelector('.book-list').addEventListener('click', function(e){
     // create new UI
     const ui = new UI();
     //check for target
    if(e.target.className === "delete"){
        e.target.parentElement.parentElement.remove();
        ui.showAlert('Book Removed!!!', 'success');
    }
})