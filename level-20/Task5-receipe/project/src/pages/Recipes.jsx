import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, InputGroup, Button, Spinner, Alert } from 'react-bootstrap';
import { useRecipes } from '../context/RecipeContext';
import RecipeCard from '../components/RecipeCard';
import { Search, Filter, Clock, Users } from 'lucide-react';

const Recipes = () => {
  const { recipes, fetchRecipes, loading, error, searchSpoonacularRecipes } = useRecipes();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCuisine, setFilterCuisine] = useState('');
  const [filterMealType, setFilterMealType] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [externalRecipes, setExternalRecipes] = useState([]);
  const [showExternal, setShowExternal] = useState(false);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleSearch = async () => {
    if (searchTerm.trim()) {
      const searchParams = {
        search: searchTerm,
        cuisine: filterCuisine,
        mealType: filterMealType,
        difficulty: filterDifficulty,
        sortBy
      };
      await fetchRecipes(searchParams);

      // Also search external recipes
      const externalResults = await searchSpoonacularRecipes(searchTerm);
      if (externalResults.results) {
        setExternalRecipes(externalResults.results);
        setShowExternal(true);
      }
    } else {
      await fetchRecipes();
      setShowExternal(false);
    }
  };

  const handleFilter = async () => {
    const searchParams = {
      search: searchTerm,
      cuisine: filterCuisine,
      mealType: filterMealType,
      difficulty: filterDifficulty,
      sortBy
    };
    await fetchRecipes(searchParams);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterCuisine('');
    setFilterMealType('');
    setFilterDifficulty('');
    setSortBy('title');
    setShowExternal(false);
    fetchRecipes();
  };

  const cuisines = ['Italian', 'Mexican', 'Asian', 'American', 'Mediterranean', 'Indian', 'French', 'Thai'];
  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert', 'Appetizer'];
  const difficulties = ['Easy', 'Medium', 'Hard'];

  return (
    <Container className="py-5" style={{ marginTop: '80px' }}>
      <Row className="mb-4">
        <Col>
          <h1 className="display-5 text-center mb-4">Recipe Collection</h1>
        </Col>
      </Row>

      {/* Search and Filter Section */}
      <Row className="mb-4">
        <Col>
          <div className="search-filter-section">
            <Row>
              <Col lg={6} className="mb-3">
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Search recipes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <Button variant="primary" onClick={handleSearch}>
                    <Search size={16} />
                  </Button>
                </InputGroup>
              </Col>
              
              <Col lg={6} className="mb-3">
                <div className="d-flex gap-2 flex-wrap">
                  <Form.Select
                    value={filterCuisine}
                    onChange={(e) => setFilterCuisine(e.target.value)}
                    style={{ maxWidth: '150px' }}
                  >
                    <option value="">All Cuisines</option>
                    {cuisines.map(cuisine => (
                      <option key={cuisine} value={cuisine}>{cuisine}</option>
                    ))}
                  </Form.Select>
                  
                  <Form.Select
                    value={filterMealType}
                    onChange={(e) => setFilterMealType(e.target.value)}
                    style={{ maxWidth: '150px' }}
                  >
                    <option value="">All Meals</option>
                    {mealTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </Form.Select>
                  
                  <Form.Select
                    value={filterDifficulty}
                    onChange={(e) => setFilterDifficulty(e.target.value)}
                    style={{ maxWidth: '120px' }}
                  >
                    <option value="">All Levels</option>
                    {difficulties.map(difficulty => (
                      <option key={difficulty} value={difficulty}>{difficulty}</option>
                    ))}
                  </Form.Select>
                </div>
              </Col>
            </Row>
            
            <Row>
              <Col>
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                  <div className="d-flex gap-2">
                    <Button variant="outline-primary" onClick={handleFilter}>
                      <Filter size={16} className="me-1" />
                      Apply Filters
                    </Button>
                    <Button variant="outline-secondary" onClick={clearFilters}>
                      Clear All
                    </Button>
                  </div>
                  
                  <div className="d-flex align-items-center gap-2">
                    <span className="text-muted">Sort by:</span>
                    <Form.Select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      style={{ maxWidth: '150px' }}
                    >
                      <option value="title">Name</option>
                      <option value="cookTime">Cook Time</option>
                      <option value="servings">Servings</option>
                      <option value="createdAt">Date Added</option>
                    </Form.Select>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      {error && (
        <Row className="mb-4">
          <Col>
            <Alert variant="danger">{error}</Alert>
          </Col>
        </Row>
      )}

      {loading ? (
        <Row className="justify-content-center">
          <Col className="text-center">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2">Loading recipes...</p>
          </Col>
        </Row>
      ) : (
        <>
          {/* User's Recipes */}
          <Row className="mb-4">
            <Col>
              <h3>Your Recipes ({recipes.length})</h3>
            </Col>
          </Row>
          
          <Row>
            {recipes.length > 0 ? (
              recipes.map((recipe) => (
                <Col lg={4} md={6} className="mb-4" key={recipe._id}>
                  <RecipeCard recipe={recipe} />
                </Col>
              ))
            ) : (
              <Col className="text-center py-5">
                <h5 className="text-muted">No recipes found</h5>
                <p className="text-muted">Try adjusting your search criteria or add your first recipe!</p>
              </Col>
            )}
          </Row>

          {/* External Recipes from Spoonacular */}
          {showExternal && externalRecipes.length > 0 && (
            <>
              <Row className="mb-4 mt-5">
                <Col>
                  <h3>Discover New Recipes ({externalRecipes.length})</h3>
                  <p className="text-muted">Recipes from our recipe database</p>
                </Col>
              </Row>
              
              <Row>
                {externalRecipes.map((recipe) => (
                  <Col lg={4} md={6} className="mb-4" key={recipe.id}>
                    <RecipeCard 
                      recipe={{
                        _id: recipe.id,
                        title: recipe.title,
                        description: recipe.summary?.replace(/<[^>]*>/g, '').substring(0, 100) + '...',
                        image: recipe.image,
                        cookTime: recipe.readyInMinutes,
                        servings: recipe.servings,
                        cuisine: recipe.cuisines?.[0] || 'International',
                        mealType: recipe.dishTypes?.[0] || 'Main',
                        difficulty: 'Medium'
                      }}
                    />
                  </Col>
                ))}
              </Row>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default Recipes;