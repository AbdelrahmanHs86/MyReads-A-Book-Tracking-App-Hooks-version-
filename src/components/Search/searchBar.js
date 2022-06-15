import { useState } from 'react';
import { Link } from 'react-router-dom';
import { search } from '../../BooksAPI';
import Book from '../Books/Book';
// import { Debounce } from 'react-throttle';


const SearchBar = ({ searchResults, books, Search, changeSearchBook, changeBook }) => {



    const [words, setWords] = useState("");

    // Search a Book
    const searchBook = async (event) => {

        // let searchresults = [];

        // // controlling the typing results
        // if (event === undefined || event === "") {
        //     // if empty or undefined set the wordd list to an empty list.
        //     setWords("");
        //     console.log(event, 'inside empty');
        //     this.setState({ search: [] });
        // }

        // else {
        //     // if not empty or undefined make an api request to search books.
        //     this.setState(({ words: event }));
        //     console.log(event, 'not empty or undefined');
        //     searchResults = await search(event);
        //     console.log('searchResults:', searchResults)
        // }


        let searchresults = [];

        // controlling the typing results
        if (event === undefined || event === "") {
            // if empty or undefined set the wordd list to an empty list.
            setWords('');
            console.log(event, 'inside empty');
            // setSearch([]);
        }

        else {
            // if not empty or undefined make an api request to search books.
            setWords(event);
            searchresults = await search(event);
            books.map(mainbook => searchresults.forEach(searchbook => {
                if (mainbook.id == searchbook.id) { searchbook.shelf = mainbook.shelf }
            }
            ));
            // console.log('searchResults:', searchResults);
        }



        searchResults(searchresults);

    }


    console.log(words);
    return (

        <div className="search-books">

            <div className="search-books-bar">
                <Link to="/" className="close-search" >Close</Link>
                {/* <button className="close-search" onClick={() => navigate(-1)}>go back</button> */}
                <div className="search-books-input-wrapper">
                    <input type="text" placeholder="Search by title or author" value={words} onChange={(e) => searchBook(e.target.value)} />
                </div>

            </div>

            <div className="search-books-results">
                <ol className="books-grid">

                    {words && Search.length > 0 ? Search.map(book => {
                        //console.log(book.shelf, 'shelf');
                        return (<Book key={book.id} book={book} changeBook={changeBook} changeSearchBook={changeSearchBook} />)

                    }) : <p></p>}

                </ol>
            </div>

        </div>
    )


}

export default SearchBar