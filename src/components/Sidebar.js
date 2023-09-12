import React from 'react'
import { useState } from 'react';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
  } from 'cdbreact';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Sidebar() {

    const navigate = useNavigate()

    function Logout(){
        navigate("/login", {replace: true})
    }

    return (
        <div style={{height: '100vh', overflow: 'scroll initial' }}>
            <CDBSidebar textColor="#fff" backgroundColor="#333">
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                    <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
                    Menu
                    </a>
                </CDBSidebarHeader>

                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
                        <CDBSidebarMenuItem icon="user">Hello</CDBSidebarMenuItem>
                        <NavLink to="/movies">
                        <CDBSidebarMenuItem icon="home">Home</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink to="/watchlist">
                        <CDBSidebarMenuItem icon="film">My WatchList</CDBSidebarMenuItem>
                        </NavLink>
                        <CDBSidebarMenuItem icon="times" onClick={Logout}>Logout</CDBSidebarMenuItem>
                    </CDBSidebarMenu>
                </CDBSidebarContent>

                <CDBSidebarFooter style={{ textAlign: 'center' }}>
                <div
                    className="sidebar-btn-wrapper"
                    style={{
                    padding: '20px 5px',
                    }}
                >
                    Project by Ron Mwangi
                </div>
                </CDBSidebarFooter>
            </CDBSidebar>
        </div>
    );
    
    
}

export default Sidebar