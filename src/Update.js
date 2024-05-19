// Import necessary functions and hooks from React and Firebase
import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from './fbconfig';

function Update({ id, initialTitle, initialTagline, initialContent, initialContainment, onUpdated })
{
    // State variables to hold the current values of the fields being edited
    const [title, setTitle] = useState(initialTitle);
    const [tagline, setTagline] = useState(initialTagline);
    const [content, setContent] = useState(initialContent);
    const [containment, setContainment] = useState(initialContainment);

    // Function to handle form submission and update the document in Firestore
    const handleUpdate = async (e) =>
    {
        e.preventDefault();  // Prevent the default form submission behavior
        const documentRef = doc(db, "data", id);  // Get a reference to the document in Firestore

        try
        {
            // Update the document with the new values
            await updateDoc(documentRef, {
                Title: title,
                Tagline: tagline,
                Content: content,
                Containment: containment
            });
            // Call the onUpdated callback to refresh the data in the parent component
            onUpdated();
        } catch (error)
        {
            // Log any errors that occur during the update
            console.error("Error updating document: ", error);
        }
    }

    return (
        <>
            {/* Form to update the document fields */}
            <form className='form-group bg-light rounded p-3 mt-5' onSubmit={handleUpdate}>
                {/* Input field for the title */}
                <input
                    type='text'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder='Title'
                    className='form-control mb-3'
                />
                {/* Input field for the tagline */}
                <input
                    type='text'
                    value={tagline}
                    onChange={e => setTagline(e.target.value)}
                    placeholder='Tagline'
                    className='form-control mb-3'
                />
                {/* Textarea for the content */}
                <textarea
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder='Content'
                    className='form-control mb-3'
                />
                {/* Textarea for the containment */}
                <textarea
                    value={containment}
                    onChange={e => setContainment(e.target.value)}
                    placeholder='Containment'
                    className='form-control mb-3'
                />
                {/* Submit button to update the document */}
                <button type='submit' className='btn btn-primary'>Update Document</button>
            </form>
        </>
    );
}

export default Update;
