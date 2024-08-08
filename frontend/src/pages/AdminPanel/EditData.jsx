import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { axiosInstanceData } from '../../service/axiosInstance';
import { useNavigate } from 'react-router-dom';

const EditData = () => {

    const navigate = useNavigate();

    const { id } = useParams();
    


    const [formData, setFormData] = useState({
        title: '',
        author: '',
        publishedAt: '',
        description: '',
        url: '',
        urlToImage: ''
    });
    console.log(formData)

    useEffect(() => {
        console.log(id, "idd")

        const fetchArticleById = async () => {
            try {
                const response = await axiosInstanceData.get(`/get/${id}`);
                console.log('Response data:', response.data); // Check response

                // Extract the data from the response
                const articleData = response.data.NewsDb;

                // Update the formData state with the fetched data
                setFormData({
                    title: articleData.title || '',
                    author: articleData.author || '',
                    publishedAt: articleData.publishedAt || '',
                    description: articleData.description || '',
                    url: articleData.url || '',
                    urlToImage: articleData.urlToImage || ''
                });
            }
            catch (error) {
                console.log(error)
            }

        }
        fetchArticleById()
    }, [id])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
        console.log(value)
    };

    const handleSubmit =  async (e) => {
        e.preventDefault();
        // Implement the logic to handle form submission
        console.log('Form submitted with data:', formData);
        try {
            const response = await axiosInstanceData.patch(`/update/${id}`, formData);

            // Log response to ensure it's successful
            console.log('Response from update:', response);
            alert('Article updated successfully');
            navigate('/admin')
        } catch (error) {
            console.error('Error updating article:', error);
        }
    };

    return (
        <div>
            <div className="  flex items-center justify-center">
                <div className=" w-screen p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold">Edit Article</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData?.title || ''}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 p-2 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Author</label>
                            <input
                                type="text"
                                name="author"
                                value={formData?.author || ''}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 p-2 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Published Date</label>
                            <input
                                type="text"
                                name="publishedAt"
                                value={formData?.publishedAt || ''}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 p-2 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Description</label>
                            <textarea
                                name="description"
                                value={formData?.description || ''}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 p-2 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">URL</label>
                            <input
                                type="text"
                                name="url"
                                value={formData?.url || ''}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 p-2 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Image URL</label>
                            <input
                                type="text"
                                name="urlToImage"
                                value={formData?.urlToImage || ''}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 p-2 rounded"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditData;
