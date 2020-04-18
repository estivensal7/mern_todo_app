import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../Utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";

class Items extends Component {
	state = {
		items: [],
		note: "",
		author: "",
	};

	componentDidMount() {
		this.loadItems();
	}

	loadItems = () => {
		API.getItems()
			.then((res) =>
				this.setState({
					items: res.data,
					note: "",
					author: "",
				})
			)
			.catch((err) => console.log(err));
	};

	deleteItem = (id) => {
		API.deleteItem(id)
			.then((res) => this.loadItems())
			.catch((err) => console.log(err));
	};

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
			API.saveItem({
				note: this.state.note,
				author: this.state.author,
			})
				.then((res) => this.loadItems())
				.catch((err) => console.log(err));
		}
	};

	render() {
		return (
			<Container fluid>
				<Row>
					<Col size="md-6">
						<Jumbotron>
							<h1>Add Item To List</h1>
						</Jumbotron>
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
								Submit To Do Item
							</FormBtn>
						</form>
					</Col>
					<Col size="md-6 sm-12">
						<Jumbotron>
							<h1>My To Do List</h1>
						</Jumbotron>
						{this.state.items.length ? (
							<List>
								{this.state.items.map((item) => (
									<ListItem key={item._id}>
										<Link to={"/items/" + item._id}>
											<strong>
												{item.note} by {item.author}
											</strong>
										</Link>
										<DeleteBtn
											onClick={() =>
												this.deleteItem(item._id)
											}
										/>
									</ListItem>
								))}
							</List>
						) : (
							<h3>No Results to Display</h3>
						)}
					</Col>
				</Row>
			</Container>
		);
	}
}

export default Items;
