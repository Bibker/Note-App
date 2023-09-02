import MainScreen from "../../components/MainScreen"
import { Link } from "react-router-dom"
import { Accordion, AccordionButton, AccordionCollapse, Badge, Button, Card } from "react-bootstrap"
import AccordionItem from "react-bootstrap/esm/AccordionItem"
import { useEffect, useState } from "react"
import axios from "axios";
import Cookies from 'js-cookie';
import Loading from "../../components/Loading"
import ErrorMessage from "../../components/ErrorMessage"
import apiBaseUrl from "../../config/api"

const MyNotes = ({search}) => {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState(null);
  const [remove, setRemove] = useState(false);
  const config = {
    headers: {
      Authorization: `Bearer ${Cookies.get('auth')}`
    },
    withCredentials: true
  }

  const fetchNotes = async () => {
    const { data } = await axios.get(`${apiBaseUrl}/api/notes`, config)
    console.log(data);
    if(data.length> 0)
      setNotes(data)
    else
      setError("No Notes Found.");
    setLoading(false);
    
      
  }

  const getUser = () => {
    // setLoading(false);
    if (Cookies.get('user')) {
      const userFromCookie = JSON.parse(Cookies.get('user'));
      setUser(userFromCookie);
    } else {
      setLoading(true);
      setError("Please, Login to view notes!")
    }

  }

  const handleDelete= async(id)=> {
    setRemove(false);
    setLoading(true);
    if(window.confirm("Are you sure to remove?"))
    {
      await axios.delete(`${apiBaseUrl}/api/notes/${id}`, config)
      setRemove(true);
    }
    else
      setLoading(false);
    
  }

  useEffect(() => {
    fetchNotes();
    getUser();

  }, [remove])

  return (
    <MainScreen title={loading ? '':`Welcome Back ${user.name}  !`}>

      <Link to={loading ? "/login" :"/createnote"}>
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          {loading ? 'Go Back to Login' : "Create New Note"}
        </Button>
      </Link>
      {loading && <Loading />}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {notes.reverse().filter(filteredNote=>(
        filteredNote.title.toLowerCase().includes(search.toLowerCase())
      )).map((note) => (
        <Accordion key={note._id}>
          <AccordionItem eventKey="0">
            <Card style={{ margin: 10 }}>
              <Card.Header style={{ display: "flex" }}>
                <span
                  style={{
                    color: "black",
                    textDecoration: "none",
                    flex: 1,
                    cursor: "pointer",
                    alignSelf: "center",
                    fontSize: 18,
                  }}
                >
                  <AccordionButton as={Card.Text} bg="link">
                    {note.title}
                  </AccordionButton>
                </span>
                <div>
                  <Button href={`/note/${note._id}`}>Edit</Button>
                  <Button
                    variant="danger"
                    className="mx-2"
                    onClick={()=>handleDelete(note._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Header>
              <AccordionCollapse eventKey="0">
                <Card.Body>
                  <h4>
                    <Badge variant="success">Category - {note.category}</Badge>
                  </h4>
                  <blockquote className="blockquote mb-0">
                    <p>{note.content}</p>
                    <footer className="blockquote-footer">
                      Created on - Date
                    </footer>
                  </blockquote>
                </Card.Body>
              </AccordionCollapse>
            </Card>
          </AccordionItem>
        </Accordion>
      ))}
      
    </MainScreen>
  );
}

export default MyNotes
