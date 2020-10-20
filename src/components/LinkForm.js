import React, { useState, useEffect } from 'react'
import { db } from '../firebase';

const LinkForm = (props) => {

    const initialStateValues = {
        first_name: '',
        last_name: '',
        email: '',
        birthdate: '',
        gender: '',
        ssn: '',
        phone_number: '',
        department: '',
        city: '',
        state: ''
    };

    const [values, setValues] = useState(initialStateValues);

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault();
        props.addOrEditDoc(values);
        setValues({ ...initialStateValues });
    }

    const getLinkById = async (id) => {
        const doc = await db.collection('employees').doc(id).get();
        setValues({ ...doc.data() });
    }

    useEffect(() => {
        if (props.currentId === '') {
            setValues({ ...initialStateValues });
        } else {
            getLinkById(props.currentId);
        }
    }, [props.currentId]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <form className="card - card-body" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col">
                    <div className="form-group input-group">
                        <div className="input-group-text bg-light">
                            <i className="material-icons">create</i>
                        </div>
                        <input type="text" className="form-control" placeholder="Primer nombre" name="first_name" onChange={handleInputChange} value={values.first_name} />
                    </div>
                    <div className="form-group input-group">
                        <div className="input-group-text bg-light">
                            <i className="material-icons">create</i>
                        </div>
                        <input type="text" className="form-control" placeholder="Apellido" name="last_name" onChange={handleInputChange} value={values.last_name} />
                    </div>
                    <div className="form-group input-group">
                        <div className="input-group-text bg-light">
                            <i className="material-icons">create</i>
                        </div>
                        <input type="text" className="form-control" placeholder="Email" name="email" onChange={handleInputChange} value={values.email} />
                    </div>
                    <div className="form-group input-group">
                        <div className="input-group-text bg-light">
                            <i className="material-icons">create</i>
                        </div>
                        <input type="text" className="form-control" placeholder="Cumpleaños" name="birthdate" onChange={handleInputChange} value={values.birthdate} />
                    </div>
                    <div className="form-group input-group">
                        <div className="input-group-text bg-light">
                            <i className="material-icons">create</i>
                        </div>
                        <input type="text" className="form-control" placeholder="Genero" name="gender" onChange={handleInputChange} value={values.gender} />
                    </div>
                </div>
                <div className="col">
                <div className="form-group input-group">
                        <div className="input-group-text bg-light">
                            <i className="material-icons">create</i>
                        </div>
                        <input type="text" className="form-control" placeholder="SSN" name="ssn" onChange={handleInputChange} value={values.ssn} />
                    </div>
                    <div className="form-group input-group">
                        <div className="input-group-text bg-light">
                            <i className="material-icons">create</i>
                        </div>
                        <input type="text" className="form-control" placeholder="Num. Telefono" name="phone_number" onChange={handleInputChange} value={values.phone_number} />
                    </div>
                    <div className="form-group input-group">
                        <div className="input-group-text bg-light">
                            <i className="material-icons">create</i>
                        </div>
                        <input type="text" className="form-control" placeholder="Dept." name="department" onChange={handleInputChange} value={values.department} />
                    </div>
                    <div className="form-group input-group">
                        <div className="input-group-text bg-light">
                            <i className="material-icons">create</i>
                        </div>
                        <input type="text" className="form-control" placeholder="Ciudad" name="city" onChange={handleInputChange} value={values.city} />
                    </div>
                    <div className="form-group input-group">
                        <div className="input-group-text bg-light">
                            <i className="material-icons">create</i>
                        </div>
                        <input type="text" className="form-control" placeholder="Estado" name="state" onChange={handleInputChange} value={values.state} />
                    </div>
                </div>
            </div>


            <button className="btn btn-success btn-block">{props.currentId === '' ? 'Save' : 'Update'}</button>
        </form>
    )
}

export default LinkForm;