import React, { useState, useEffect } from 'react';
import api from '../api';
import { Button, Table, Alert, Form, FormControl } from 'react-bootstrap';

const StudentList = ({ onEdit, refreshKey }) => {
    const [students, setStudents] = useState([]);
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState(''); 

    
    
    const fetchStudents = async () => {
        try {
            
            const searchParam = searchTerm ? `?search=${searchTerm}` : '';
            const response = await api.get(`students/${searchParam}`);
            setStudents(response.data);
        } catch (error) {
            console.error("Error fetching students:", error);
            setMessage("Failed to load student data.");
        }
    };

    
    useEffect(() => {
        fetchStudents();
    }, [refreshKey, searchTerm]); 

    
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this student record?")) {
            try {
                await api.delete(`students/${id}/`);
                setStudents(students.filter(student => student.id !== id));
                setMessage("Student successfully deleted! ✅");
                setTimeout(() => setMessage(''), 3000);
            } catch (error) {
                console.error("Error deleting student:", error);
                setMessage("Failed to delete student.");
            }
        }
    };

    return (
        <div className="mt-4">
            <h2>Registered Students</h2>
            {message && <Alert variant={message.includes('success') || message.includes('deleted') ? 'success' : 'danger'}>{message}</Alert>}
            
            {}
            <Form className="d-flex mb-3">
                <FormControl
                    type="search"
                    placeholder="Search by name, course, or email..."
                    className="me-2"
                    aria-label="Search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </Form>
            {}
            
            {students.length === 0 && searchTerm === '' ? (
                 <Alert variant="info">No student records found. Add a new student above.</Alert>
            ) : students.length === 0 && searchTerm !== '' ? (
                <Alert variant="warning">No students found matching your search term: <strong>{searchTerm}</strong>.</Alert>
            ) : (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Course</th>
                            <th>Marks</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student.id}>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>{student.course}</td>
                                <td>{student.marks}</td>
                                <td className="text-center">
                                    <Button variant="primary" size="sm" onClick={() => onEdit(student)}>Edit</Button>{' '}
                                    <Button variant="danger" size="sm" onClick={() => handleDelete(student.id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default StudentList;
