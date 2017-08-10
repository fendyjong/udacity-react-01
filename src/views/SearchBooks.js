import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from '../api/BooksAPI'

import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Search from 'grommet/components/Search';

import BookShelf from './BookShelf'

class SearchBooks extends Component {

	state = {
		booksQuery: [],
		query: ''
	}

	componentDidMount() {
		this.getAllBooks()
	}

	getAllBooks = () => {
		BooksAPI.getAll().then(books => {
			this.setState(() => ({
				booksQuery: books
			}))
		})
	}

	queryBooks = (query) => {
		if (query) {
			BooksAPI.search(query, 50).then(books => {
				if (books) {
					if (books.length > 0) {
						this.setState(() => ({
							booksQuery: books
						}))
					} else {
						this.setState(() => ({
							booksQuery: []
						}))
					}
				}
			})
		} else {
			this.getAllBooks()
		}
	}

	clearQuery = () => {
		this.setState({ query: '' })
	}

	render() {
		let { booksQuery } = this.state
		let { updatePersonalBooks } = this.props

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
				<BookShelf books={booksQuery}
									 updatePersonalBooks={(section, id) => {
										 updatePersonalBooks(section, id)
									 }} />
			</div>
		)
	}
}

SearchBooks.propTypes = {
	updatePersonalBooks: PropTypes.func.isRequired
}

export default SearchBooks