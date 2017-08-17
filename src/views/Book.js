import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Card from 'grommet/components/Card'

class Book extends Component {

	render() {
		let { shelvesBookId, book, bookShelfChanger } = this.props

		return (
			<Card
				className="book-card"
				thumbnail={book.imageLinks ? book.imageLinks.thumbnail : 'https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg'}
				headingStrong={false}
				contentPad='none'
			>
				<div className="book-shelf-changer">
					<select id={book.id}
									onChange={(event) => {
										bookShelfChanger(event.target.value, event.target.id)
									}}
									defaultValue={shelvesBookId[book.id] || ''}>
						<option value="">Move to...</option>
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
		)
	}
}

Book.propTypes = {
	shelvesBookId: PropTypes.array,
	book: PropTypes.object.isRequired,
	bookShelfChanger: PropTypes.func.isRequired
}


export default Book