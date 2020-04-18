import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import { Input, FormBtn } from "../components/Form";
import API from "../Utils/API";

class Detail extends Component {
	state = {
		item: [{}],
		note: "",
		author: "",
	};
	// When this component mounts, grab the item with the _id of this.props.match.params.id
	// e.g. localhost:3000/books/599dcb67f0f16317844583fc
	componentDidMount() {
		API.getItem(this.props.match.params.id)
			.then((res) =>
				this.setState({
					item: res.data,
					note: res.data[0].note,
					author: res.data[0].author,
				})
			)
			.catch((err) => console.log(err));
	}

	handleInputChange(property) {
		return (e) => {
			this.setState({
				[property]: e.target.value,
			});
		};
	}

	handleFormSubmit = (event) => {
		event.preventDefault();
		if (this.state.note && this.state.author) {
			API.updateItem(this.props.match.params.id, {
				note: this.state.note,
				author: this.state.author,
			})
				.then((res) => this.loadChanges())
				.catch((err) => console.log(err));
		}
	};

	loadChanges = () => {
		API.getItem(this.props.match.params.id)
			.then((res) => this.setState({ item: res.data }))
			.catch((err) => console.log(err));
	};

	render() {
		return (
			<Container fluid>
				<Row>
					<Col size="md-12">
						<Jumbotron>
							<h1>
								{this.state.item[0].note} by{" "}
								{this.state.item[0].author}
							</h1>
						</Jumbotron>
					</Col>
				</Row>
				<Row>
					<Col size="md-2">
						<Link to="/">← Back to To Do List</Link>
					</Col>
					<Col size="md-2">
						<h2>Edit The Item</h2>
					</Col>
				</Row>
				<Row>
					<Col size="md-6">
						<form>
							<Input
								value={this.state.note}
								onChange={this.handleInputChange("note")}
								name="note"
								placeholder="Note (required)"
							/>
							<Input
								value={this.state.author}
								onChange={this.handleInputChange("author")}
								name="author"
								placeholder="Author (required)"
							/>
							<FormBtn
								disabled={
									!(this.state.author && this.state.note)
								}
								onClick={this.handleFormSubmit}>
								Submit Changes
							</FormBtn>
						</form>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default Detail;
