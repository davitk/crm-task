import { makeStyles } from '@mui/styles';

export const useDashboardStyles = makeStyles(() => ({
    pageContentWrapper: {
        display: 'grid',
        gridTemplateColumns: '260px 1fr',
        gridColumnGap: 28,
        backgroundColor: '#F8F8F8',
    },
    leftNavbarWrapper: {
        paddingRight: 16,
        paddingLeft: 16,
        height: '100vh',
        backgroundColor: '#ffffff',
    },
    adminsBtn: {
        width: 230,
        height: 42,
        background: 'transparent linear-gradient(80deg, #00459F 0%, #218CFF 100%) 0% 0% no-repeat padding-box;',
        border: 'none',
        borderRadius: 6,
        color: '#ffffff',
        display: "flex",
        alignItems: "center"
    },
    tableWrapper: {
        marginTop: 110,
        boxShadow: '0px 0px 8px #0000001A',
        marginBottom: 72,
        marginRight: 28,
    },
    tableHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    addAdminBtn: {
        width: 164,
        height: 38,
        borderRadius: 6,
        backgroundColor: '#218CFF',
        color: '#ffffff',
        border: 'none',
    },
    datePicker: {
        height: 35,
        borderRadius: 4,
        borderColor: '#0000003b',
        borderWidth: 1,
    }
}));
