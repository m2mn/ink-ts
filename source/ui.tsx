import React, { useState, useEffect } from 'react';
import { Text } from 'ink';
import { ApolloClient, InMemoryCache, gql, HttpLink } from '@apollo/client';
import fetch from 'cross-fetch';
import TextInput from 'ink-text-input';

const client = new ApolloClient({
	link: new HttpLink({ uri: 'https://48p1r2roz4.sse.codesandbox.io', fetch }),
	cache: new InMemoryCache()
});

const App = () => {
	const [rates, setRates] = useState<any[]>([]);
	const [query, setQuery] = useState('');

	const getData = async () => {
		const resp = await client.query({
			query: gql`{
			rates( currency:"ars"){
				currency
				name
				rate
			}
			}`
		});
		setRates(resp.data.rates);
		console.log(resp.data);
		return resp.data;
	}
	useEffect(() => {
		getData();

	}, []);
	return <>
		{rates && rates.map(item => <Text color="green">{item.name}</Text>)}
		{rates && <TextInput value={query} onChange={setQuery} />}
	</>;
};

module.exports = App;
export default App;
