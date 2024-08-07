import React, { useEffect, useState } from 'react';
import Nav from '../../Components/Nav/Nav';
import { axiosInstanceData } from '../../service/axiosInstance';

// Function to sanitize content
const sanitizeContent = (content) => {
    // Remove text that starts with [ followed by any number of characters and ending with ]
    return content.replace(/\[\+[\d]+ chars\]/g, '');
};

const Home = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNewsArticles = async () => {
            setLoading(true);
            try {
                const response = await axiosInstanceData.get('/get-news');
                console.log(response.data, "response");

                // Sanitize each article's content
                const sanitizedNews = response.data.NewsDb.map(article => ({
                    ...article,
                    content: sanitizeContent(article.content),
                }));

                setNews(sanitizedNews);
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

    return (
        <>
            <Nav />
            <section>
                {news.length > 0 ? (
                    news.map((article, index) => (
                        <article className='flex flex-col items-center gap-5 mt-12' key={index}>
                            <div className='w-4/6 text-left flex flex-col gap-4'>
                                <h1 className='font-serif font-semibold text-2xl'>{article.title}</h1>
                                <p className='font-sans font-normal text-2xl text-gray-600'>{article.content}
                                    <button     onClick={() => window.location.href = article.url} className='text-blue-400 text-lg'>read more</button>
                                </p>
                                <div>
                                <p>By: <cite className='text-blue-500 font-serif'>{article.author}</cite></p>
                                <p>publishedAt <cite className='text-blue-500 font-serif'>{article.publishedAt}</cite></p>
                                </div>
                              

                            </div>
                            <img className='w-4/6' src={article.urlToImage} alt="article-img" />
                            <section>
                                <p>{article.description}</p>
                            </section>
                        </article>
                    ))
                ) : (
                    <p>No news articles available.</p>
                )}
            </section>
        </>
    );
};

export default Home;

