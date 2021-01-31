import React from 'react';
import Head from 'next/head';
import App from 'next/app';

import '../styles/main.css';

class MyApp extends App {
	static async getInitialProps({ Component, ctx, query }) {
		let pageProps = {};

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}

		return { pageProps };
	}

	render() {
		const { Component, pageProps } = this.props;
		return (
			<React.Fragment>
				<Head>
					<title>Create Next App</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<Component {...pageProps}/>
			</React.Fragment>
		);
	}
}

export default MyApp;