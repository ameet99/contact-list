import React from 'react';

const ContactItem = ({ contact, handleDelete }) => {
	return (
		<li key={contact.id}>
			<strong>{contact.name}</strong> - {contact.email} - {contact.phone}
			<button onClick={() => handleDelete(contact.id)}>Delete</button>
		</li>
	);
};

export default ContactItem;
