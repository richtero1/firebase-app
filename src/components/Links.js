import React, {useEffect, useState} from 'react'
import LinkForm from './LinkForm'

import {db} from '../firebase'

const Links = () => {

    let t1;
    let t2;
    let t;

    const [links, setLinks] = useState([]);
    const [currentId, setCurrentId] = useState('');

    const addOrEditLink = async (linkObject) => {
        try {
            if(currentId === ''){
                await db.collection('links').doc().set(linkObject);
                console.log('new task added');
            }else{
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
                docs.push({...doc.data(), id:doc.id});
            });
            setLinks(docs);
        });

        t2 = performance.now();
        t = t2-t1;
        console.log(t);
    };

    useEffect(() => {
        getLinks();
    }, []);

    return (
        <div>
            <LinkForm {...{addOrEditLink, currentId, links}}/>
            <div className="row p-3">
                {links.map(link => (
                    <div className="col-3 mt-1 p-1" key={link.id}>
                        <div className="card mb-1" >
                            <div className="card-body"> 
                                <div className="d-flex justify-content-between">
                                    <h4>{link.name}</h4>
                                    <div>
                                        <i className="material-icons text-danger p-1" onClick={() => onDeleteLink(link.id)}>close</i>
                                        <i className="material-icons p-1" onClick={() => setCurrentId(link.id)}>create</i>
                                    </div>
                                </div>
                                <p>{link.description}</p>
                                <p>{link.url}</p>
                            </div>
                        </div>
                        </div>
                ))}
            </div>
            <h1>tiempo de respuesta: {t}</h1>
        </div>
    )
};

export default Links;