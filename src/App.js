import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import * as BooksAPI from './api/BooksAPI'

import Main from './views/Main'
import SearchBooks from './views/SearchBooks'
import './App.css';
import '../node_modules/grommet-css'

class App extends Component {

	state = {
		books: {
			currentlyReading: [],
			wantToRead: [],
			read: []
		}
	}

	updatePersonalBooks = (section, id) => {
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
											 updatePersonalBooks={(section, id) => {
												 this.updatePersonalBooks(section, id)
											 }} />
							 )} />
				<Route path="/search"
							 render={() => (
								 <SearchBooks books={books}
															updatePersonalBooks={(section, id) => {
																this.updatePersonalBooks(section, id)
															}} />
							 )} />
			</div>
		)
	}
}

export default App;
