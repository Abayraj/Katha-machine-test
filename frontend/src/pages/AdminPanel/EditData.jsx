import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { axiosInstanceData } from '../../service/axiosInstance.js';

// Validation schema using Yup
const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    author: Yup.string().required('Author is required'),
    publishedAt: Yup.date().required('Published Date is required').typeError('Invalid date format'),
    description: Yup.string().required('Description is required'),
    url: Yup.string().url('Invalid URL').required('URL is required'),
    urlToImage: Yup.string().url('Invalid Image URL').required('Image URL is required'),
});

const EditData = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Fetch article data by ID
    const fetchArticleById = async () => {
        try {
            const response = await axiosInstanceData.get(`/get/${id}`);
            console.log('Response data:', response.data);

            // Return the data
            return response.data.NewsDb;
        } catch (error) {
            navigate('/error', { state: { error:error} });
          
        }
    };

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="w-screen p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold">Edit Article</h2>
                <Formik
                    initialValues={{
                        title: '',
                        author: '',
                        publishedAt: '',
                        description: '',
                        url: '',
                        urlToImage: ''
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting, setErrors }) => {
                        try {
                            const response = await axiosInstanceData.patch(`/update/${id}`, values);
                            console.log('Response from update:', response);
                            alert('Article updated successfully');
                            navigate('/admin');
                        } catch (error) {
                            console.error('Error updating article:', error);
                            setErrors({ submit: 'An error occurred while submitting the form' });
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ isSubmitting, setValues }) => {
                        useEffect(() => {
                            // Fetch and set the initial values when component mounts
                            const setInitialValues = async () => {
                                const articleData = await fetchArticleById();
                                if (articleData) {
                                    setValues({
                                        title: articleData.title,
                                        author: articleData.author,
                                        publishedAt: articleData.publishedAt,
                                        description: articleData.description,
                                        url: articleData.url,
                                        urlToImage: articleData.urlToImage
                                    });
                                }
                            };
                            setInitialValues();
                        }, [id, setValues]);

                        return (
                            <Form>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Title</label>
                                    <Field
                                        type="text"
                                        name="title"
                                        className="w-full border border-gray-300 p-2 rounded"
                                    />
                                    <ErrorMessage name="title" component="div" className="text-red-500" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Author</label>
                                    <Field
                                        type="text"
                                        name="author"
                                        className="w-full border border-gray-300 p-2 rounded"
                                    />
                                    <ErrorMessage name="author" component="div" className="text-red-500" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Published Date</label>
                                    <Field
                                        type="text"
                                        name="publishedAt"
                                        className="w-full border border-gray-300 p-2 rounded"
                                    />
                                    <ErrorMessage name="publishedAt" component="div" className="text-red-500" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Description</label>
                                    <Field
                                        as="textarea"
                                        name="description"
                                        className="w-full border border-gray-300 p-2 rounded"
                                    />
                                    <ErrorMessage name="description" component="div" className="text-red-500" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">URL</label>
                                    <Field
                                        type="text"
                                        name="url"
                                        className="w-full border border-gray-300 p-2 rounded"
                                    />
                                    <ErrorMessage name="url" component="div" className="text-red-500" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Image URL</label>
                                    <Field
                                        type="text"
                                        name="urlToImage"
                                        className="w-full border border-gray-300 p-2 rounded"
                                    />
                                    <ErrorMessage name="urlToImage" component="div" className="text-red-500" />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Save Changes
                                </button>
                                <ErrorMessage name="submit" component="div" className="text-red-500 mt-2" />
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
};

export default EditData;

