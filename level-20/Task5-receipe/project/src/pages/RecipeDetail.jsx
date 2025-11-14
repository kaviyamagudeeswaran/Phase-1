import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, ListGroup, Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';
import { Clock, Users, ChefHat, Printer as Print, Share2, Scale } from 'lucide-react';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recipes, scaleRecipe } = useRecipes();
  
  const [recipe, setRecipe] = useState(null);
  const [scaledRecipe, setScaledRecipe] = useState(null);
  const [servings, setServings] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundRecipe = recipes.find(r => r._id === id);
    if (foundRecipe) {
      setRecipe(foundRecipe);
      setScaledRecipe(foundRecipe);
      setServings(foundRecipe.servings || 1);
      setLoading(false);
    } else {
      // In a real app, you'd fetch the recipe from the API
      setLoading(false);
    }
  }, [id, recipes]);

  const handleScaleRecipe = (newServings) => {
    if (recipe && newServings > 0) {
      const scaled = scaleRecipe(recipe, newServings);
      setScaledRecipe(scaled);
      setServings(newServings);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: recipe.title,
          text: recipe.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Recipe link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <Container className="py-5" style={{ marginTop: '80px' }}>
        <div className="text-center">
          <div className="loading-spinner me-2"></div>
          Loading recipe...
        </div>
      </Container>
    );
  }

  if (!recipe) {
    return (
      <Container className="py-5" style={{ marginTop: '80px' }}>
        <div className="text-center">
          <h3>Recipe not found</h3>
          <Button onClick={() => navigate('/recipes')} className="btn-custom-primary">
            Back to Recipes
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5" style={{ marginTop: '80px' }}>
      <Row>
        <Col>
          <Button 
            variant="outline-secondary" 
            onClick={() => navigate('/recipes')}
            className="mb-4"
          >
            ← Back to Recipes
          </Button>
        </Col>
      </Row>

      <Row>
        <Col lg={8}>
          {/* Recipe Header */}
          <Card className="mb-4">
            <div className="position-relative">
              <Card.Img
                variant="top"
                src={scaledRecipe.image || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'}
                style={{ height: '400px', objectFit: 'cover' }}
                alt={scaledRecipe.title}
              />
              <div className="position-absolute top-0 end-0 m-3 d-flex gap-2">
                <Button variant="light" size="sm" onClick={handleShare}>
                  <Share2 size={16} />
                </Button>
                <Button variant="light" size="sm" onClick={handlePrint}>
                  <Print size={16} />
                </Button>
              </div>
            </div>
            
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h1 className="mb-2">{scaledRecipe.title}</h1>
                  <p className="text-muted mb-3">{scaledRecipe.description}</p>
                </div>
                <div className="text-end">
                  {scaledRecipe.cuisine && (
                    <Badge bg="primary" className="mb-2">{scaledRecipe.cuisine}</Badge>
                  )}
                  {scaledRecipe.mealType && (
                    <Badge bg="secondary" className="ms-1 mb-2">{scaledRecipe.mealType}</Badge>
                  )}
                  {scaledRecipe.difficulty && (
                    <Badge 
                      bg={scaledRecipe.difficulty === 'Easy' ? 'success' : scaledRecipe.difficulty === 'Medium' ? 'warning' : 'danger'}
                      className="ms-1"
                    >
                      {scaledRecipe.difficulty}
                    </Badge>
                  )}
                </div>
              </div>

              <Row className="text-center">
                <Col md={3}>
                  <div className="d-flex align-items-center justify-content-center mb-2">
                    <Clock size={20} className="text-primary me-2" />
                    <strong>Prep Time</strong>
                  </div>
                  <p>{scaledRecipe.prepTime || 'N/A'} min</p>
                </Col>
                <Col md={3}>
                  <div className="d-flex align-items-center justify-content-center mb-2">
                    <ChefHat size={20} className="text-primary me-2" />
                    <strong>Cook Time</strong>
                  </div>
                  <p>{scaledRecipe.cookTime || 'N/A'} min</p>
                </Col>
                <Col md={3}>
                  <div className="d-flex align-items-center justify-content-center mb-2">
                    <Users size={20} className="text-primary me-2" />
                    <strong>Servings</strong>
                  </div>
                  <p>{scaledRecipe.servings}</p>
                </Col>
                <Col md={3}>
                  <div className="d-flex align-items-center justify-content-center mb-2">
                    <Clock size={20} className="text-primary me-2" />
                    <strong>Total Time</strong>
                  </div>
                  <p>{(parseInt(scaledRecipe.prepTime || 0) + parseInt(scaledRecipe.cookTime || 0))} min</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Instructions */}
          <Card className="mb-4">
            <Card.Header>
              <h3 className="mb-0">Instructions</h3>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {scaledRecipe.instructions?.map((instruction, index) => (
                  <ListGroup.Item key={index} className="border-0 px-0">
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <Badge bg="primary" pill className="fs-6 p-2">
                          {index + 1}
                        </Badge>
                      </div>
                      <div className="flex-grow-1">
                        <p className="mb-0">{instruction}</p>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>

        </Col>

        <Col lg={4}>
          {/* Recipe Scaling */}
          <Card className="mb-4">
            <Card.Header>
              <h4 className="mb-0">
                <Scale size={20} className="me-2" />
                Scale Recipe
              </h4>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Number of Servings</Form.Label>
                <div className="d-flex align-items-center gap-2">
                  <Button 
                    variant="outline-primary" 
                    size="sm"
                    onClick={() => handleScaleRecipe(Math.max(1, servings - 1))}
                  >
                    -
                  </Button>
                  <Form.Control
                    type="number"
                    min="1"
                    value={servings}
                    onChange={(e) => handleScaleRecipe(parseInt(e.target.value) || 1)}
                    className="text-center"
                    style={{ maxWidth: '80px' }}
                  />
                  <Button 
                    variant="outline-primary" 
                    size="sm"
                    onClick={() => handleScaleRecipe(servings + 1)}
                  >
                    +
                  </Button>
                </div>
              </Form.Group>
              <small className="text-muted">
                Ingredients will be automatically adjusted based on serving size
              </small>
            </Card.Body>
          </Card>

          {/* Ingredients */}
          <Card className="mb-4">
            <Card.Header>
              <h4 className="mb-0">Ingredients</h4>
              {servings !== recipe.servings && (
                <small className="text-muted">
                  (Scaled for {servings} servings)
                </small>
              )}
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {scaledRecipe.ingredients?.map((ingredient, index) => (
                  <ListGroup.Item key={index} className="border-0 px-0 py-2">
                    <div className="d-flex justify-content-between align-items-center">
                      <span>{ingredient.name}</span>
                      <Badge bg="light" text="dark">
                        {ingredient.amount} {ingredient.unit}
                      </Badge>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>

          {/* Nutrition Information */}
          {scaledRecipe.nutrition && Object.values(scaledRecipe.nutrition).some(value => value) && (
            <Card className="mb-4">
              <Card.Header>
                <h4 className="mb-0">Nutrition Facts</h4>
                <small className="text-muted">Per serving</small>
              </Card.Header>
              <Card.Body>
                <Row>
                  {scaledRecipe.nutrition.calories && (
                    <Col xs={6} className="mb-2">
                      <strong>Calories:</strong> {scaledRecipe.nutrition.calories}
                    </Col>
                  )}
                  {scaledRecipe.nutrition.protein && (
                    <Col xs={6} className="mb-2">
                      <strong>Protein:</strong> {scaledRecipe.nutrition.protein}g
                    </Col>
                  )}
                  {scaledRecipe.nutrition.carbs && (
                    <Col xs={6} className="mb-2">
                      <strong>Carbs:</strong> {scaledRecipe.nutrition.carbs}g
                    </Col>
                  )}
                  {scaledRecipe.nutrition.fat && (
                    <Col xs={6} className="mb-2">
                      <strong>Fat:</strong> {scaledRecipe.nutrition.fat}g
                    </Col>
                  )}
                </Row>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default RecipeDetail;