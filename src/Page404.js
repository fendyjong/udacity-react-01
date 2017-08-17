import React, { Component } from 'react'

import Hero from 'grommet/components/Hero'
import Box from 'grommet/components/Box'
import Heading from 'grommet/components/Heading'
import Button from 'grommet/components/Button'

class Page404 extends Component {
	render() {
		return (
			<Hero size="large">
				<Box pad="large"
						 margin="large"
						 justify="center"
						 align="center">
					<Heading>404</Heading>
					<Heading>Page Not Found</Heading>
					<Button path="/">Click here to go back</Button>
				</Box>
			</Hero>
		)
	}
}

export default Page404