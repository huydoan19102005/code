import React from 'react';
import { Container } from 'react-bootstrap'; 
import NavigationHeader from '../components/NavigationHeader';
import FilterBar from '../components/FilterBar';
import PaymentTable from '../components/PaymentTable';

const DashboardPage = () => {
    return (
        <>
            {/* 1. Header (Navigation Bar) */}
            <NavigationHeader />
            {/* 2. Main Dashboard Content */}
            <Container>
                <FilterBar />
                <PaymentTable />
            </Container>    
        </>
    );
};

export default DashboardPage;

