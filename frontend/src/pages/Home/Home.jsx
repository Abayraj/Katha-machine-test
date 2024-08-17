import React, { useEffect, useState } from 'react';
import Nav from '../../Components/Nav/Nav';
import { axiosInstanceData } from '../../service/axiosInstance';
import { motion } from "framer-motion"
import { RiseLoader } from 'react-spinners';
import "../Home/pagination.css"
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import Footer from '../../Components/Footer.jsx';




// Function to sanitize content
const sanitizeContent = (content) => {
    if (typeof content === 'string') {
        return content.replace(/\[\+[\d]+ chars\]/g, '');
    }
    return '';
};

const Home = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const navigate = useNavigate();


    useEffect(() => {
        const fetchNewsArticles = async () => {
            setLoading(true);
            try {
                const response = await axiosInstanceData.get('/get-news');
         

                // Sanitize each article's content
                const sanitizedNews = response.data.NewsDb.map(article => ({
                    ...article,
                    content: sanitizeContent(article.content),
                    publishedAt: moment(article.publishedAt).format('MMMM D, YYYY [at] h:mm A'),
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

    useEffect(() => {
        // Scroll to top whenever the current page changes
        window.scrollTo(0, 0);
    }, [currentPage]);

    useEffect(() => {
        if (error) {
            navigate('/error', { state: { error: error } });
        }
    }, [error, navigate]);

    // Calculate pagination values
    const lastItemsIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemsIndex - itemsPerPage;
    const thisPageItems = news.slice(firstItemIndex, lastItemsIndex);

    // Generate page numbers
    const pageCount = Math.ceil(news.length / itemsPerPage);
    const pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }


    if (loading) {
        return (      <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f0f0f0'
        }}>
            <RiseLoader color="#3498db" size={20} margin={3} />
        </div>
    )}

  

    return (
        <>
            <Nav />
            <section>
                {news.length > 0 ? (
                    thisPageItems.map((article, index) => (
                        <motion.article
                        className='flex flex-col items-center gap-5 mt-12'
                        key={index}
                        initial={{
                            opacity: 0,
                            y: 200,
                          }}
                          whileInView={{
                            opacity: 1,
                            y: 0, 
                            transition: {
                              duration: 1, 
                            },
                          }}
                          viewport={{ once: false }}
                    >
                            <div className='w-4/6 text-left flex flex-col gap-4'>
                                <h1 className='font-serif font-semibold text-2xl'>{article.title}</h1>
                                <p>{article.description}</p>
                                <div>
                                    <p>By: <cite className='text-blue-500 font-serif'>{article.author}</cite></p>
                                    <p>Published At: <cite className='text-blue-500 font-serif'>{article.publishedAt}</cite></p>
                                </div>
                            </div>
                            <img className='w-4/6' src={article.urlToImage} alt="article-img" />
                            <section className='w-4/6'>
                                <p className='font-medium text-sm text-gray-600 sm:text-2xl'>
                                    {article.content}
                                    <button onClick={() => window.location.href = article.url} className='text-blue-400 text-lg'>
                                        Read more
                                    </button>
                                </p>
                            </section>
                            </motion.article>
                    ))
                ) : (
                    <div className='flex items-center justify-center h-screen'>
                        <p className='text-2xl'>No news articles available &#128577;</p>
                    </div>
                )}

                <div className='pagination-controls'>
                    {pages.map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`pagination-button ${page === currentPage ? 'active' : ''}`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            </section>
            <Footer/>
        </>
    );
};

export default Home;

