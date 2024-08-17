import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { handleSubmitNewPassword } from '../../api/authApi.js'; // Ensure this function is defined in your authApi
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const navigate = useNavigate();
    const [resetStatus, setResetStatus] = useState('');
    const [showPassword, setShowPassword] = useState(false); 
   


    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };
    

    // Handler for password reset submission
    const handleSubmitPassword = async (values, { setSubmitting, setErrors }) => {
        try {
            const queryParams = new URLSearchParams(location.search);
            const token = queryParams.get('token');
            console.log(token,"tokennn")
            console.log(values,"valuess")
   
            const result = await handleSubmitNewPassword({token:token,password:values.password});

            if (result.error) {
                setResetStatus(result.error);
            } else {
                setResetStatus('Password has been reset successfully. You can now log in.');
                // Optionally navigate to login page or show a success message
                navigate('/login');
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
            <div className="flex flex-col">
                <div className="my-auto mx-auto flex flex-col justify-center px-6 pt-8 md:justify-start">
                    <p className="text-center text-2xl lg:text-3xl font-bold md:text-left md:leading-tight">Reset Your Password</p>

                    {/* Formik Form */}
                    <Formik
                        initialValues={{ password: '' }}
                        validationSchema={Yup.object({
                            password: Yup.string()
                                .min(8, 'Password must be at least 8 characters')
                                .required('Required')
                        })}
                        onSubmit={handleSubmitPassword}
                    >
                        {({ handleChange, values }) => (
                            <Form className="flex flex-col items-stretch pt-3 md:pt-8">
                                <div className="mb-4 flex flex-col pt-4 relative">
                                    <Field
                                        autoComplete="new-password"
                                        type={showPassword ? 'text' : 'password'}
                                        id="reset-password"
                                        name="password"
                                        placeholder="New Password (minimum 8 characters)"
                                        className="w-full flex-shrink appearance-none border border-gray-300 bg-white py-2 px-8 text-base text-gray-700 placeholder-gray-400 focus:outline-none md:w-64"
                                        onChange={(e) => {
                                            handleChange(e);
                                            setResetStatus(''); // Clear status message on input change
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute left-[13rem] md:left-[13.8rem] flex items-center p-2"
                                    >
                                        {showPassword ? (
                                            <span>&#128065;</span>
                                        ) : (
                                            <span>&#128065;&#8205;&#128488;</span>
                                        )}
                                    </button>
                                    <ErrorMessage name="password" component="div" className="text-red-500" />
                                </div>

                                {resetStatus && (
                                    <p className='text-lg text-blue-400'>{resetStatus}</p>
                                )}

                                <button
                                    type="submit"
                                    className="mt-6 w-36  rounded-lg bg-blue-600 px-4 py-2 text-center text-base font-semibold text-white shadow-md outline-none ring-blue-500 ring-offset-2 transition hover:bg-blue-700 focus:ring-2 md:w-60"
                                >
                                    Reset Password
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
