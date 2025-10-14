import React, { useState } from 'react';
import { Container, Card, ProgressBar, Button, Nav, Tab } from 'react-bootstrap';
import AboutForm from '../components/Account/AboutForm';
import AccountForm from '../components/Account/AccountForm';
import AddressForm from '../components/Account/AddressForm';

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const tabs = [
    { key: 'about', title: 'About', progress: 33 },
    { key: 'account', title: 'Account', progress: 67 },
    { key: 'address', title: 'Address', progress: 100 }
  ];

  const currentTabIndex = tabs.findIndex(tab => tab.key === activeTab);
  const currentProgress = tabs[currentTabIndex]?.progress || 33;

  const validateCurrentTab = () => {
    const newErrors = {};
    
    if (activeTab === 'about') {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.phone) newErrors.phone = 'Phone is required';
      if (!formData.age) newErrors.age = 'Age is required';
    } else if (activeTab === 'account') {
      if (!formData.username) newErrors.username = 'Username is required';
      if (!formData.password) newErrors.password = 'Password is required';
      if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm password is required';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!formData.secretQuestion) newErrors.secretQuestion = 'Secret question is required';
      if (!formData.answer) newErrors.answer = 'Answer is required';
    } else if (activeTab === 'address') {
      if (!formData.street) newErrors.street = 'Street is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.country) newErrors.country = 'Country is required';
      if (!formData.zipCode) newErrors.zipCode = 'Zip code is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentTab()) {
      if (activeTab === 'about') {
        setActiveTab('account');
      } else if (activeTab === 'account') {
        setActiveTab('address');
      }
    }
  };

  const handlePrevious = () => {
    if (activeTab === 'account') {
      setActiveTab('about');
    } else if (activeTab === 'address') {
      setActiveTab('account');
    }
  };

  const handleFinish = () => {
    if (validateCurrentTab()) {
      // Handle form submission
      console.log('Form submitted:', formData);
      alert('Profile created successfully!');
    }
  };

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-primary">Build Your Profile</h1>
        <p className="lead text-muted">Complete your profile in 3 easy steps</p>
      </div>

      <Card className="shadow">
        <Card.Header className="bg-primary text-white">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="mb-0">Profile Wizard</h4>
            <span className="badge bg-light text-primary fs-6">
              {currentProgress}% Complete
            </span>
          </div>
          <ProgressBar 
            now={currentProgress} 
            className="mt-3" 
            style={{ height: '8px' }}
          />
        </Card.Header>
        
        <Card.Body>
          <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
            <Nav variant="tabs" className="mb-4">
              {tabs.map((tab, index) => (
                <Nav.Item key={tab.key}>
                  <Nav.Link 
                    eventKey={tab.key}
                    className={activeTab === tab.key ? 'active' : ''}
                  >
                    {tab.title}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>

            <Tab.Content>
              <Tab.Pane eventKey="about">
                <AboutForm 
                  formData={formData}
                  setFormData={setFormData}
                  errors={errors}
                  setErrors={setErrors}
                />
                <div className="d-flex justify-content-end mt-4">
                  <Button 
                    variant="primary" 
                    onClick={handleNext}
//                    disabled={activeTab === 'about'}
                  >
                    Next
                  </Button>
                </div>
              </Tab.Pane>

              <Tab.Pane eventKey="account">
                <AccountForm 
                  formData={formData}
                  setFormData={setFormData}
                  errors={errors}
                  setErrors={setErrors}
                />
                <div className="d-flex justify-content-between mt-4">
                  <Button variant="secondary" onClick={handlePrevious}>
                    Previous
                  </Button>
                  <Button variant="primary" onClick={handleNext}>
                    Next
                  </Button>
                </div>
              </Tab.Pane>

              <Tab.Pane eventKey="address">
                <AddressForm 
                  formData={formData}
                  setFormData={setFormData}
                  errors={errors}
                  setErrors={setErrors}
                  onPrevious={handlePrevious}
                  onFinish={handleFinish}
                />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AccountPage;
