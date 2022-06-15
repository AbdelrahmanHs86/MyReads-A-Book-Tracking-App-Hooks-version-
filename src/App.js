
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


}

export default BooksApp;
