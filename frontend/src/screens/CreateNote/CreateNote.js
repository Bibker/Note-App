import React, { useState } from 'react'
import MainScreen from '../../components/MainScreen'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage';
import { Card } from 'react-bootstrap';
import ReactMarkdown from "react-markdown";
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';


const CreateNote = () => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleCreate = async (e) => {
        // Handle the logic for creating the post, e.g., sending data to a server
        e.preventDefault();
        console.log('Title:', title);
        console.log('Content:', content);
        console.log('Category:', category);

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${Cookies.get('auth')}`
                }
            }
            setError(false);

            setLoading(true);
            const { data } = await axios.post(
                "/api/notes/create",
                {
                    title,
                    category,
                    content
                },
                config
            );
            if (data) {
                setLoading(false);
                Navigate("/mynotes")
            }

        } catch (error) {
            setError(error.response.data.message);
            setLoading(false);

        }
    };

    const handleReset = () => {
        setTitle('');
        setContent('');
        setCategory('');
    };

    

    return (
        <MainScreen title="Create Note">
            <div className="container">
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {loading && <Loading />}
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                        Title
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={title}
                        onChange={handleTitleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">
                        Content
                    </label>
                    <textarea
                        className="form-control"
                        id="content"
                        rows="4"
                        value={content}
                        onChange={handleContentChange}
                    />
                </div>
                {content && (
                    <Card>
                        <Card.Header>Note Preview</Card.Header>
                        <Card.Body>
                            <ReactMarkdown>
                                {content}
                            </ReactMarkdown>
                        </Card.Body>
                    </Card>
                )}
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">
                        Category
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="category"
                        value={category}
                        onChange={handleCategoryChange}
                    />
                </div>
                <div className="mb-3">
                    <button className="btn btn-primary me-2" onClick={handleCreate}>
                        Create
                    </button>
                    <button className="btn btn-danger" onClick={handleReset}>
                        Reset
                    </button>
                </div>
            </div>
           
        </MainScreen>
    )
}

export default CreateNote
