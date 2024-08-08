import { useEffect, useState } from "react";
import { axiosInstanceData } from "../../service/axiosInstance";
import Nav from "../../Components/Nav/Nav";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const AdminPanel = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNewsArticles = async () => {
            setLoading(true);
            try {
                const response = await axiosInstanceData.get('/get-news');
                // console.log(response.data, "response");
                setNews(response.data.NewsDb);
                setError(null);
            } catch (error) {
                console.error("Error fetching news articles:", error);
                setNews([]);
                setError(error.message || 'An unexpected error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchNewsArticles();
    }, []);



    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }


    // const handleDelete = async (id) => {
    //     if (window.confirm('Are you sure you want to delete this article?')) {
    //         try {
    //             await axiosInstanceData.delete(`/delete-news/${id}`);
    //             setNews(news.filter(article => article._id !== id));
    //             alert('Article deleted successfully');
    //         } catch (error) {
    //             console.error('Error deleting article:', error);
    //             alert('An error occurred while deleting the article');
    //         }
    //     }
    // };
    function handleEdit(id){
        console.log(id,"idd")

    }

    return (
        <section>
            <Nav />
            {news.length > 0 ? (
                <>
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100 border-b border-gray-300">
                                <th className="py-2 px-4 border-r border-gray-300 text-left text-gray-600">Title</th>
                                <th className="py-2 px-4 border-r border-gray-300 text-left text-gray-600">Date</th>
                                <th className="py-2 px-4 border-r border-gray-300 text-gray-600">Author</th>
                                <th className="py-2 px-4 border-r  border-gray-300 text-gray-600">Edit</th>
                                <th className="py-2 px-4 border-r  border-gray-300 text-gray-600">Delete</th>

                            </tr>
                        </thead>
                        <tbody>
                            {news.map((article) => (
                                <tr className="hover:bg-gray-50 border-b border-gray-200" key={article._id}>
                                    <td className="py-2 px-4 border-r border-gray-300">{article.title}</td>
                                    <td className="py-2 px-4 border-r border-gray-300">{article.publishedAt}</td>
                                    <td className="py-2 px-4 border-r">{article.author}</td>
                                    <td className="border-r py-2 px-4 ">
                                        <Popup
                                            trigger={
                                                <button
                                                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    onClick={() => handleEdit(article._id)}
                                                >
                                                    
                                                    Edit
                                                </button>

                                            }
                                            modal
                                            closeOnDocumentClick
                                            contentStyle={{
                                                maxWidth: '600px',
                                                padding: '20px'
                                            }}
                                            // overlayStyle={{
                                            //     background: 'rgba(0,0,0,0.5)'
                                            // }}
                                            position="center center"
                                        >
                                            {close => (
                                                <div className="flex items-center justify-center h-screen">
                                                    <div className="bg-white p-6 rounded-lg shadow-lg">
                                                        <h2 className="text-xl font-semibold">Edit Article</h2>
                                                        <form >
                                                            <div className="mb-4">
                                                                <label className="block text-gray-700">Title</label>
                                                                <input
                                                                    type="text"
                                                                    name="title"
                                                                    // value={editingArticle?.title || ''}
                                                                    // onChange={handleInputChange}
                                                                    className="w-full border border-gray-300 p-2 rounded"
                                                                />
                                                            </div>
                                                            <div className="mb-4">
                                                                <label className="block text-gray-700">Author</label>
                                                                <input
                                                                    type="text"
                                                                    name="author"
                                                                    // value={editingArticle?.author || ''}
                                                                    // onChange={handleInputChange}
                                                                    className="w-full border border-gray-300 p-2 rounded"
                                                                />
                                                            </div>
                                                            <div className="mb-4">
                                                                <label className="block text-gray-700">Published Date</label>
                                                                <input
                                                                    type="datetime-local"
                                                                    name="publishedAt"
                                                                    // value={editingArticle?.publishedAt || ''}
                                                                    // onChange={handleInputChange}
                                                                    className="w-full border border-gray-300 p-2 rounded"
                                                                />
                                                            </div>
                                                            <div className="mb-4">
                                                                <label className="block text-gray-700">Description</label>
                                                                <textarea
                                                                    name="description"
                                                                    // value={editingArticle?.description || ''}
                                                                    // onChange={handleInputChange}
                                                                    className="w-full border border-gray-300 p-2 rounded"
                                                                />
                                                            </div>
                                                            <div className="mb-4">
                                                                <label className="block text-gray-700">URL</label>
                                                                <input
                                                                    type="text"
                                                                    name="url"
                                                                    // value={editingArticle?.url || ''}
                                                                    // onChange={handleInputChange}
                                                                    className="w-full border border-gray-300 p-2 rounded"
                                                                />
                                                            </div>
                                                            <div className="mb-4">
                                                                <label className="block text-gray-700">Image URL</label>
                                                                <input
                                                                    type="text"
                                                                    name="urlToImage"
                                                                    // value={editingArticle?.urlToImage || ''}
                                                                    // onChange={handleInputChange}
                                                                    className="w-full border border-gray-300 p-2 rounded"
                                                                />
                                                            </div>
                                                            <button
                                                                type="submit"
                                                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                                            >
                                                                Save Changes
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="ml-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                                                onClick={() => close()}
                                                            >
                                                                Close
                                                            </button>
                                                        </form>
                                                    </div>
                                                </div>
                                            )}
                                        </Popup>
                                    </td>
                                    <td className="py-2 px-4">
                                        <button
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                            onClick={() => handleDelete(article._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </>

            ) : (
                <div className='flex items-center justify-center h-screen'>
                    <p className='text-2xl'>No news articles available &#128577;.</p>
                </div>
            )}
        </section>
    );
}

export default AdminPanel;
