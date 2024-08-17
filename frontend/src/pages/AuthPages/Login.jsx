import React, { useContext, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { handleSubmitLogin, handleForgotPassword } from '../../api/authApi'; // Assuming these functions are defined in your authApi
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';


const Login = () => {
    const navigate = useNavigate();
    const [checkEmail, setCheckEmail] = useState('');
    const [forgotPassword, setForgotPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
   

    const location = useLocation();

    const { state } = location;
   

    
const { user, loading ,logout,trigger} = useContext(AuthContext);
    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };


    // Handler for forgot password submission
    const handleForgotPasswordSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            console.log(values.email)
            const response = await handleForgotPassword(values);
         

            if (response.error) {
                setCheckEmail(response.error);
            } else {
                setCheckEmail('Password reset instructions have been sent to your email.');
                setForgotPassword(false); // Close the forgot password form
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            setErrors({ general: 'An unexpected error occurred.' });
        } finally {
            setSubmitting(false);
        }
    };

    // Handler for login submission
    const handleLoginSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            const response = await handleSubmitLogin(values);
            trigger();
            if (response.error) {
                setCheckEmail(response.error);
            } else {
     
                navigate('/');
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            setErrors({ general: 'An unexpected error occurred.' });
        } finally {
            setSubmitting(false);
            
        }
    };

    return (
        <div className="flex justify-center h-screen flex-wrap text-slate-800">
            <div className="flex w-full flex-col md:w-1/2">
                <div className="my-auto mx-auto flex flex-col justify-center px-6 pt-8 md:justify-start lg:w-[28rem]">
                    <Link to="/" className="text-2xl font-bold text-blue-600 m-1 mb-3">NexGen News</Link>
                    <p className="text-center text-3xl font-bold md:text-left md:leading-tight">Log in</p>

                    {state?.someData && (
                        <p className="mt-6 text-center font-medium md:text-left">
                            Already using NexGen News?
                            <Link to={"/login"} className="text-blue-600 ml-2">
                                {state.someData.res}
                            </Link>
                        </p>
                    )}
                    {
                        !state?.someData && (
                            <p className="mt-6 text-center font-medium md:text-left">
                            New to NexGen? Start by signing up now!
                            <Link to={"/signup"} className="text-blue-600 ml-2">
                                sign up
                            </Link>
                        </p>

                        )
                    }
            

                    {/* Formik Form */}
                    <Formik
                        initialValues={{
                            email: '',
                            password: ''
                        }}
                        validationSchema={Yup.object({
                            email: Yup.string().email('Invalid email address').required('Required'),
                            password: !forgotPassword ? Yup.string().min(8, 'Password must be at least 8 characters').required('Required') : Yup.string()
                        })}
                        onSubmit={forgotPassword ? handleForgotPasswordSubmit : handleLoginSubmit}
                    >
                        {({ handleChange, values }) => (
                            <Form className="flex flex-col items-stretch pt-3 md:pt-8">
                                {!values.email && !values.password && !forgotPassword && (
                                    <span className="text-red-500 mb-2">Please fill out all required fields correctly.</span>
                                )}

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

                                {!forgotPassword && (
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
                                            className="absolute right-0 flex items-center p-2"
                                        >
                                            {showPassword ? (
                                                <span>&#128065;</span>
                                            ) : (
                                                <span>&#128065;&#8205;&#128488;</span>
                                            )}
                                        </button>
                                        <ErrorMessage name="password" component="div" className="text-red-500" />
                                    </div>
                                )}

                                {checkEmail && (
                                    <p className='text-lg text-blue-400'>{checkEmail}</p>
                                )}

                                <div className='flex gap-4 p-2'>
                                    {!forgotPassword ? (
                                        <>
                                            <button
                                                type="submit"
                                                className="mt-6 w-20 rounded-lg bg-blue-600 px-4 py-2 text-center text-base font-semibold text-white shadow-md outline-none ring-blue-500 ring-offset-2 transition hover:bg-blue-700 focus:ring-2 md:w-32"
                                            >
                                                Log in
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => setForgotPassword(true)}
                                                className="mt-6 rounded-lg bg-gray-600 px-4 py-2 text-center text-base font-semibold text-white shadow-md outline-none ring-gray-500 ring-offset-2 transition hover:bg-gray-700 focus:ring-2 md:w-40"
                                            >
                                                Forgot Password
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            type="submit"
                                            className="mt-6 w-20 rounded-lg bg-blue-600 px-4 py-2 text-center text-base font-semibold text-white shadow-md outline-none ring-blue-500 ring-offset-2 transition hover:bg-blue-700 focus:ring-2 md:w-64"
                                        >
                                            Request Password Reset
                                        </button>
                                    )}
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default Login;


