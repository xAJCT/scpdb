// Import necessary functions and hooks from React and Firebase
import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from './fbconfig';
import Update from './Update';

// Declare a global function to fetch data
export let fetchData;

function Read()
{
    // Reference to the "data" collection in Firestore
    const ourCollection = collection(db, "data");

    // State to store the fetched data
    const [readData, setReadData] = useState([]);

    // State to track the ID of the document being updated
    const [updateId, setUpdateId] = useState(null);

    // Function to fetch data from Firestore
    fetchData = async () =>
    {
        try
        {
            // Get all documents from the collection
            const snapshot = await getDocs(ourCollection);
            // Map the documents to an array of objects and set the state
            setReadData(
                snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
            );
        } catch (error)
        {
            // Log any errors that occur during fetching
            console.error("Error fetching data: ", error);
        }
    };

    // useEffect to call fetchData when the component mounts
    useEffect(() => { fetchData() }, []);

    // Function to handle deleting a document
    const handleDelete = async (id) =>
    {
        const docRef = doc(db, "data", id);
        try
        {
            // Delete the document with the specified ID
            await deleteDoc(docRef);
        } catch (error)
        {
            // Log any errors that occur during deletion
            console.error("Error deleting document: ", error);
        }
        // Refresh the data after deletion
        fetchData();
    };

    // Function to handle refreshing the data and resetting updateId
    const handleRefresh = () =>
    {
        setUpdateId(null);
        fetchData();
    };

    return (
        <>
            {/* Container for displaying the data */}
            <div className='mt-3 border rounded shadow p-3'>
                {/* Map over the readData array to display each document */}
                {readData.map(({ id, Title, Tagline, Content, Containment, ImageURL }) => (
                    <div key={id} id={Title.toUpperCase()}>
                        <h3>{Title}</h3>
                        <hr />
                        <h4>Class: <strong>{Tagline}</strong></h4>
                        <hr />
                        <p><strong>Description:</strong> {Content}</p>
                        <hr />
                        <p><strong>Containment:</strong> {Containment}</p>
                        <hr />
                        {/* Conditionally render the image if ImageURL exists */}
                        {ImageURL && (
                            <p className='text-center'>
                                <img src={ImageURL} alt={Title} className='img-fluid shadow rounded-border' style={{ width: '400px', height: '300px' }} />
                            </p>
                        )}
                        <hr />
                        {/* Button to delete the document */}
                        <button className='btn btn-danger' onClick={() => handleDelete(id)}>Delete Document</button>
                        <hr className='mb-3' />
                        {/* Button to set the updateId state to the current document's ID */}
                        <button onClick={() => setUpdateId(id)} className='btn btn-info'>Update Document</button>
                        <hr className='mb-3'></hr>
                        {/* Conditionally render the Update component if the updateId matches the current document's ID */}
                        {updateId === id && (
                            <Update
                                id={id}
                                initialTitle={Title}
                                initialTagline={Tagline}
                                initialContent={Content}
                                initialContainment={Containment}
                                onUpdated={handleRefresh}
                            />
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}

export default Read;
