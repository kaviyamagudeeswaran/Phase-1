import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, InputGroup } from 'react-bootstrap';
import { useRecipes } from '../context/RecipeContext';
import { useNavigate } from 'react-router-dom';
import { Plus, Minus, Clock, Users, ChefHat } from 'lucide-react';

const AddRecipe = () => {
  const { addRecipe } = useRecipes();
  const navigate = useNavigate();
  
  const [recipe, setRecipe] = useState({
    title: '',
    description: '',
    image: '',
    cookTime: '',
    prepTime: '',
    servings: '',
    difficulty: 'Easy',
    cuisine: '',
    mealType: '',
    ingredients: [{ name: '', amount: '', unit: '' }],
    instructions: [''],
    tags: [],
    nutrition: {
      calories: '',
      protein: '',
      carbs: '',
      fat: ''
    }
  });

  const [alert, setAlert] = useState({ show: false, variant: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setRecipe(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setRecipe(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index][field] = value;
    setRecipe(prev => ({ ...prev, ingredients: newIngredients }));
  };

  const addIngredient = () => {
    setRecipe(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: '', amount: '', unit: '' }]
    }));
  };

  const removeIngredient = (index) => {
    if (recipe.ingredients.length > 1) {
      const newIngredients = recipe.ingredients.filter((_, i) => i !== index);
      setRecipe(prev => ({ ...prev, ingredients: newIngredients }));
    }
  };

  const handleInstructionChange = (index, value) => {
    const newInstructions = [...recipe.instructions];
    newInstructions[index] = value;
    setRecipe(prev => ({ ...prev, instructions: newInstructions }));
  };

  const addInstruction = () => {
    setRecipe(prev => ({
      ...prev,
      instructions: [...prev.instructions, '']
    }));
  };

  const removeInstruction = (index) => {
    if (recipe.instructions.length > 1) {
      const newInstructions = recipe.instructions.filter((_, i) => i !== index);
      setRecipe(prev => ({ ...prev, instructions: newInstructions }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Basic validation
    if (!recipe.title.trim() || !recipe.description.trim()) {
      setAlert({
        show: true,
        variant: 'danger',
        message: 'Please fill in all required fields'
      });
      setLoading(false);
      return;
    }

    // Filter out empty ingredients and instructions
    const cleanedRecipe = {
      ...recipe,
      ingredients: recipe.ingredients.filter(ing => ing.name.trim()),
      instructions: recipe.instructions.filter(inst => inst.trim()),
      tags: recipe.tags.filter(tag => tag.trim())
    };

    const result = await addRecipe(cleanedRecipe);
    
    if (result.success) {
      setAlert({
        show: true,
        variant: 'success',
        message: 'Recipe added successfully!'
      });
      setTimeout(() => {
        navigate('/recipes');
      }, 2000);
    } else {
      setAlert({
        show: true,
        variant: 'danger',
        message: result.error || 'Failed to add recipe'
      });
    }
    
    setLoading(false);
  };

  const cuisines = ['Italian', 'Mexican', 'Asian', 'American', 'Mediterranean', 'Indian', 'French', 'Thai', 'Other'];
  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert', 'Appetizer'];
  const units = ['cups', 'tablespoons', 'teaspoons', 'ounces', 'pounds', 'grams', 'ml', 'liters', 'pieces', 'cloves'];

  return (
    <Container className="py-5" style={{ marginTop: '80px' }}>
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="form-custom">
            <Card.Body>
              <div className="text-center mb-4">
                <ChefHat size={48} className="text-primary mb-3" />
                <h2>Add New Recipe</h2>
                <p className="text-muted">Share your delicious creation with the world</p>
              </div>

              {alert.show && (
                <Alert variant={alert.variant} onClose={() => setAlert({ show: false })} dismissible>
                  {alert.message}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                {/* Basic Information */}
                <Row>
                  <Col md={8}>
                    <Form.Group className="mb-3">
                      <Form.Label>Recipe Title *</Form.Label>
                      <Form.Control
                        type="text"
                        name="title"
                        value={recipe.title}
                        onChange={handleInputChange}
                        placeholder="Enter recipe title"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Difficulty</Form.Label>
                      <Form.Select
                        name="difficulty"
                        value={recipe.difficulty}
                        onChange={handleInputChange}
                      >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Description *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={recipe.description}
                    onChange={handleInputChange}
                    placeholder="Describe your recipe..."
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    type="url"
                    name="image"
                    value={recipe.image}
                    onChange={handleInputChange}
                    placeholder="https://example.com/recipe-image.jpg"
                  />
                </Form.Group>

                {/* Recipe Details */}
                <Row>
                  <Col md={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <Clock size={16} className="me-1" />
                        Prep Time (min)
                      </Form.Label>
                      <Form.Control
                        type="number"
                        name="prepTime"
                        value={recipe.prepTime}
                        onChange={handleInputChange}
                        placeholder="30"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <Clock size={16} className="me-1" />
                        Cook Time (min)
                      </Form.Label>
                      <Form.Control
                        type="number"
                        name="cookTime"
                        value={recipe.cookTime}
                        onChange={handleInputChange}
                        placeholder="45"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <Users size={16} className="me-1" />
                        Servings
                      </Form.Label>
                      <Form.Control
                        type="number"
                        name="servings"
                        value={recipe.servings}
                        onChange={handleInputChange}
                        placeholder="4"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Cuisine</Form.Label>
                      <Form.Select
                        name="cuisine"
                        value={recipe.cuisine}
                        onChange={handleInputChange}
                      >
                        <option value="">Select cuisine</option>
                        {cuisines.map(cuisine => (
                          <option key={cuisine} value={cuisine}>{cuisine}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4">
                  <Form.Label>Meal Type</Form.Label>
                  <Form.Select
                    name="mealType"
                    value={recipe.mealType}
                    onChange={handleInputChange}
                  >
                    <option value="">Select meal type</option>
                    {mealTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                {/* Ingredients */}
                <h4 className="mb-3">Ingredients</h4>
                {recipe.ingredients.map((ingredient, index) => (
                  <Row key={index} className="mb-2 align-items-end">
                    <Col md={4}>
                      <Form.Control
                        type="text"
                        placeholder="Ingredient name"
                        value={ingredient.name}
                        onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                      />
                    </Col>
                    <Col md={3}>
                      <Form.Control
                        type="number"
                        step="0.25"
                        placeholder="Amount"
                        value={ingredient.amount}
                        onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
                      />
                    </Col>
                    <Col md={3}>
                      <Form.Select
                        value={ingredient.unit}
                        onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                      >
                        <option value="">Unit</option>
                        {units.map(unit => (
                          <option key={unit} value={unit}>{unit}</option>
                        ))}
                      </Form.Select>
                    </Col>
                    <Col md={2}>
                      <div className="d-flex gap-1">
                        {index === recipe.ingredients.length - 1 && (
                          <Button variant="success" size="sm" onClick={addIngredient}>
                            <Plus size={16} />
                          </Button>
                        )}
                        {recipe.ingredients.length > 1 && (
                          <Button variant="danger" size="sm" onClick={() => removeIngredient(index)}>
                            <Minus size={16} />
                          </Button>
                        )}
                      </div>
                    </Col>
                  </Row>
                ))}

                {/* Instructions */}
                <h4 className="mb-3 mt-4">Instructions</h4>
                {recipe.instructions.map((instruction, index) => (
                  <Row key={index} className="mb-2 align-items-start">
                    <Col md={1} className="text-center pt-2">
                      <strong>{index + 1}.</strong>
                    </Col>
                    <Col md={9}>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        placeholder="Describe this step..."
                        value={instruction}
                        onChange={(e) => handleInstructionChange(index, e.target.value)}
                      />
                    </Col>
                    <Col md={2}>
                      <div className="d-flex gap-1">
                        {index === recipe.instructions.length - 1 && (
                          <Button variant="success" size="sm" onClick={addInstruction}>
                            <Plus size={16} />
                          </Button>
                        )}
                        {recipe.instructions.length > 1 && (
                          <Button variant="danger" size="sm" onClick={() => removeInstruction(index)}>
                            <Minus size={16} />
                          </Button>
                        )}
                      </div>
                    </Col>
                  </Row>
                ))}

                {/* Nutrition (Optional) */}
                <h4 className="mb-3 mt-4">Nutrition Information (Optional)</h4>
                <Row>
                  <Col md={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Calories</Form.Label>
                      <Form.Control
                        type="number"
                        name="nutrition.calories"
                        value={recipe.nutrition.calories}
                        onChange={handleInputChange}
                        placeholder="250"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Protein (g)</Form.Label>
                      <Form.Control
                        type="number"
                        name="nutrition.protein"
                        value={recipe.nutrition.protein}
                        onChange={handleInputChange}
                        placeholder="15"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Carbs (g)</Form.Label>
                      <Form.Control
                        type="number"
                        name="nutrition.carbs"
                        value={recipe.nutrition.carbs}
                        onChange={handleInputChange}
                        placeholder="30"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Fat (g)</Form.Label>
                      <Form.Control
                        type="number"
                        name="nutrition.fat"
                        value={recipe.nutrition.fat}
                        onChange={handleInputChange}
                        placeholder="10"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="text-center mt-4">
                  <Button 
                    type="submit" 
                    className="btn-custom-primary me-3" 
                    disabled={loading}
                    size="lg"
                  >
                    {loading ? 'Adding Recipe...' : 'Add Recipe'}
                  </Button>
                  <Button 
                    variant="secondary" 
                    onClick={() => navigate('/recipes')}
                    size="lg"
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddRecipe;