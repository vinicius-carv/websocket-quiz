import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { t } from "i18next";
import { useNavigate } from 'react-router-dom';

const CreateQuiz = () => {
    const navigate = useNavigate();
    const initialValues = {
        title: '',
        description: '',
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('Required'),
    });

    const onSubmit = async (values, { setSubmitting, setStatus }) => {
        try {
            const response = await axios.post('http://localhost:5000/api/quiz/', values);
            const newQuizId = response.data.id;

            console.log("Quiz: ",response.data);

            if ((response.status === 200 || response.status === 201) && newQuizId) {
                navigate(`/quiz?id=${newQuizId}`);
            } else {
                setStatus('Failed to retrieve the new quiz ID');
            }
        } catch (error) {
            console.error(error);
            setStatus(error.response?.data?.message || 'An error occurred');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container align-self-center">
            <h1>{t('CreateQuiz')}</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ isSubmitting, status }) => (
                    <Form className="form-container d-flex flex-column p-3 gap-3 border-2">
                        <div className="d-flex flex-column align-items-start">
                            <label htmlFor="title">Quiz Title</label>
                            <Field type="text" id="title" name="title" />
                            <ErrorMessage name="title" component="div" />
                        </div>
                        <div className="d-flex flex-column align-items-start">
                            <label htmlFor="description">Description</label>
                            <Field type="text" id="description" name="description" />
                        </div>

                        <button type="submit" disabled={isSubmitting}>
                            {t('CreateQuiz')}
                        </button>
                        {status && <div>{status}</div>}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CreateQuiz;
