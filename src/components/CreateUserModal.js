import React from "react";
import {Drawer, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {addUser} from "../actions/users/userSlice";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { Formik } from 'formik';

const userRoles = ['Super Admin', 'Editor', 'Publisher', 'Manager'];
const CreateProfileSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required').max(8),
    lastName: Yup.string().required('Last name is required').max(8),
    email: Yup.string().required('Email is required').email('Must be a valid email'),
    role: Yup.string().required('Role is required'),
});

export const CreateUserModal = ({isOpen, closeModal}) => {
    const dispatch = useDispatch();

    const handleSubmit = (values) => {
        dispatch(addUser({...values}));
        closeModal()
    }

    return (
        <Drawer
            anchor="right"
            open={isOpen}
        >
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: 24, marginRight: 24,}}>
                <h2>Ավելացնել Ադմին</h2>
                <button onClick={() =>  closeModal()}>X</button>
            </div>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    role: '',
                }}
                enableReinitialize={true}
                onSubmit={handleSubmit}
                validationSchema={CreateProfileSchema}
            >
                {
                    (formProps) => {
                        const { values, handleChange, isValid, dirty } = formProps;
                        return(
                            <>
                                <TextField
                                    margin="normal"
                                    label="Անուն *"
                                    id="name"
                                    size="small"
                                    name="firstName"
                                    onChange={handleChange}
                                    value={values.firstName}
                                    style={{ marginLeft: 24, marginRight: 24, width: 386}}
                                />
                                <TextField
                                    margin="normal"
                                    label="Ազգանուն *"
                                    id="name"
                                    size="small"
                                    name="lastName"
                                    onChange={handleChange}
                                    value={values.lastName}
                                    style={{ marginLeft: 24, marginRight: 24, width: 386}}
                                />
                                <TextField
                                    margin="normal"
                                    label="Էլ․ Փոստ *"
                                    id="name"
                                    size="small"
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    value={values.email}
                                    style={{ marginLeft: 24, marginRight: 24, width: 386}}
                                />
                                <InputLabel id="role" style={{ marginLeft: 24 }}>Դեր *</InputLabel>
                                <Select
                                    size="small"
                                    labelId="role"
                                    id="role"
                                    name="role"
                                    onChange={handleChange}
                                    value={values.role}
                                    label="Դեր *"
                                    style={{ marginLeft: 24, marginRight: 24, width: 386}}
                                >
                                    {userRoles.map((role) => {
                                        return (
                                            <MenuItem key={role} value={role}>{role}</MenuItem>
                                        )
                                    })}
                                </Select>
                                <div style={{display: "flex", marginLeft: 24, marginTop: 24}}>
                                    <button
                                        disabled={!(isValid && dirty)}
                                        onClick={() => {
                                            handleSubmit(values)
                                        }}
                                        style={{marginRight: 16, border: 'none', backgroundColor: '#218CFF'}}>Ավելացնել</button>
                                    <button onClick={() =>  closeModal()}>Չեղարկել</button>
                                </div>
                            </>
                        )
                    }
                }
            </Formik>
        </Drawer>
    )
}