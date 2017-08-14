import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import Main from './views/Main'
import SearchBooks from './views/SearchBooks'
import '../node_modules/grommet-css'

class App extends Component {

	state = {
		books: {
			currentlyReading: [],
			wantToRead: [],
			read: []
		}
	}

	/**
	 * Update Personal Books which are currently reading, wish list and read
	 *
	 * @param shelf (currentlyReading, wantToRead, read
	 * @param id
	 */
	updateShelf = (shelf, book) => {
		if (this.state.books[shelf].filter((obj) => {
				return obj.id === book.id
			}).length === 0) {
			this.setState((prevState) => {
				prevState.books[shelf].push(book)
			})
		}
	}

	render() {
		let { books } = this.state

		return (
			<div>
				<Route exact path="/"
							 render={() => (
								 <Main books={books}
											 updateShelf={(shelf, book) => {
												 this.updateShelf(shelf, book)
											 }} />
							 )} />
				<Route path="/search"
							 render={() => (
								 <SearchBooks books={books}
															updateShelf={(shelf, book) => {
																this.updateShelf(shelf, book)
															}} />
							 )} />
			</div>
		)
	}
}

export default App;
