import React, { useState, useEffect } from 'react';
import { fetchStudents, deleteStudent, addStudent, updateStudent, fetchProfile } from '../api/studentApi';
import './studentlista.css';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [newStudent, setNewStudent] = useState({ firstname: '', lastname: '', username: '', password: '' });
    const [editStudent, setEditStudent] = useState(null);
    const [userProfile, setUserProfile] = useState(null);  

    useEffect(() => {
        const loadProfile = async () => {
            const profile = await fetchProfile();
            if (profile) {
                setUserProfile(profile);  
            }
        };
        loadProfile();
    }, []);

    useEffect(() => {
        const loadStudents = async () => {
            const data = await fetchStudents();
            setStudents(data);
        };

        loadStudents();
    }, []);

    const handleDelete = async (id) => {
        await deleteStudent(id);
        setStudents(students.filter((student) => student.id !== id));
    };

    const handleAdd = async () => {
        const addedStudent = await addStudent(newStudent);
        setStudents([...students, addedStudent]);
        setNewStudent({ firstname: '', lastname: '', username: '', password: '' });
    };

    const handleEdit = async (id) => {
        const updatedStudent = await updateStudent(id, editStudent);
        setStudents(students.map((student) => (student.id === id ? updatedStudent : student)));
        setEditStudent(null);
    };

    return (
        <div>
            { }
            {userProfile ? (
                <h2 id='h2'>Hello, {userProfile.firstname}!</h2>
            ) : (
                <h2>Loading profile...</h2>
            )}

            <h2>Student List</h2>
            <ul>
                {students.map((student) => (
                    <li key={student.id}> {/* Proveri da student.id postoji */}
                        {student.firstname} {student.lastname} - {student.username} - {student.password}
                        <button id='button1' onClick={() => handleDelete(student.id)}>Delete</button>
                        <button id='button1' onClick={() => setEditStudent(student)}>Edit</button>
                    </li>
                ))}
            </ul>

            <h3>Add New Student</h3>
            <input
                type="text"
                placeholder="First Name"
                value={newStudent.firstname}
                onChange={(e) => setNewStudent({ ...newStudent, firstname: e.target.value })}
            />
            <input
                type="text"
                placeholder="Last Name"
                value={newStudent.lastname}
                onChange={(e) => setNewStudent({ ...newStudent, lastname: e.target.value })}
            />
            <input
                type="text"
                placeholder="Username"
                value={newStudent.username}
                onChange={(e) => setNewStudent({ ...newStudent, username: e.target.value })}
            />
            <input
                type="text"
                placeholder="Password"
                value={newStudent.password}
                onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value })}
            />
            <button onClick={handleAdd}>Add Student</button>

            {editStudent && (
                <div>
                    <h3>Edit Student</h3>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={editStudent.firstname}
                        onChange={(e) => setEditStudent({ ...editStudent, firstname: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={editStudent.lastname}
                        onChange={(e) => setEditStudent({ ...editStudent, lastname: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Username"
                        value={editStudent.username}
                        onChange={(e) => setEditStudent({ ...editStudent, username: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Password"
                        value={editStudent.password}
                        onChange={(e) => setEditStudent({ ...editStudent, password: e.target.value })}
                    />
                    <button onClick={() => handleEdit(editStudent.id)}>Save Changes</button>
                    <button onClick={() => setEditStudent(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default StudentList;
