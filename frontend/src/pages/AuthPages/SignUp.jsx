import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { handleSubmitSignUp } from '../../api/authApi';
import { Link, useNavigate } from 'react-router-dom';





const SignUp = () => {
    const navigate = useNavigate();
    const [checkEmail, setCheckEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    // const handleSubmit = (values, { setSubmitting }) => {
    //     console.log('Form Data Submitted:', values);
    //     // Handle form submission here (e.g., API call)
    //     setSubmitting(false);
    
    // };

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState)
    }

    return (
        <>
            <div className="flex justify-center h-screen  flex-wrap text-slate-800">
                <div className="flex  w-full flex-col md:w-1/2">

                    <div className="my-auto mx-auto flex flex-col justify-center px-6 pt-8 md:justify-start lg:w-[33rem]">

                        <Link to="/" className="text-2xl font-bold text-blue-600 m-4">NexGen News </Link>

                        <p className="text-center text-2xl lg:text-3xl font-bold md:text-left md:leading-tight">Create your free account Sign up</p>
                        {/* {user && user.length !== 0 ? (
                            <>
                                <p className="mt-6 text-center font-medium md:text-left">
                                    SimplyShop?
                                    <Link
                                        to={"/"}
                                        className="text-blue-600 ml-2"
                                        // onClick={handlelogOut}
                                    >
                                    Logout
                                    </Link>
                                </p>
                            </>
                        ) : (
                            <p className="mt-6 text-center font-medium md:text-left">
                                Already using SimplyShop?
                                <Link
                                    to={"/login"}
                                    className="text-blue-600 ml-2"
                                >
                                   Login
                                </Link>
                            </p>
                        )} */}



                        {/* Formik Form */}
                        <Formik
                            initialValues={{
                                username: '',
                                email: '',
                                password: ''
                            }}

                            validationSchema={Yup.object({
                                username: Yup.string()
                                    .required('Required')
                                    .matches(/^[A-Z][a-zA-Z]*$/, 'First letter must be capitalized')
                                    .trim(),
                                email: Yup.string().email('Invalid email address').required('Required'),
                                password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required')
                            })}

                            onSubmit={async (values, { setSubmitting, setErrors }) => {
                                try {
                                    console.log(values)
                                    const res = await handleSubmitSignUp(values);

                                    if (res === 'User already exists. Please log in.') {

                                        navigate('/login', { state: { someData: { res } } });



                                    } else {
                                        setErrors({});
                                        setCheckEmail(res)
                                    }
                                } catch (error) {
                                    console.error(error);
                                    // Set generic form error
                                    setErrors({ form: "An error occurred while processing your request." });
                                } finally {
                                    setSubmitting(false);
                                }
                            }}



                        >
                            {({ handleChange, values }) => (
                                <Form className="flex flex-col items-stretch pt-3 md:pt-8">
                                    {!values.username && !values.email && !values.password && (
                                        <span className="text-red-500 mb-2">Please fill out all required fields correctly.</span>
                                    )}

                                    <div className="flex flex-col pt-4">
                                        <Field
                                            type="text"
                                            id="login-name"
                                            name="username"
                                            placeholder="Username"
                                            className="w-full flex-shrink appearance-none border border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                                            onChange={(e) => {
                                                handleChange(e);
                                                setCheckEmail(''); // Clear email check message on input change
                                            }}

                                        />
                                        <ErrorMessage name="username" component="div" className="text-red-500" />
                                    </div>
                                    <div className="flex flex-col pt-4">
                                        <Field
                                            autoComplete="email"
                                            type="email"
                                            id="login-email"
                                            name="email"
                                            placeholder="Email"
                                            className="w-full flex-shrink appearance-none border border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                                            onChange={(e) => {
                                                handleChange(e);
                                                setCheckEmail(''); // Clear email check message on input change
                                            }}

                                        />
                                        <ErrorMessage name="email" component="div" className="text-red-500" />
                                    </div>
                                    <div className="mb-4 flex flex-col pt-4 relative">
                                        <Field
                                            autoComplete="new-password"
                                            type={showPassword ? 'text' : 'password'}
                                            id="login-password"
                                            name="password"
                                            placeholder="Password (minimum 8 characters)"
                                            className="w-full flex-shrink appearance-none border border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                                            onChange={(e) => {
                                                handleChange(e);
                                                setCheckEmail(''); // Clear email check message on input change
                                            }}

                                        />
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            className="absolute  right-0 flex items-center p-2 "
                                        >
                                        {
                                            showPassword?(
                                                <span>&#128065;</span>
                                            ):(
                                                <span>&#128065;&#8205;&#128488;</span>
                                            )
                                        }
                           
                                        </button>
                                        <ErrorMessage name="password" component="div" className="text-red-500" />
                                    </div>
                                    {checkEmail && (
                                        <p className='text-lg text-blue-400'>Check your email to verify</p>
                                    )}

                                    <button
                                        type="submit"
                                        className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-center text-base font-semibold text-white shadow-md outline-none ring-blue-500 ring-offset-2 transition hover:bg-blue-700 focus:ring-2 md:w-32"
                                    >
                                        Sign up
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div >
        </>
    );
};

export default SignUp;

