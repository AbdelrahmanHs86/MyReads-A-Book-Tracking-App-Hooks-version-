
import { useState, useEffect } from 'react';
import * as BooksAPI from './BooksAPI.js'
import './App.css'
import Header from './Components/Header/Header';
import Bookshelf from './Components/Books/Bookshelf';
import Book from './Components/Books/Book';
import SearchBar from './Components/Search/searchBar';
import SearchResults from './Components/Search/SearchResults';
// import { Debounce } from 'react-throttle';
import { Link, Route, Routes } from 'react-router-dom';



const BooksApp = () => {

  useEffect(() => {

    let mounted = true;
    if (mounted) {
      const getBooks = async () => {
        const Books = await BooksAPI.getAll();
        setBooks(Books);
      }
      getBooks();
    }

    return () => {
      mounted = false;
    };
  }, []);




  // STATE MANEGMENT

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState([]);
  const [words, setWords] = useState([]);


  // CHANGE THE SHELF OF THE BOOK IN BOOKS LIST AND THE BACKEND 
  const changeBook = (book, bookshelf) => {

    BooksAPI.update(book, bookshelf);
    console.log(book.id, bookshelf);
    books.forEach(Book => {

      if (Book.id === book.id) {
        Book.shelf = bookshelf;
      }
    })
    // books.find(el => el.id === book.id).shelf = bookshelf;
    setBooks([...books]);

  };

  // CHANGE THE SHELF OF THE BOOK in Search list books.
  const changeSearchBook = (book, bookshelf) => {

    BooksAPI.update(book, bookshelf);
    console.log(book.id, bookshelf);
    // search.find(el => el.id === book.id).shelf = bookshelf;
    search.forEach(Book => {

      if (Book.id === book.id) {
        Book.shelf = bookshelf;
      }
    })

    setSearch([...search]);

    //add the book only if it does not exist in the booklist
    if (books.filter(e => e.id === book.id).length <= 0) { addBook(book); }

  }


  const searchBook = async (event) => {

    let searchResults = [];

    // controlling the typing results
    if (event === undefined || event === "") {
      // if empty or undefined set the wordd list to an empty list.
      setWords('');
      console.log(event, 'inside empty');
      setSearch([]);
    }

    else {
      // if not empty or undefined make an api request to search books.
      setWords(event);
      searchResults = await BooksAPI.search(event);
      // searchResults.forEach()
      books.map(mainbook => searchResults.forEach(searchbook => {
        if (mainbook.id == searchbook.id) { searchbook.shelf = mainbook.shelf }
      }
      ));
      console.log('searchResults:', searchResults);
    }


    try {
      setSearch(searchResults);
      console.log('added');
    }

    catch (err) {
      console.log('error');
      setSearch([]);
      console.log('search list: ', search)

    }


    // this.props.searchResults(searchResults);

  }


  // get the searchresults from the searchbar component and assign to search list.
  // const searchResults = (searchResults) => {

  //   try {
  //     setSearch(searchResults);
  //     console.log('added');
  //   }

  //   catch (err) {
  //     console.log('error');
  //     setSearch([])
  //     console.log('search list: ', search);

  //   }

  // }


  // Add a book to the book list 
  const addBook = (book) => {

    setBooks([...books, book]);

  }


  return (

    <div className="app">



      <Routes>

        <Route exact path="/search" element={

          // <SearchBar searchResults={searchResults} books={books} Search={search} changeSearchBook={changeSearchBook} changeBook={changeBook} />

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

                {words && search.length > 0 ? search.map(book => {
                  //console.log(book.shelf, 'shelf');
                  return (<Book key={book.id} book={book} changeBook={changeBook} changeSearchBook={changeSearchBook} />)

                }) : <p></p>}

              </ol>
            </div>

          </div>
        } />


        <Route exact path="/" element={
          // <SearchBar searchResults={searchResults} search={search} changeSearchBook={changeSearchBook} changeBook={changeBook} />


          <div className="list-books">
            <Header title="My Reads" />
            <div className="list-books-content">
              <div>
                <Bookshelf shelfName="Currently Reading" books={books} shelf="currentlyReading" changeBook={changeBook} changeSearchBook={changeSearchBook} />
                <Bookshelf shelfName="Read" books={books} shelf="read" changeBook={changeBook} changeSearchBook={changeSearchBook} />
                <Bookshelf shelfName="Want To Read" books={books} shelf="wantToRead" changeBook={changeBook} changeSearchBook={changeSearchBook} />
              </div>
            </div>
            <div className="open-search">
              <Link to="./search">Add a book</Link>
            </div>
          </div>
        } />

      </Routes >

    </div>
  )

}

export default BooksApp;
