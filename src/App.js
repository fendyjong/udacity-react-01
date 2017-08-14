import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import Main from './views/Main'
import SearchBooks from './views/SearchBooks'
import '../node_modules/grommet-css'

class App extends Component {

	state = {
		shelf: {
			currentlyReading: [],
			wantToRead: [],
			read: []
		}
	}

	/**
	 * When mounted, update state with the local storage
	 */
	componentDidMount() {
		const shelf = JSON.parse(localStorage.getItem("shelf"))
		if (shelf) {
			this.setState({
				shelf: shelf
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
				if (this.state.shelf[shelf].filter((obj) => {
						return obj.id === book.id
					}).length === 0) {
					this.setState((prevState) => {
						prevState.shelf[shelf].push(book)
						localStorage.setItem("shelf", JSON.stringify(prevState.shelf))
					})

				}
				break
			default:
		}
	}

	/**
	 * Move from one shelf to another
	 *
	 * @param shelf
	 * @param book
	 */
	moveShelf = (shelf, book) => {
		this.updateShelf(shelf, book)

		let shelfs = []
		switch (shelf) {
			case "currentlyReading":
				shelfs.push("wantToRead")
				shelfs.push("read")
				break;
			case "wantToRead":
				shelfs.push("currentlyReading")
				shelfs.push("read")
				break;
			case "read":
				shelfs.push("currentlyReading")
				shelfs.push("wantToRead")
				break;
			case "none":
				shelfs.push("currentlyReading")
				shelfs.push("wantToRead")
				shelfs.push("read")
				break;
			default:
		}
		this.removeBookFromShelf_(shelfs, book)
	}

	removeBookFromShelf_ = (shelfs, book) => {
		this.setState((prevState) => {
			for (let shelf of shelfs) {
				prevState.shelf[shelf] = prevState.shelf[shelf].filter((obj) => {
					return obj.id !== book.id
				})
			}
			localStorage.setItem("shelf", JSON.stringify(prevState.shelf))
		})
	}

	render() {
		let { shelf } = this.state

		return (
			<div>
				<Route exact path="/"
							 render={() => (
								 <Main shelf={shelf}
											 updateShelf={(shelf, book) => {
												 this.moveShelf(shelf, book)
											 }} />
							 )} />
				<Route path="/search"
							 render={() => (
								 <SearchBooks updateShelf={(shelf, book) => {
									 this.updateShelf(shelf, book)
								 }} />
							 )} />
			</div>
		)
	}
}

export default App;
