class Storage{
    static getBooksFromStorage(){
        let books;
        if(localStorage.getItem("books")==null){
            books=[];

        }
        else{
            books=JSON.parse(localStorage.getItem("books"));
        }

        return books;
    }


    static addBooksToStorage(newBook){
        let books=this.getBooksFromStorage();
        books.push(newBook);
        localStorage.setItem("books",JSON.stringify(books));

    }


}