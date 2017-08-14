import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from '../api/BooksAPI'

import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Search from 'grommet/components/Search';

import BookShelf from './BookShelf'

class SearchBooks extends Component {

	state = {
		booksQueryResult: [],
		query: ''
	}

	/**
	 * When the component have been mounted, get all books from the books API
	 */
	componentDidMount() {
		this.getAllBooks()
	}

	/**
	 * Get all books from the BooksAPI
	 */
	getAllBooks = () => {
		BooksAPI.getAll().then(books => {
			this.setState(() => ({
				booksQueryResult: books
			}))
		})
	}

	/**
	 * Whenever the user type, it will automatically search for the books if available.
	 * If not available, return empty array
	 *
	 * If search query is empty, get all books
	 *
	 * @param query (search query)
	 */
	queryBooks = (query) => {
		if (query) {
			BooksAPI.search(query, 50).then(books => {
				if (books) {
					if (books.length > 0) {
						this.setState(() => ({
							booksQueryResult: books
						}))
					} else {
						this.setState(() => ({
							booksQueryResult: []
						}))
					}
				}
			})
		} else {
			this.getAllBooks()
		}
	}

	render() {
		let { booksQueryResult } = this.state
		let { updateShelf } = this.props

		return (
			<div>
				<Header
					fixed={true}
					colorIndex="brand"
					size="small"
					className="header">
					<Box
						flex={true}
						justify='end'
						direction='row'
						responsive={false}
						pad="small">
						<Title>
							<Link to="/">My Reads</Link>
						</Title>
						<Search
							inline={true}
							fill={true}
							size='medium'
							placeHolder='Search'
							dropAlign={{ "right": "right" }}
							onDOMChange={(event) => this.queryBooks(event.target.value)} />
					</Box>
				</Header>
				<BookShelf books={booksQueryResult}
									 updateShelf={(shelf, book) => {
										 updateShelf(shelf, book)
									 }} />
			</div>
		)
	}
}

SearchBooks.propTypes = {
	updateShelf: PropTypes.func.isRequired
}

export default SearchBooks