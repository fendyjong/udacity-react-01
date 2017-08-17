import React, { Component } from 'react'
import PropTypes from 'prop-types'
import shortid from 'shortid'

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
		let { shelves, shelvesBookId, updateShelf } = this.props
		// used only for repeating shelf section
		const shelvesName = { currentlyReading: 'Currently Reading', wantToRead: 'Want to Read', read: 'Read' };

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
					{Object.keys(shelvesName).map(shelfKey => (
						<Section className={`${shelfKey}Section`} key={shortid.generate()}>
							<Heading align="center">{shelvesName[shelfKey]}</Heading>
							<BookShelf shelvesBookId={shelvesBookId}
												 books={shelves[shelfKey]}
												 updateShelf={updateShelf} />
						</Section>
					))}
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