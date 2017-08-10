import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Header from 'grommet/components/Header'
import Title from 'grommet/components/Title'
import Box from 'grommet/components/Box'
import Button from 'grommet/components/Button'
import Article from 'grommet/components/Article'
import Section from 'grommet/components/Section'

import AddIcon from 'grommet/components/icons/base/Add';

import BookShelf from './BookShelf'

class Main extends Component {

	render() {
		let { currentlyReading, wantToRead, read } = this.props.books
		let { updateShelf } = this.props

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
					<Section>
						<h1>Currently Reading</h1>
						<BookShelf books={currentlyReading}
											 updateShelf={(section, id) => {
												 updateShelf(section, id)
											 }} />
					</Section>
					<Section>
						<h1>Wish List</h1>
						<BookShelf books={wantToRead}
											 updateShelf={(section, id) => {
												 updateShelf(section, id)
											 }} />
					</Section>
					<Section>
						<h1>Read</h1>
						<BookShelf books={read}
											 updateShelf={(section, id) => {
												 updateShelf(section, id)
											 }} />
					</Section>
				</Article>
			</div>
		)
	}
}

Main.propTypes = {
	books: PropTypes.object.isRequired,
	updateShelf: PropTypes.func.isRequired
}

export default Main