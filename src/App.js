import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import * as BooksAPI from './api/BooksAPI'

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
	 * @param section (currentlyReading, wantToRead, read
	 * @param id
	 */
	updateShelf = (section, id) => {
		if (this.state.books[section].filter((obj) => {
				return obj.id === id
			}).length === 0) {
			this.setState((prevState) => {
				BooksAPI.get(id).then((book) => {
					prevState.books[section].push(book)
				})
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
											 updateShelf={(section, id) => {
												 this.updateShelf(section, id)
											 }} />
							 )} />
				<Route path="/search"
							 render={() => (
								 <SearchBooks books={books}
															updateShelf={(section, id) => {
																this.updateShelf(section, id)
															}} />
							 )} />
			</div>
		)
	}
}

export default App;
