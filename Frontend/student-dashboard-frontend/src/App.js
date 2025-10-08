import React, { useState } from 'react';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './App.css'; // Import the new CSS file

function App() {
    const [editingStudent, setEditingStudent] = useState(null);
    // Key used to force StudentList to re-fetch data when a CRUD operation is complete
    const [refreshKey, setRefreshKey] = useState(0); 

    // Handler passed to StudentList, called when 'Edit' button is clicked
    const handleEdit = (student) => {
        setEditingStudent(student);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the form
    };

    // Handler passed to StudentForm, called after successful Add/Update or Cancel Edit
    const handleFormSubmit = (shouldRefresh = true) => {
        setEditingStudent(null); // Exit editing mode
        if (shouldRefresh) {
            setRefreshKey(prev => prev + 1); // Trigger list refresh
        }
    };

    return (
        <div
            style={{
                minHeight: '100vh',
                
                backgroundImage: "url('/sd.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <Container className="my-5">
                <h1 className="text-center text-white mb-5">📚 Student Management Dashboard</h1>

                <Row className="g-4">
                    <Col md={5} className="content-card">
                        <StudentForm 
                            currentStudent={editingStudent} 
                            onFormSubmit={handleFormSubmit} 
                        />
                    </Col>
                    <Col md={7} className="content-card">
                        <StudentList 
                            onEdit={handleEdit} 
                            refreshKey={refreshKey} 
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
