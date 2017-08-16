import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import Main from './views/Main'
import SearchBooks from './views/SearchBooks'
import '../node_modules/grommet-css'

class App extends Component {

	state = {
		shelves: {
			currentlyReading: [],
			wantToRead: [],
			read: []
		},
		shelvesBookId: []
	}

	/**
	 * When mounted, update state with the local storage
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
			<div>
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
			</div>
		)
	}
}

export default App;
