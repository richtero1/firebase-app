import React, { useEffect, useState } from 'react'
import LinkForm from './LinkForm'

import { db } from '../firebase'

const Links = () => {

    let t1;
    let t2;
    const [t, setT] = useState(0);

    const [employees, setLinks] = useState([]);
    const [currentId, setCurrentId] = useState('');


    const addOrEditLink = async (linkObject) => {
        try {
            if (currentId === '') {
                t1 = performance.now();
                await db.collection('employees').doc().set(linkObject);
                console.log('new task added');
                t2 = performance.now();
            } else {
                db.collection('employees').doc(currentId).update(linkObject);
                setCurrentId('');
            }
        } catch (error) {
            console.error(error);
        }

        setT(t2 - t1);
        console.log(t2 - t1);
    }

    const onDeleteLink = async (id) => {
        t1= performance.now();
        await db.collection('employees').doc(id).delete();
        t2 = performance.now();
        setT(t2 - t1);
    }

    const getLinks = async () => {

        t1 = performance.now();
        //querySnapshot es la respuesta de firebase
        db.collection('employees').onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach(doc => {
                docs.push({ ...doc.data(), id: doc.id });
            });
            setLinks(docs);
        });
        t2 = performance.now();
        setT(t2 - t1);
        console.log(t2 - t1);
    };

    const query = async () => {

        t1 = performance.now();
        //querySnapshot es la respuesta de firebase
        db.collection('employees').where('city', '==', 'Pensacola').onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach(doc => {
                docs.push({ ...doc.data(), id: doc.id });
            });
            setLinks(docs);
        });
        t2 = performance.now();
        setT(t2 - t1);
        console.log(t2 - t1);
    };

    useEffect(() => {
        getLinks();
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
                <LinkForm {...{ addOrEditLink, currentId, employees }} />
            </div>
            <div className="container">
                <div className="row" >
                    <div className="col-3"></div>
                    <div className="col-3 ">
                        <button type="button" className="btn btn-success " onClick={getLinks}> Obtener Todo</button>
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
                        {employees.map(link => (
                            <tr key={link.id}>
                                <td>{link.first_name}</td>
                                <td>{link.last_name}</td>
                                <td>{link.email}</td>
                                <td>{link.birthdate}</td>
                                <td>{link.gender}</td>
                                <td>{link.ssn}</td>
                                <td>{link.phone_number}</td>
                                <td>{link.department}</td>
                                <td>{link.city}</td>
                                <td>{link.state}</td>
                                <td>
                                    <i className="material-icons text-danger p-2" onClick={() => onDeleteLink(link.id)}>close</i>
                                    <i className="material-icons p-2" onClick={() => setCurrentId(link.id)}>create</i>
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