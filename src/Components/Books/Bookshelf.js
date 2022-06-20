import Book from './Book.js';

const Bookshelf = ({ shelfName, books, shelf, changeBook, changeSearchBook }) => {


    let filteredbooks = books.filter((book) => book.shelf === shelf);
    return (

        <div className="bookshelf">
            <h2 className="bookshelf-title">{shelfName}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {filteredbooks.map(book => {

                        return (<Book key={book.id} book={book} changeBook={changeBook} changeSearchBook={changeSearchBook} />)
                    }
                    )
                    }
                </ol>
            </div>
        </div>


    )


}

export default Bookshelf