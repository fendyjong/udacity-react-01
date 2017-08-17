import React, { Component } from 'react'
import PropTypes from 'prop-types'
import shortid from 'shortid'
import * as BooksAPI from '../api/BooksAPI'

import Tiles from 'grommet/components/Tiles'
import Tile from 'grommet/components/Tile'

import Book from './Book'

class BookShelf extends Component {

	/**
	 * Get book by id and update shelves state
	 *
	 * @param shelf
	 * @param id
	 */
	bookShelfChanger = (shelf, id) => {
		BooksAPI.get(id).then((book) => {
			this.props.updateShelf(shelf, book)
		})
	}

	render() {
		let { shelvesBookId, books } = this.props

		return (
			<Tiles
				className="book-tile"
				fill={false}
				flush={true}
				justify="center">
				{books.map(book => (
					<Tile
						key={shortid.generate()}
						pad={{ horizontal: "medium", vertical: "small" }}>
						<Book book={book}
									shelvesBookId={shelvesBookId}
									bookShelfChanger={this.bookShelfChanger} />
					</Tile>
				))}
			</Tiles>
		)
	}
}

BookShelf.propTypes = {
	shelvesBookId: PropTypes.array,
	books: PropTypes.array.isRequired,
	updateShelf: PropTypes.func.isRequired
}


export default BookShelf