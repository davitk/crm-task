import React, { useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDashboardStyles } from "../styles/useDashboardStyles";
import LeftNavbar from "../components/LeftNavbar";
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { DataGrid } from '@mui/x-data-grid';
import { MenuItem, Select, TextField} from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import {
    deleteUser,
    selectUsers,
} from '../actions/users/userSlice';
import { Link } from "react-router-dom";
import { CreateUserModal } from "../components/CreateUserModal";

const userRoles = ['Super Admin', 'Editor', 'Publisher', 'Manager'];

const Dashboard = () => {
    const adminUsers = useSelector(selectUsers);
    const dispatch = useDispatch();
    const classes = useDashboardStyles();
    const [createAdminMenuOpen, setCreateAdminMenuOpen] = useState({
        right: false,
    })
    const [startDate, setStartDate] = useState(new Date());

    const [createAdminFormValues, setCreateAdminFormValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        role: '',
    });

    const columns = [
        {
            field: 'fullName',
            headerName: 'ԱԴՄԻՆ',
            valueGetter: (params) =>
                `${params.row.firstName || ''} ${params.row.lastName || ''}`,
            flex: 1,
        },
        {
            field: 'email',
            headerName: 'Էլ. ՓՈՍՏ',
            editable: false,
            flex: 1,
        },
        {
            field: 'role',
            headerName: 'ԴԵՐ',
            editable: false,
            flex: 1,
        },
        {
            field: 'lastLogin',
            headerName: 'ՎԵՐՋԻՆ ՄՈՒՏՔ',
            editable: false,
            flex: 1,
        },
        {
            field: 'status',
            headerName: 'ԿԱՐԳԱՎԻՃԱԿ',
            editable: false,
            flex: 1,
        },
        {
            field: 'id',
            headerName: 'ՔԱՅԼԵՐ',
            renderCell: (params) => {
                return (<div>
                        <div style={{ display: "flex", flexDirection: 'row', alignItems: 'center' }}>
                            <Link to={`/edit-user/${params.row.id}`}
                                  style={{ border: "none",
                                      backgroundColor: '#218CFF',
                                      color: '#ffffff',
                                      width: 60,
                                      height: 25,
                                      textDecoration: 'none',
                                      marginRight: 20,
                                      textAlign: 'center',
                            }}>
                                Edit
                            </Link>
                            <button
                                onClick={() => dispatch(deleteUser({id: params.row.id}))}
                                style={{ border: "none",
                                    backgroundColor: '#ff0000',
                                    color: '#ffffff',
                                    width: 60,
                                    height: 25,
                                }}>
                                Delete</button>
                        </div>
                </div>)
        },
            editable: false,
            flex: 1,
        },
    ];

    const handleAdminFormValueChange = (prop) => (event) => {
        setCreateAdminFormValues({ ...createAdminFormValues, [prop]: event.target.value });
    };

    const userStatuses = ['Active', 'Inactive', 'Unconfirmed'];

    return (
        <>
            <div className={classes.pageContentWrapper}>
                <LeftNavbar />
                <div className={classes.tableWrapper}>
                    <div className={classes.tableHeader}>
                        <h3>Ադմին Օգտատերեր</h3>
                        <button onClick={() => setCreateAdminMenuOpen({right: true})} className={classes.addAdminBtn}>Ավելացնել Ադմին</button>
                    </div>
                    <TableContainer>
                        <Table aria-label="sticky table" style={{ backgroundColor: '#ffffff'}}>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">
                                        <TextField
                                            name="firstName"
                                            placeholder="Search By Name"
                                            margin="normal"
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell align="left">
                                        <TextField
                                            name="firstName"
                                            placeholder="Search By Email"
                                            margin="normal"
                                            size="small"
                                            type="email"
                                        />
                                    </TableCell>
                                    <TableCell align="left">
                                        <Select
                                            placeholder="Search By Role"
                                            size="small"
                                            labelId="role"
                                            id="role"
                                            value={createAdminFormValues.role}
                                            onChange={handleAdminFormValueChange('role')}
                                            style={{ width: 200}}
                                        >
                                            {userRoles.map((role) => {
                                                return (
                                                    <MenuItem key={role} value={role}>{role}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </TableCell>
                                    <TableCell align="left">
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            className={classes.datePicker}
                                        />
                                    </TableCell>
                                    <TableCell align="left">
                                        <Select
                                            size="small"
                                            value={createAdminFormValues.status}
                                            onChange={handleAdminFormValueChange('status')}
                                            style={{ width: 200 }}
                                        >
                                            {userStatuses.map((status) => {
                                                return (
                                                    <MenuItem key={status} value={status}>{status}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                    </TableContainer>
                    <DataGrid
                        rows={adminUsers}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[5, 10, 20]}
                        pagination={true}
                        autoHeight={true}
                        disableColumnMenu={true}
                    />
                </div>
            </div>
            <CreateUserModal
                isOpen={createAdminMenuOpen.right}
                closeModal={() => setCreateAdminMenuOpen({right: false})}
            />
        </>
    )
}

export default Dashboard;