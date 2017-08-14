import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from '../api/BooksAPI'

import Tiles from 'grommet/components/Tiles'
import Tile from 'grommet/components/Tile'
import Card from 'grommet/components/Card'

class BookShelf extends Component {

	/**
	 * Get book by id and then update shelf state
	 *
	 * @param shelf
	 * @param id
	 */
	bookShelfChanger = (shelf, id) => {
		switch (shelf) {
			case "currentlyReading":
			case "wantToRead":
			case "read":
				BooksAPI.get(id).then((book) => {
					this.props.updateShelf(shelf, book)
				})
				break;
			default:
				break;
		}
	}

	render() {
		let { books } = this.props

		return (
			<Tiles
				className="book-tile"
				fill={false}
				flush={true}
				justify="center">
				{books.map(book => (
					<Tile
						key={book.id}
						pad={{ horizontal: "medium", vertical: "small" }}>
						<Card
							className="book-card"
							thumbnail={book.imageLinks ? book.imageLinks.thumbnail : ''}
							headingStrong={false}
							contentPad='none'
						>
							<div className="book-shelf-changer">
								<select id={book.id} onChange={(event) => {
									this.bookShelfChanger(event.target.value, event.target.id)
								}}>
									<option value="none">Move to...</option>
									<option value="currentlyReading">Currently Reading</option>
									<option value="wantToRead">Want to Read</option>
									<option value="read">Read</option>
									<option value="none">None</option>
								</select>
							</div>
							<div className="book-card-content">
								<h5 className="grommetux-heading">{book.title}</h5>
								{book.authors && (
									<label className="grommetux-label grommetux-label--margin-none grommetux-label--small">
										{book.authors.map((author, key) => (
											<div key={key}>{author}</div>
										))}
									</label>
								)}
							</div>
						</Card>
					</Tile>

				))}
			</Tiles>
		)
	}
}

BookShelf.propTypes = {
	books: PropTypes.array.isRequired,
	updateShelf: PropTypes.func.isRequired
}


export default BookShelf