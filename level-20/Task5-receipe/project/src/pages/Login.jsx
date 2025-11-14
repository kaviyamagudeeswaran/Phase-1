import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Mail, Lock } from 'lucide-react';

const Login = () => {
  const { login, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [alert, setAlert] = useState({ show: false, variant: '', message: '' });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setAlert({
        show: true,
        variant: 'danger',
        message: 'Please fill in all fields'
      });
      return;
    }

    const result = await login(formData.email, formData.password);
    
    if (!result.success) {
      setAlert({
        show: true,
        variant: 'danger',
        message: result.error
      });
    }
  };

  return (
    <Container className="py-5" style={{ marginTop: '80px' }}>
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="form-custom">
            <Card.Body>
              <div className="text-center mb-4">
                <LogIn size={48} className="text-primary mb-3" />
                <h2>Welcome Back</h2>
                <p className="text-muted">Sign in to your RecipeBox account</p>
              </div>

              {alert.show && (
                <Alert variant={alert.variant} onClose={() => setAlert({ show: false })} dismissible>
                  {alert.message}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <Mail size={16} className="me-2" />
                    Email Address
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>
                    <Lock size={16} className="me-2" />
                    Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                  />
                </Form.Group>

                <Button
                  type="submit"
                  className="btn-custom-primary w-100 mb-3"
                  disabled={loading}
                  size="lg"
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>

                <div className="text-center">
                  <p className="text-muted">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-decoration-none">
                      Create one here
                    </Link>
                  </p>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;