// book class
class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
// UI class 
class UI {
    addBookToList(book){
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
    clearFields(){
        document.getElementById('title').value = "";
        document.getElementById('author').value = "";
        document.getElementById('isbn').value = "";
    }
    showAlert(message, className){
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
}

class Store {
    static getData() {
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static display() {
        let books = Store.getData();
        books.forEach(function(book) {
            // create new UI
            const ui = new UI();
            ui.addBookToList(book);
        });
    }
    static removeData(isbn) {
        let books = Store.getData();
        books.forEach(function(book, index) {
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
    static addBook(book) {
        let books = Store.getData();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
}
// DOM event 
document.addEventListener('DOMContentLoaded', function(){
    Store.display();
})
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
       // add book to local storage
        Store.addBook(book);       
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
       //remove from local storage
       Store.removeData(e.target.parentElement.previousElementSibling.textContent);
   }
})