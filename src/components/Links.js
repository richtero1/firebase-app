import React, { useEffect, useState } from 'react'
import LinkForm from './LinkForm'

import { db } from '../firebase'

const Links = () => {

    let t1;
    let t2;
    const[t, setT] = useState(0);

    const [links, setLinks] = useState([]);
    const [currentId, setCurrentId] = useState('');

    const addOrEditLink = async (linkObject) => {
        try {
            if (currentId === '') {
                await db.collection('links').doc().set(linkObject);
                console.log('new task added');
            } else {
                db.collection('links').doc(currentId).update(linkObject);
                setCurrentId('');
            }
        } catch (error) {
            console.error(error);
        }


    }

    const onDeleteLink = async (id) => {
        await db.collection('links').doc(id).delete();
        console.log('task deleted')
    }

    const getLinks = async () => {

        t1 = performance.now();
        //querySnapshot es la respuesta de firebase
        db.collection('links').onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach(doc => {
                docs.push({ ...doc.data(), id: doc.id });
            });
            setLinks(docs);
        });

        t2 = performance.now();
        t1 = t1.toFixed(3);
        console.log(t1);

        t2 = t2.toFixed(3);
        console.log(t2);

        setT(t2-t1);
        
        console.log(t2-t1);
        
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
                <LinkForm {...{ addOrEditLink, currentId, links }} />
            </div>

            <div className="container">
                <h1>tiempo de respuesta de lectura: {t.toFixed(3)} ms.</h1>
                <br/>
                <table className="table table-striped">
                    <thead >
                        <tr>
                            <th scope="col">Website Name</th>
                            <th>Url</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {links.map(link => (
                            <tr key={link.id}>
                                <td>{link.name}</td>
                                <td>{link.url}</td>
                                <td>{link.description}</td>
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