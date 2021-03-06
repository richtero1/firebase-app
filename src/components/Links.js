import React, { useEffect, useState } from 'react'

import LinkForm from './LinkForm'

import { db } from '../firebase'

const Links = () => {
    
    const [t, setT] = useState(0);

    const [employees, setLinks] = useState([]);
    const [currentId, setCurrentId] = useState('');

    const addOrEditDoc = (docObject) => {
        let t1, t2 = 0;
        try {
            if (currentId === '') {
                t1 = performance.now();
                db.collection('employees').doc().set(docObject);
                t2 = performance.now();
            } else {
                t1 = performance.now();
                db.collection('employees').doc(currentId).update(docObject);
                t2 = performance.now();
                setCurrentId('');
            }
        } catch (error) {
            console.error(error);
        }
        setT(t2 - t1);
    }

    const onDeleteDoc = (id) => {
        let t1,t2 = 0;
        t1= performance.now();
        db.collection('employees').doc(id).delete();
        t2 = performance.now();
        setT(t2 - t1);
    }

    const query = () => {
        let t1,t2 = 0;
        t1 = performance.now();
        db.collection('employees').where('city', '==', 'Miami').where('department', '==', 'Engineering')
        .onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach(doc => {
                docs.push({ ...doc.data(), id: doc.id });
            });
            setLinks(docs); 
        });
        t2 = performance.now(); 
        setT(t2 - t1); 
    };

    const getDocs = () => {
        db.collection('employees').onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach(doc => {
                docs.push({ ...doc.data(), id: doc.id });
            });
            setLinks(docs);
        });
    };

    

    useEffect(() => {
        getDocs();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <div className="container-fluid">
                <nav className="navbar navbar-expand-sm bg-light">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <h2>App</h2>
                        </li>
                        <li className="nav-item">

                        </li>
                        <li className="nav-item">


                        </li>
                    </ul>
                </nav>
            </div>
            <div className="container p-3">
                <LinkForm {...{ addOrEditDoc, currentId, employees }} />
            </div>
            <div className="container">
                <div className="row" >
                    <div className="col-3"></div>
                    <div className="col-3 ">
                        <button type="button" className="btn btn-success " onClick={getDocs}> Obtener Todo</button>
                    </div>
                    <div className="col-1"></div>
                    <div className="col-3 text center">
                        <button type="button" className="btn btn-success " onClick={query}> Ejecutar prueba</button>
                    </div>
                    <div className="col-2"></div>
                </div>


            </div>
            <div className="container">
                <h1>tiempo de respuesta de tarea: {t.toFixed(3)} ms.</h1>
                <br />
                <table className="table table-striped table-responsive">
                    <thead >
                        <tr>
                            <th scope="col">First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Birthdate</th>
                            <th>Gender</th>
                            <th>SSN</th>
                            <th>Num. Telefono</th>
                            <th>Dept.</th>
                            <th>Ciudad</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(employees => (
                            <tr key={employees.id}>
                                <td>{employees.first_name}</td>
                                <td>{employees.last_name}</td>
                                <td>{employees.email}</td>
                                <td>{employees.birthdate}</td>
                                <td>{employees.gender}</td>
                                <td>{employees.ssn}</td>
                                <td>{employees.phone_number}</td>
                                <td>{employees.department}</td>
                                <td>{employees.city}</td>
                                <td>{employees.state}</td>
                                <td>
                                    <i className="material-icons text-danger p-2" onClick={() => onDeleteDoc(employees.id)}>close</i>
                                    <i className="material-icons p-2" onClick={() => setCurrentId(employees.id)}>create</i>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default Links;