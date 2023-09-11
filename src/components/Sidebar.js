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

function Sidebar() {

    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
            <CDBSidebar textColor="#fff" backgroundColor="#333">
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                    <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
                    Menu
                    </a>
                </CDBSidebarHeader>

                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
                        <CDBSidebarMenuItem icon="user">Hello</CDBSidebarMenuItem>
                        <NavLink to="/login">
                        <CDBSidebarMenuItem icon="home">Home</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink to="/watchlist">
                        <CDBSidebarMenuItem icon="film">My WatchList</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink to="/logout">
                        <CDBSidebarMenuItem icon="times">Logout</CDBSidebarMenuItem>
                        </NavLink>
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
            <h1>Hi</h1>
        </div>
    );
    
    
}

export default Sidebar