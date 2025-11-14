import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ChefHat, LogOut, User } from 'lucide-react';

const NavigationBar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar expand="lg" className="navbar-custom" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <ChefHat className="me-2" size={28} />
          RecipeBox
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/recipes">
              Recipes
            </Nav.Link>
            {isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/add-recipe">
                  Add Recipe
                </Nav.Link>
                <Nav.Link as={Link} to="/meal-planner">
                  Meal Planner
                </Nav.Link>
                <Nav.Link as={Link} to="/shopping-list">
                  Shopping List
                </Nav.Link>
              </>
            )}
          </Nav>
          
          <Nav>
            {isAuthenticated ? (
              <div className="d-flex align-items-center gap-3">
                <span className="text-muted">
                  <User size={16} className="me-1" />
                  {user?.name}
                </span>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={handleLogout}
                  className="d-flex align-items-center gap-1"
                >
                  <LogOut size={16} />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="d-flex gap-2">
                <Button as={Link} to="/login" variant="outline-primary" size="sm">
                  Login
                </Button>
                <Button as={Link} to="/register" variant="primary" size="sm">
                  Register
                </Button>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;