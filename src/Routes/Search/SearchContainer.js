import React from 'react';
import SearchPresenter from './SearchPresenter';
import { moviesApi, tvApi } from 'api';

export default class extends React.Component {
	state = {
		movieResults: null,
    tvResults: null,
    searchTerm: "", 
		error: null,
		loading: false
	};

	handleSubmit = (event) => {
		event.preventDefault();
		const { searchTerm } = this.state;

		if(searchTerm !== "") {
			this.searchByTerm();
		}
	}

	updateTerm = (event) => {
		const { target: { value } } = event;
		// console.log(value);
		this.setState({
			searchTerm: value
		})
	}

	searchByTerm = async() => {
		const { searchTerm } = this.state;
		this.setState({loading: true});

		try {
			// throw Error();
			const {data: { results: movieResults }} = await moviesApi.search(searchTerm);
			const {data: { results: tvResults }} = await tvApi.search(searchTerm);

			this.setState({
				movieResults,
				tvResults
			})

		} catch {
			this.setState({
				error: "Can't find results.",
			})

		} finally {
			this.setState({ loading: false })
		}
	}

	render() {
		const { movieResults, tvResults, searchTerm, error, loading } = this.state;

		// console.log(this.state); 

		return (
		<SearchPresenter 
			movieResults={movieResults} 
			tvResults={tvResults} 
			searchTerm={searchTerm} 
			error={error} 
			loading={loading} 
			handleSubmit={this.handleSubmit} 
			updateTerm={this.updateTerm}  
			/>
			);
	}
}
