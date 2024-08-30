import React, {useEffect} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useUserContext } from '../../contexts/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import { t } from "i18next";

const Login = () => {
    const { setLogged } = useUserContext();
    const navigate = useNavigate();

    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Required'),
        password: Yup.string().required('Required'),
    });

    const onSubmit = async (values, { setSubmitting, setStatus }) => {
        console.log('Submitting login form:', values);
        try {
            const response = await axios.post('http://localhost:5000/api/login', values);
            setLogged(true);
            localStorage.setItem('userId', response.data.userId);
            setStatus(response.data.message);
            navigate('/');
        } catch (error) {
            setStatus(error.response ? error.response.data.message : 'Login failed');
        }
        setSubmitting(false);
    };

    return (
        <div className="container align-self-center">
            <h1>Login</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ isSubmitting, status }) => (
                    <Form className="form-container position-relative d-flex flex-column p-3 gap-3 border-2">
                        <div className="d-flex flex-column align-items-start">
                            <label htmlFor="email">Email</label>
                            <Field type="email" id="email" name="email" />
                            <ErrorMessage name="email" component="div" />
                        </div>
                        <div className="d-flex flex-column align-items-start">
                            <label htmlFor="password">Password</label>
                            <Field type="password" id="password" name="password" />
                            <ErrorMessage name="password" component="div" />
                        </div>
                        <a href='/register'>
                            {t('register')}
                        </a>
                        <button type="submit" disabled={isSubmitting}>
                            Login
                        </button>
                        {status && <div>{status}</div>}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Login;