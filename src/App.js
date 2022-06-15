
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



  return (

    <div className="app">

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


    </div>

  )

}

export default BooksApp;
