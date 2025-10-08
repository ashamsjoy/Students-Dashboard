import React, { useState, useEffect } from 'react';
import api from '../api';
import { Form, Button, Card, Alert } from 'react-bootstrap';


const StudentForm = ({ currentStudent, onFormSubmit }) => {
    
    const initialState = { name: '', email: '', course: '', marks: '' };
    const [formData, setFormData] = useState(initialState);
    const [message, setMessage] = useState('');

    
    useEffect(() => {
        if (currentStudent) {
            
            setFormData({
                ...currentStudent, 
                marks: String(currentStudent.marks) 
            });
        } else {
            setFormData(initialState); 
        }
    }, [currentStudent]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        
        if (!formData.name || !formData.email || !formData.course || !formData.marks) {
            setMessage("All fields are required.");
            return;
        }

        try {
            if (currentStudent) {
               
                await api.put(`students/${currentStudent.id}/`, formData);
                setMessage("Student updated successfully! ✨");
            } else {
               
                await api.post('students/', formData);
                setMessage("Student added successfully! 🎉");
            }
            
            
            setFormData(initialState);
            onFormSubmit(); 
            setTimeout(() => setMessage(''), 3000);

        } catch (error) {
            console.error("API Error:", error.response || error);
            let errorMsg = "An error occurred during save. Check server logs.";
            if (error.response && error.response.data) {
                
                if (typeof error.response.data === 'object') {
                    errorMsg = Object.entries(error.response.data)
                        .map(([field, msgs]) => `${field}: ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`)
                        .join(' | ');
                } else if (typeof error.response.data === 'string') {
                    errorMsg = error.response.data;
                }
            }
            setMessage(errorMsg);
        }
    };

    return (
        <Card className="p-4 mb-4">
            <Card.Title>{currentStudent ? 'Edit Student Details' : 'Add New Student'}</Card.Title>
            {message && <Alert variant={message.includes('success') || message.includes('added') ? 'success' : 'danger'}>{message}</Alert>}
            
            <Form onSubmit={handleSubmit}>
                {}
                {['name', 'email', 'course'].map(field => (
                    <Form.Group className="mb-3" key={field}>
                        <Form.Label style={{ textTransform: 'capitalize' }}>{field}</Form.Label>
                        <Form.Control 
                            type={field === 'email' ? 'email' : 'text'} 
                            name={field} 
                            value={formData[field]} 
                            onChange={handleChange} 
                            required
                        />
                    </Form.Group>
                ))}

                <Form.Group className="mb-3">
                    <Form.Label>Marks</Form.Label>
                    <Form.Control 
                        type="number" 
                        name="marks" 
                        step="0.01" 
                        value={formData.marks} 
                        onChange={handleChange} 
                        required
                    />
                </Form.Group>
                
                <Button variant="success" type="submit">
                    {currentStudent ? 'Update Student' : 'Add Student'}
                </Button>
                
                {currentStudent && (
                    <Button variant="secondary" className="ms-2" onClick={() => onFormSubmit(false)}>
                        Cancel Edit
                    </Button>
                )}
            </Form>
        </Card>
    );
};

export default StudentForm;
