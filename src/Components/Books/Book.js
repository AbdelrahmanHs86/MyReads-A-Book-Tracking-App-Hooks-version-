
import ChangeBook from './ChangeBook.js';

const Book = ({ book, changeBook, changeSearchBook }) => {



    return (

        <li >
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url( ${'imageLinks' in book ? book.imageLinks.smallThumbnail : ''} )` }} > </div>
                    <ChangeBook book={book} changeBook={changeBook} changeSearchBook={changeSearchBook} />
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors?.join(', ')}</div>
                {/* this.props.bookAuthors.map((author)=>(author)) */}
            </div>
        </li >

    )

};

export default Book