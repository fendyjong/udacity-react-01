import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Header from 'grommet/components/Header'
import Title from 'grommet/components/Title'
import Box from 'grommet/components/Box'
import Button from 'grommet/components/Button'
import Article from 'grommet/components/Article'
import Section from 'grommet/components/Section'
import Heading from 'grommet/components/Heading'

import AddIcon from 'grommet/components/icons/base/Add';

import BookShelf from './BookShelf'

class Main extends Component {

	render() {
		let { currentlyReading, wantToRead, read } = this.props.shelves
		let { shelvesBookId, updateShelf } = this.props

		return (
			<div>
				<Header fixed={true}
								colorIndex="brand"
								size="small"
								className="header">
					<Title pad="small">My Reads</Title>
					<Box flex={true}
							 justify='end'
							 direction='row'
							 responsive={false}
							 pad="small">
						<Button path="/search" icon={<AddIcon />} />
					</Box>
				</Header>
				<Article>
					<Section className="currentlyReadingSection">
						<Heading align="center">Currently Reading</Heading>
						<BookShelf shelvesBookId={shelvesBookId}
											 books={currentlyReading}
											 updateShelf={(shelf, book) => {
												 updateShelf(shelf, book)
											 }} />
					</Section>
					<Section className="wantToReadSection">
						<Heading align="center">Want To Read</Heading>
						<BookShelf shelvesBookId={shelvesBookId}
											 books={wantToRead}
											 updateShelf={(shelf, book) => {
												 updateShelf(shelf, book)
											 }} />
					</Section>
					<Section className="readSection">
						<Heading align="center">Read</Heading>
						<BookShelf shelvesBookId={shelvesBookId}
											 books={read}
											 updateShelf={(shelf, book) => {
												 updateShelf(shelf, book)
											 }} />
					</Section>
				</Article>
			</div>
		)
	}
}

Main.propTypes = {
	shelves: PropTypes.object,
	shelvesBookId: PropTypes.array,
	updateShelf: PropTypes.func.isRequired
}

export default Main