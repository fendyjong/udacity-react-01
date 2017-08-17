import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Main from './views/Main'
import SearchBooks from './views/SearchBooks'
import Page404 from './Page404'
import '../node_modules/grommet-css'

class App extends Component {

	state = {
		shelves: {
			currentlyReading: [],
			wantToRead: [],
			read: []
		},
		// shelves book id is used to store and match book id with shelves. To be used in categorizing the drop down
		shelvesBookId: []
	}

	/**
	 * When mounted, update state with the local storage
	 *
	 * Local storage is used for state persistence so that when the web is refreshed, shelves state will still be
	 * available
	 */
	componentDidMount() {
		const shelves = JSON.parse(localStorage.getItem("shelves"))
		if (shelves) {
			let shelvesBookId = []
			for (let shelf of Object.keys(shelves)) {
				for (let book of shelves[shelf]) {
					shelvesBookId[book.id] = shelf
				}
			}

			this.setState({
				shelves: shelves,
				shelvesBookId: shelvesBookId
			})
		}
	}

	/**
	 * Get all books from the BooksAPI
	 *
	 * Not used since, I implement my own shelving with the local storage (to provide persistence)
	 * I did not know about BooksAPI.getAll() and BooksAPI.update before creating this project. I just knew only after
	 * a reviewer mentioned it.
	 */
	/*
	getAllBooks = () => {
		BooksAPI.getAll().then(books => {
			console.log(books)
			this.setState(() => ({
				booksQueryResult: books
			}))
		})
	}
	*/


	/**
	 * Update Personal Books which are currently reading, wish list and read
	 *
	 * @param shelf (currentlyReading, wantToRead, read
	 * @param id
	 */
	updateShelf = (shelf, book) => {
		switch (shelf) {
			case "currentlyReading":
			case "wantToRead":
			case "read":
				if (this.state.shelves[shelf].filter((obj) => {
						return obj.id === book.id
					}).length === 0) {
					this.setState((prevState) => {
						prevState.shelves[shelf].push(book)
						prevState.shelvesBookId[book.id] = shelf
						localStorage.setItem("shelves", JSON.stringify(prevState.shelves))
					})
				}
				break
			default:
		}

		this.removeDuplicateBook(shelf, book)
	}

	/**
	 * Move from one shelves to another
	 *
	 * @param shelf
	 * @param book
	 */
	removeDuplicateBook = (shelf, book) => {
		let shelves = []
		switch (shelf) {
			case "currentlyReading":
				shelves.push("wantToRead")
				shelves.push("read")
				break;
			case "wantToRead":
				shelves.push("currentlyReading")
				shelves.push("read")
				break;
			case "read":
				shelves.push("currentlyReading")
				shelves.push("wantToRead")
				break;
			case "none":
				shelves.push("currentlyReading")
				shelves.push("wantToRead")
				shelves.push("read")
				break;
			default:
		}
		this.removeBookFromShelf_(shelves, book)
	}

	removeBookFromShelf_ = (shelves, book) => {
		this.setState((prevState) => {
			for (let shelf of shelves) {
				prevState.shelves[shelf] = prevState.shelves[shelf].filter((obj) => {
					return obj.id !== book.id
				})
			}
			localStorage.setItem("shelves", JSON.stringify(prevState.shelves))
		})
	}

	render() {
		let { shelves, shelvesBookId } = this.state

		return (
			<Switch>
				<Route exact path="/"
							 render={() => (
								 <Main shelves={shelves}
											 shelvesBookId={shelvesBookId}
											 updateShelf={(shelf, book) => {
												 this.updateShelf(shelf, book)
											 }} />
							 )} />
				<Route path="/search"
							 render={() => (
								 <SearchBooks shelvesBookId={shelvesBookId}
															updateShelf={(shelf, book) => {
																this.updateShelf(shelf, book)
															}} />
							 )} />
				<Route component={Page404}/>
			</Switch>
		)
	}
}

export default App;
