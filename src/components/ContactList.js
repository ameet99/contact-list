
import React, { useState, useEffect } from "react";
import axios from "axios";
import ContactItem from "./ContactItem";
const ContactList = () => {
	const [contacts, setContacts] = useState([]);
	const [newContact, setNewContact] = useState({
		name: "",
		email: "",
		phone: "",
	});

	const fetchContacts = async () => {
		// fetch data
		try {
			const response = await axios.get(
				"https://jsonplaceholder.typicode.com/users"
			);
			setContacts(response.data);
		} catch (error) {
			console.log("Error fetching contacts:", error);
		}
	};

	useEffect(() => {
		fetchContacts();
	}, []);

	const handleChange = (e) => {
		//input
		const { name, value } = e.target;
		setNewContact((prevContact) => ({ ...prevContact, [name]: value }));
	};

	const handlAddContact = async (e) => {
		e.preventDefault();
		// add request
		try {
			const response = await axios.post(
				"https://jsonplaceholder.typicode.com/users",
				newContact
			);
			if (response.status === 200 || response.status === 201) {
				setContacts((prevContacts) => [...prevContacts, response.data]);
				setNewContact({ name: "", email: "", phone: "" });
				alert("Contact List Updated Successfully!");
			}
		} catch (error) {
			console.log("Error adding contact:", error);
		}
	};

	const handleDelete = async (id) => {
		// delete request
		try {
			await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
			setContacts((prevContacts) =>
				prevContacts.filter((contact) => contact.id !== id)
			);
		} catch (error) {
			console.log("Error deleting contact:", error);
		}
	};

	return (
		<div>
			<h3>Add information</h3>
			<form onSubmit={handlAddContact}>
				{/* below input component */}
				<input
					type="text"
					placeholder="Name"
					name="name"
					value={newContact.name}
					onChange={handleChange}
				/>
				<input
					type="email"
					placeholder="Email"
					name="email"
					value={newContact.email}
					onChange={handleChange}
				/>
				<input
					type="text"
					placeholder="Phone"
					name="phone"
					value={newContact.phone}
					onChange={handleChange}
				/>
				<button type="submit">Add Contact</button>
			</form>
			<ul>
				{contacts?.map((contact) => (
					<ContactItem key={contact.id} contact={contact} handleDelete={handleDelete} />
        ))}
			</ul>
		</div>
	);
};

export default ContactList;
