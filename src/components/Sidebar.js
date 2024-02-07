
import React from 'react'
import { useState } from 'react';
import {
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
  } from 'cdbreact';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";


function Sidebar() {

    const navigate = useNavigate()
    const token = localStorage.getItem('jwt-token');

    const user = jwtDecode(token)

    const user_name = (user.sub).split('@')

    console.log(user_name)

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const handleSidebarOpen = () => {
      setSidebarOpen(true);
      handleOver()
    };

    const handleSidebarClose = () => {
      setSidebarOpen(false);
      handleOut()
    };
    

    const [isActive, setIsActive] = useState(false);
    function handleOver(){
      setIsActive(true)
    }

    function handleOut(){
        setIsActive(false)
    }

    function Logout(){
        fetch("/logout", {
            method: "DELETE",
        })

        navigate("/loginpage", {replace: true})
    }

    return (
        <div className='sidebar' onMouseLeave={handleSidebarClose}>
            {!sidebarOpen ? (
                <div onMouseEnter={handleSidebarOpen} onMouseLeave={handleOut}>
                    
                    <CDBSidebarContent className="sidebar-content">
                        <CDBSidebarMenu id = 'sidebar-menu'>
                            <CDBSidebarMenuItem id= 'sidebar-items' icon="user"></CDBSidebarMenuItem>
                            <CDBSidebarMenuItem id= 'sidebar-items' icon="search" onClick={Logout}></CDBSidebarMenuItem>
                            <NavLink to="/home">
                                <CDBSidebarMenuItem id= 'sidebar-items' icon="home"></CDBSidebarMenuItem>
                            </NavLink>
                            <NavLink to="/my-watchlist">
                                <CDBSidebarMenuItem id= 'sidebar-items' icon="film"></CDBSidebarMenuItem>
                            </NavLink>
                            <CDBSidebarMenuItem id= 'sidebar-items' icon="times" onClick={Logout}></CDBSidebarMenuItem>
                        </CDBSidebarMenu>
                    </CDBSidebarContent>                   
                </div>
            ) : (
                <div style={{marginRight: '50px'}}>  
                  
                    <CDBSidebarContent className="sidebar-content">
                        <CDBSidebarMenu id = 'sidebar-menu'>
                            <CDBSidebarMenuItem id= 'sidebar-items' icon="user">{`Welcome ${user_name[0]}`}</CDBSidebarMenuItem>
                            <CDBSidebarMenuItem id= 'sidebar-items' icon="search" onClick={Logout}>Search</CDBSidebarMenuItem>
                            <NavLink to="/home">
                                <CDBSidebarMenuItem id= 'sidebar-items' icon="home">Home</CDBSidebarMenuItem>
                            </NavLink>
                            <NavLink to="/my-watchlist">
                                <CDBSidebarMenuItem id= 'sidebar-items' icon="film">My WatchList</CDBSidebarMenuItem>
                            </NavLink>
                            <CDBSidebarMenuItem id= 'sidebar-items' icon="times" onClick={Logout}>Logout</CDBSidebarMenuItem>
                        </CDBSidebarMenu>
                    </CDBSidebarContent>
                    
                </div>
            )}
        </div>
        
    );
    
    
}

export default Sidebar