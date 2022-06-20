//import changeBook from './App.js'


const ChangeBook = ({ book, changeBook, changeSearchBook }) => {


    const handelShelfValue = (event) => {
        console.log(event.target.value, book.id);
        changeBook(book, event.target.value);
        changeSearchBook(book, event.target.value);
    }



    return (
        <div className="book-shelf-changer">
            <select id="selectValue" value={book.shelf ? book.shelf = book.shelf : book.shelf = "none"} onChange={event => handelShelfValue(event)} >
                <option value="move" disabled >Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
        </div>
    )

}



export default ChangeBook