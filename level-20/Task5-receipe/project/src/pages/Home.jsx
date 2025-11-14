import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';
import { useAuth } from '../context/AuthContext';
import RecipeCard from '../components/RecipeCard';
import { ChefHat, BookOpen, Calendar, ShoppingCart, TrendingUp, Users } from 'lucide-react';

const Home = () => {
  const { recipes, fetchRecipes, loading } = useRecipes();
  const { isAuthenticated } = useAuth();
  const [featuredRecipes, setFeaturedRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    if (recipes.length > 0) {
      // Get the 6 most recent recipes for featured section
      const featured = recipes.slice(0, 6);
      setFeaturedRecipes(featured);
    }
  }, [recipes]);

  const features = [
    {
      icon: <BookOpen size={48} />,
      title: 'Recipe Collection',
      description: 'Store and organize all your favorite recipes in one place with beautiful photos and detailed instructions.'
    },
    {
      icon: <Calendar size={48} />,
      title: 'Meal Planning',
      description: 'Plan your weekly meals with our intuitive drag-and-drop interface and never wonder what to cook again.'
    },
    {
      icon: <ShoppingCart size={48} />,
      title: 'Smart Shopping Lists',
      description: 'Automatically generate shopping lists from your meal plans and never forget an ingredient again.'
    },
    {
      icon: <TrendingUp size={48} />,
      title: 'Recipe Scaling',
      description: 'Easily adjust serving sizes and ingredient quantities to cook for any number of people.'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Recipes Available' },
    { number: '50,000+', label: 'Happy Cooks' },
    { number: '100+', label: 'Cuisines Covered' },
    { number: '24/7', label: 'Kitchen Support' }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="hero-title">
                Your Personal Kitchen Companion
              </h1>
              <p className="hero-subtitle">
                Discover, organize, and master thousands of recipes with our comprehensive recipe management system
              </p>
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                {isAuthenticated ? (
                  <>
                    <Link to="/recipes" className="btn btn-custom-primary btn-lg">
                      Browse Recipes
                    </Link>
                    <Link to="/add-recipe" className="btn btn-custom-secondary btn-lg">
                      Add Your Recipe
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/register" className="btn btn-custom-primary btn-lg">
                      Get Started Free
                    </Link>
                    <Link to="/login" className="btn btn-custom-secondary btn-lg">
                      Sign In
                    </Link>
                  </>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-5 bg-white">
        <Container>
          <Row>
            {stats.map((stat, index) => (
              <Col md={3} className="text-center mb-4" key={index}>
                <h2 className="display-4 text-primary mb-0">{stat.number}</h2>
                <p className="text-muted">{stat.label}</p>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="display-5 mb-3">Everything You Need to Cook Better</h2>
              <p className="lead text-muted">
                From recipe discovery to meal planning, we've got all the tools to make cooking enjoyable and organized
              </p>
            </Col>
          </Row>
          
          <Row>
            {features.map((feature, index) => (
              <Col lg={3} md={6} className="mb-4" key={index}>
                <Card className="text-center h-100 border-0 shadow-sm">
                  <Card.Body className="p-4">
                    <div className="text-primary mb-3">
                      {feature.icon}
                    </div>
                    <Card.Title className="h5">{feature.title}</Card.Title>
                    <Card.Text className="text-muted">
                      {feature.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Featured Recipes Section */}
      {featuredRecipes.length > 0 && (
        <section className="py-5 bg-light">
          <Container>
            <Row className="text-center mb-5">
              <Col>
                <h2 className="display-5 mb-3">Featured Recipes</h2>
                <p className="lead text-muted">
                  Discover some of our most popular and delicious recipes
                </p>
              </Col>
            </Row>
            
            <Row>
              {featuredRecipes.map((recipe) => (
                <Col lg={4} md={6} className="mb-4" key={recipe._id}>
                  <RecipeCard recipe={recipe} />
                </Col>
              ))}
            </Row>
            
            <Row className="text-center mt-4">
              <Col>
                <Link to="/recipes" className="btn btn-custom-primary btn-lg">
                  View All Recipes
                </Link>
              </Col>
            </Row>
          </Container>
        </section>
      )}

      {/* Call to Action Section */}
      <section className="py-5" style={{ background: 'var(--gradient-primary)' }}>
        <Container>
          <Row className="text-center text-white">
            <Col>
              <ChefHat size={64} className="mb-3" />
              <h2 className="display-5 mb-3">Ready to Start Cooking?</h2>
              <p className="lead mb-4">
                Join thousands of home cooks who are already organizing their recipes and planning their meals with RecipeBox
              </p>
              {!isAuthenticated && (
                <Link to="/register" className="btn btn-light btn-lg">
                  Create Your Free Account
                </Link>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;