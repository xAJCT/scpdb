// Import necessary functions and hooks from React and Firebase
import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db, storage } from './fbconfig';
import { fetchData } from './Read';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function Create()
{
    // State variables to hold the input values
    const [title, setTitle] = useState("");
    const [tagline, setTagline] = useState("");
    const [content, setContent] = useState("");
    const [containment, setContainment] = useState("");
    const [image, setImage] = useState(null); // State variable for the image file

    // Reference to the "data" collection in Firestore
    const ourCollection = collection(db, "data");

    // Function to handle form submission and create a new document in Firestore
    const handleSubmit = async (e) =>
    {
        e.preventDefault(); // Prevent the default form submission behavior

        // Check if an image file is selected
        if (!image) return;

        // Create a reference to the image in Firebase Storage
        const imageRef = ref(storage, `images/${image.name}`);

        try
        {
            // Upload the image to Firebase Storage
            const imageSnapshot = await uploadBytes(imageRef, image);
            // Retrieve the download URL for the uploaded image
            const imageURL = await getDownloadURL(imageRef);

            // Add a new document to the Firestore collection with the form data and image URL
            await addDoc(ourCollection, {
                Title: title.toUpperCase(),
                Tagline: tagline,
                Content: content,
                Containment: containment,
                ImageURL: imageURL
            });

            // Reset the form fields
            setTitle("");
            setTagline("");
            setContent("");
            setContainment("");
            setImage(null);

            // Fetch the updated data to refresh the displayed list
            fetchData();
        } catch (error)
        {
            // Log any errors that occur during the document creation
            console.error("Error creating document: ", error);
        }
    }

    return (
        <>
            {/* Heading for the form */}
            <h5 className='text-center'>Enter a new SCP subject into the Database:</h5>
            <br />

            {/* Form to create a new document */}
            <form onSubmit={handleSubmit} className='form-group bg-light-subtle p-5'>
                {/* Input field for the title */}
                <input
                    className='form-control border border-primary-subtle mb-3'
                    type='text'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder='Item #'
                />
                {/* Input field for the tagline */}
                <input
                    className='form-control border border-primary-subtle mb-3'
                    type='text'
                    value={tagline}
                    onChange={e => setTagline(e.target.value)}
                    placeholder='Object Class'
                />
                {/* Textarea for the content */}
                <textarea
                    className='form-control border border-primary-subtle mb-4'
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder='Description'
                />
                {/* Textarea for the containment */}
                <textarea
                    className='form-control border border-primary-subtle mb-4'
                    value={containment}
                    onChange={e => setContainment(e.target.value)}
                    placeholder='Containment'
                />
                {/* Input field for the image file */}
                <input
                    className='form-control border border-primary-subtle mb-3'
                    type='file'
                    onChange={e => setImage(e.target.files[0])}
                />
                {/* Submit button to create the document */}
                <button className='btn btn-primary'>Create Document</button>
            </form>
        </>
    );
}

export default Create;
