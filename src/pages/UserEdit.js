import React, {useEffect, useState} from "react";
import { useDashboardStyles } from "../styles/useDashboardStyles";
import LeftNavbar from "../components/LeftNavbar";
import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import * as Yup from 'yup';
import { Formik } from 'formik';
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectUsers, editUser} from "../actions/users/userSlice";
const EditProfileSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required').max(8),
    lastName: Yup.string().required('Last name is required').max(8),
    email: Yup.string().required('Email is required').email('Must be a valid email'),
    role: Yup.string().required('Role is required'),
    status: Yup.string().required('Status is required'),
});

const UserEdit = () => {
    let { id } = useParams();
    const allUsers = useSelector(selectUsers);
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const [currentUser, setCurrentUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        role: '',
        status: '',
    })

    useEffect(() => {
        if (id){
            const user = allUsers.find((item) => item.id === id)
            setCurrentUser(user);
        }
    },[id, allUsers])

    const classes = useDashboardStyles();
    const userRoles = ['Super Admin', 'Editor', 'Publisher', 'Manager'];
    const userStatuses = ['Active', 'Inactive', 'Unconfirmed'];

    const handleSubmit = (values) => {
        dispatch(editUser({id: currentUser.id, ...values}));
        navigate('/')
    }

    return (
        <>
            <div className={classes.pageContentWrapper}>
                <LeftNavbar />
                <div className={classes.tableWrapper}>
                    <div className={classes.tableHeader}>
                        <h3>Էդգար Սիմոնյան</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                        <Formik
                            initialValues={{
                                firstName: currentUser.firstName,
                                lastName: currentUser.lastName,
                                email: currentUser.email,
                                role: currentUser.role,
                                status: currentUser.status
                            }}
                            enableReinitialize={true}
                            onSubmit={handleSubmit}
                            validationSchema={EditProfileSchema}
                        >
                            {
                                (formProps) => {
                                    const { values,handleChange, isValid } = formProps;
                                   return ( <>
                                        <TextField
                                            margin="normal"
                                            label="Անուն *"
                                            id="firstName"
                                            name="firstName"
                                            size="small"
                                            onChange={handleChange}
                                            value={values.firstName}
                                            style={{ marginLeft: 24, marginRight: 24, width: 386}}
                                        />
                                        <TextField
                                            name="lastName"
                                            margin="normal"
                                            label="Ազգանուն *"
                                            id="lastName"
                                            size="small"
                                            onChange={handleChange}
                                            value={values.lastName}
                                            style={{ marginLeft: 24, marginRight: 24, width: 386}}
                                        />
                                       <TextField
                                           margin="normal"
                                           label="Էլ․ Փոստ *"
                                           id="email"
                                           name="email"
                                           size="small"
                                           type="email"
                                           onChange={handleChange}
                                           value={values.email}
                                           style={{ marginLeft: 24, marginRight: 24, width: 386}}
                                       />
                                        <InputLabel style={{ marginLeft: 24 }} id="role">Դեր *</InputLabel>
                                        <Select
                                            size="small"
                                            labelId="role"
                                            id="role"
                                            name="role"
                                            defaultValue={currentUser.role}
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
                                        <InputLabel style={{ marginLeft: 24 }} id="status">Կարգավիճակ</InputLabel>
                                        <Select
                                            size="small"
                                            labelId="status"
                                            id="status"
                                            name="status"
                                            onChange={handleChange}
                                            value={values.status}
                                            label="Կարգավիճակ"
                                            style={{ marginLeft: 24, marginRight: 24, width: 386}}
                                        >
                                            {userStatuses.map((status) => {
                                                return (
                                                    <MenuItem key={status} value={status}>{status}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                        <div style={{display: "flex", marginLeft: 24, marginTop: 24}}>
                                            <button
                                                disabled={!isValid}
                                                onClick={() => handleSubmit(values)}
                                                 style={{marginRight: 16, border: 'none', backgroundColor: '#218CFF'}}>Պահպանել</button>
                                            <button>Չեղարկել</button>
                                        </div>
                                    </>)
                                }
                            }
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserEdit;