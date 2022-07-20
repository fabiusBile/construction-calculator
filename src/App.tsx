import React, {useEffect} from 'react';
import {
    AppBar,
    Box,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
    Toolbar,
    Typography,
    useTheme
} from "@mui/material";
import {NavLink, Route, Routes, useLocation,} from "react-router-dom";
import VolumetricLightLetters from "./pages/VolumetricLightLetters";
import MenuIcon from '@mui/icons-material/Menu';
import {ArrowBack} from "@mui/icons-material";
import ContourLightLetters from "./pages/ContourLightLetters";
import LightSideLetters from "./pages/LightSideLetters";

interface PageComponent {
    name: string,
    component: JSX.Element
}

const pages: Record<string, PageComponent> = {
    "/": {
        name: "Объемные световые буквы",
        component: <VolumetricLightLetters/>
    },
    "/contour": {
        name: "Световые буквы с контурной подсветкой",
        component: <ContourLightLetters />
    },
    "/lightside": {
        name: "Световой торец",
        component: <LightSideLetters />
    },
}

function App() {

    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState("/")
    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen)
    }
    const theme = useTheme();
    const drawerWidth = 250;
    const location = useLocation();

    useEffect(() => {
        setCurrentPage(location.pathname)
    }, [location]);

    return (
        <Box>
            <AppBar
                position="fixed"
                sx={{
                    width: drawerOpen ? `calc(100% - ${drawerWidth}px)` : "100%",
                    ml: drawerOpen ? `${drawerWidth}px` : 0,
                    transition: theme.transitions.create(['margin', 'width'], {
                        easing: theme.transitions.easing.easeOut,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{mr: 2}}
                    >
                        {drawerOpen ? <ArrowBack/> : <MenuIcon/>}
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {pages[currentPage].name}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={drawerOpen}
            >
                <List>
                    {Object.entries(pages).map(([link, {name}], i) => (
                        <ListItemButton component={NavLink} to={link} key={i} selected={currentPage === link}>
                            <ListItemText>{name}</ListItemText>
                        </ListItemButton>
                    ))}
                </List>
            </Drawer>
            <Box sx={{
                ml: drawerOpen ? `${drawerWidth}px` : 0,
                mt: 10,
                transition: theme.transitions.create(['margin'], {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            }}>
                    <Routes>
                        {
                            Object.entries(pages).map(([link, {component}], i) => (
                                <Route path={link} element={component} key={i}/>
                            ))
                        }
                    </Routes>
            </Box>
        </Box>
    )
}

export default App;
