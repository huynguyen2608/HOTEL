import React from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import KingBedIcon from '@mui/icons-material/KingBed';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BarChartIcon from '@mui/icons-material/BarChart';
import { ListItem } from "@mui/material";
import Orders from "../../../Modules/Orders/Orders";
import { goTo } from "../../../Constances/Util";
import Rooms from "../../../Modules/Rooms/Rooms";
import Customers from "../../../Modules/Customers/Customers";
import Report from "../../../Modules/Report/Report";
import Users from "../../../Modules/User/User";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PrintForm from "../PrintForm/PrintForm";

const drawerWidth = 240;

/// drawer menu

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

//// tab 

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
};

const drawerArr = [
    {
        name: 'Orders',
        src: 'order'
    },
    {
        name: 'Customers',
        src: 'customer'
    }
    ,
    {
        name: "Users",
        src: "user"
    },
    {
        name: 'Rooms',
        src: 'room'
    },
    {
        name: "Report",
        src: "report"
    }
]


function AdminPage(props) {
    const { path } = props.match;
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const [value, setValue] = React.useState();

    const getDataSession = JSON.parse(sessionStorage.getItem('user'))

    const customer = getDataSession?.customer

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleChange = (newValue) => {
        setValue(newValue);
    };
    const checkIcont = (type) => {
        switch (type) {
            case 0:
                return (<HomeRepairServiceIcon></HomeRepairServiceIcon>);
            case 1:
                return (<PeopleAltIcon></PeopleAltIcon>);
            case 2:
                return (<AssignmentIndIcon></AssignmentIndIcon>);
            case 3:
                return (<KingBedIcon></KingBedIcon>);
            case 4:
                return (  <BarChartIcon></BarChartIcon> );

            default:
                break;
        }
    }
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Quản lí khách sạn Phương Đông
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {drawerArr.map((text, index) => {
                        
                        if(index === 4 ){
                            if(customer.role === 'admin'){
                                return  <ListItemButton
                                key={text}
                                onClick={() => (handleChange(index), goTo(`admin/${text.src}`))}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {checkIcont(index)}
                                </ListItemIcon>
                                <ListItemText primary={text.name} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                            }
                            else{
                                return null
                            }
                          
                        }
                       else{
                        return  <ListItemButton
                        key={text}
                        onClick={() => (handleChange(index), goTo(`admin/${text.src}`))}
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            {checkIcont(index)}
                        </ListItemIcon>
                        <ListItemText primary={text.name} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                       }
                    }
                    )}
                </List>
                <Divider />
                <List>
                    <ListItem className="pointer" onClick={() => { goTo('app/') }}>
                        <ListItemIcon>
                            <ArrowBackIcon></ArrowBackIcon>
                        </ListItemIcon>
                        <ListItemText primary={'Home page'} />
                    </ListItem>
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <Switch>
                    <Route exact path={`${path}`} render={() => {
                        return <Redirect to="/admin" ></Redirect>
                    }} />
                    <Route path={`${path}/order`} component={Orders} />
                    <Route path={`${path}/customer`} component={Customers} />
                    <Route path={`${path}/room`} component={Rooms} />
                    { customer.role === 'admin' ? <Route path={`${path}/report`} component={Report} /> : null}
                    <Route path={`${path}/user`} component={Users} />
                    <Route path={`${path}/print`} component={PrintForm} />
                </Switch>

            </Box>
        </Box>
    );

}

export default withRouter(AdminPage);
