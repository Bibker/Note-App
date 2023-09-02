import React, { useEffect, useState } from 'react'
import MainScreen from '../../components/MainScreen'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage';
import { Card } from 'react-bootstrap';
import ReactMarkdown from "react-markdown";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import apiBaseUrl from '../../config/api';



const EditNote = () => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [id, setId] = useState('');
    const navigate = useNavigate();

    const params = useParams();

    const config = {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${Cookies.get('auth')}`
        },
        withCredentials: true
    }


    useEffect(() => {

        const fetching = async () => {
            const { data } = await axios.get(`${apiBaseUrl}/api/notes/${params.id}`, config);
            if(!data.length)
            {
                setError("This Note doesnot exist.");
                return;
            }
            setTitle(data[0].title);
            setContent(data[0].content);
            setCategory(data[0].category);
            setId(data[0]._id);
        };

        fetching();
    }, [params.id])



    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleUpdate = async (e) => {
        // Handle the logic for creating the post, e.g., sending data to a server
        e.preventDefault();
        try {   
            setError(false);
            setLoading(true);
            const { data } = await axios.put(
                `${apiBaseUrl}/api/notes/${params.id}`,
                {
                    title,
                    category,
                    content
                },
                config
            );
            if (data) {
                setLoading(false);
                navigate("/mynotes")
            }
        } catch (error) {
            setError(error.response.data.message);
            setLoading(false);

        }
    };

    const handleDelete = async() => {
        if (window.confirm("Are you sure to remove?")) {
            await axios.delete(`/api/notes/${id}`, config)
            navigate("/mynotes");
        }
    };





    return (
        <MainScreen title="Edit Note">
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
                    <button className="btn btn-primary me-2" onClick={handleUpdate}>
                        Update
                    </button>
                    <button className="btn btn-danger" onClick={()=>handleDelete(id)}>
                        Delete
                    </button>
                </div>
            </div>

        </MainScreen>
    )
}

export default EditNote
