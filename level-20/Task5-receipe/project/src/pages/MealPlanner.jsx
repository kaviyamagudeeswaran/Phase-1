import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useRecipes } from '../context/RecipeContext';
import { Calendar, Plus, ShoppingCart } from 'lucide-react';

const MealPlanner = () => {
  const { recipes, fetchRecipes, mealPlan, fetchMealPlan, updateMealPlan, generateShoppingList } = useRecipes();
  const [currentWeek, setCurrentWeek] = useState(getCurrentWeek());
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMeal, setSelectedMeal] = useState('');
  const [weekPlan, setWeekPlan] = useState(initializeWeekPlan());

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

  function getCurrentWeek() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const week = Math.ceil(((now - start) / 86400000 + start.getDay() + 1) / 7);
    return `${now.getFullYear()}-W${week}`;
  }

  function initializeWeekPlan() {
    const plan = {};
    days.forEach(day => {
      plan[day] = {};
      mealTypes.forEach(meal => {
        plan[day][meal] = [];
      });
    });
    return plan;
  }

  useEffect(() => {
    fetchRecipes();
    fetchMealPlan(currentWeek);
  }, [currentWeek]);

  useEffect(() => {
    if (mealPlan && Object.keys(mealPlan).length > 0) {
      setWeekPlan(mealPlan);
    }
  }, [mealPlan]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    
    // Parse source and destination
    const sourceInfo = source.droppableId.split('-');
    const destInfo = destination.droppableId.split('-');
    
    if (sourceInfo[0] === 'recipes') {
      // Dragging from recipe list to meal plan
      const recipe = recipes[source.index];
      const [, day, meal] = destInfo;
      
      const newPlan = { ...weekPlan };
      if (!newPlan[day][meal]) {
        newPlan[day][meal] = [];
      }
      newPlan[day][meal].push(recipe);
      setWeekPlan(newPlan);
    } else if (sourceInfo[0] === 'meal' && destInfo[0] === 'meal') {
      // Moving within meal plan
      const [, sourceDay, sourceMeal] = sourceInfo;
      const [, destDay, destMeal] = destInfo;
      
      const newPlan = { ...weekPlan };
      const movedRecipe = newPlan[sourceDay][sourceMeal][source.index];
      
      // Remove from source
      newPlan[sourceDay][sourceMeal].splice(source.index, 1);
      
      // Add to destination
      if (!newPlan[destDay][destMeal]) {
        newPlan[destDay][destMeal] = [];
      }
      newPlan[destDay][destMeal].splice(destination.index, 0, movedRecipe);
      
      setWeekPlan(newPlan);
    }
  };

  const handleAddRecipe = (recipeId) => {
    const recipe = recipes.find(r => r._id === recipeId);
    if (recipe && selectedDay && selectedMeal) {
      const newPlan = { ...weekPlan };
      if (!newPlan[selectedDay][selectedMeal]) {
        newPlan[selectedDay][selectedMeal] = [];
      }
      newPlan[selectedDay][selectedMeal].push(recipe);
      setWeekPlan(newPlan);
      setShowAddModal(false);
    }
  };

  const removeRecipe = (day, meal, index) => {
    const newPlan = { ...weekPlan };
    newPlan[day][meal].splice(index, 1);
    setWeekPlan(newPlan);
  };

  const saveMealPlan = async () => {
    const result = await updateMealPlan(currentWeek, weekPlan);
    if (result.success) {
      alert('Meal plan saved successfully!');
    } else {
      alert('Failed to save meal plan');
    }
  };

  const handleGenerateShoppingList = async () => {
    const result = await generateShoppingList(currentWeek);
    if (result.success) {
      alert('Shopping list generated successfully! Check the Shopping List page.');
    } else {
      alert('Failed to generate shopping list');
    }
  };

  return (
    <Container fluid className="py-5" style={{ marginTop: '80px' }}>
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="display-5">
                <Calendar size={32} className="me-2" />
                Meal Planner
              </h1>
              <p className="text-muted">Week: {currentWeek}</p>
            </div>
            <div className="d-flex gap-2">
              <Button 
                className="btn-custom-secondary"
                onClick={handleGenerateShoppingList}
              >
                <ShoppingCart size={16} className="me-1" />
                Generate Shopping List
              </Button>
              <Button 
                className="btn-custom-primary"
                onClick={saveMealPlan}
              >
                Save Plan
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Row>
          {/* Recipe Library */}
          <Col lg={3} className="mb-4">
            <Card>
              <Card.Header>
                <h5 className="mb-0">Recipe Library</h5>
              </Card.Header>
              <Card.Body style={{ maxHeight: '600px', overflowY: 'auto' }}>
                <Droppable droppableId="recipes">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {recipes.map((recipe, index) => (
                        <Draggable key={recipe._id} draggableId={recipe._id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`card mb-2 ${snapshot.isDragging ? 'shadow' : ''}`}
                              style={{
                                ...provided.draggableProps.style,
                                opacity: snapshot.isDragging ? 0.8 : 1
                              }}
                            >
                              <div className="card-body p-2">
                                <h6 className="card-title mb-1 text-truncate">{recipe.title}</h6>
                                <small className="text-muted">
                                  {recipe.cookTime} min • {recipe.servings} servings
                                </small>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Card.Body>
            </Card>
          </Col>

          {/* Meal Plan Grid */}
          <Col lg={9}>
            <div className="meal-planner-grid">
              {days.map(day => (
                <Card key={day} className="meal-day">
                  <Card.Header className="text-center">
                    <h5 className="mb-0">{day}</h5>
                  </Card.Header>
                  <Card.Body className="p-2">
                    {mealTypes.map(meal => (
                      <div key={`${day}-${meal}`} className="mb-3">
                        <h6 className="mb-2 text-center">{meal}</h6>
                        <Droppable droppableId={`meal-${day}-${meal}`}>
                          {(provided, snapshot) => (
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              className={`meal-slot ${snapshot.isDraggingOver ? 'bg-primary bg-opacity-10' : ''}`}
                              style={{ minHeight: '60px' }}
                            >
                              {weekPlan[day]?.[meal]?.map((recipe, index) => (
                                <Draggable key={`${recipe._id}-${index}`} draggableId={`${recipe._id}-${index}`} index={index}>
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className={`card mb-1 ${snapshot.isDragging ? 'shadow' : ''}`}
                                      style={{
                                        ...provided.draggableProps.style,
                                        opacity: snapshot.isDragging ? 0.8 : 1
                                      }}
                                    >
                                      <div className="card-body p-1">
                                        <div className="d-flex justify-content-between align-items-center">
                                          <small className="text-truncate">{recipe.title}</small>
                                          <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => removeRecipe(day, meal, index)}
                                            style={{ fontSize: '0.7rem', padding: '2px 6px' }}
                                          >
                                            ×
                                          </Button>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                              {!weekPlan[day]?.[meal]?.length && (
                                <div className="text-center text-muted small">
                                  <Button
                                    variant="link"
                                    size="sm"
                                    onClick={() => {
                                      setSelectedDay(day);
                                      setSelectedMeal(meal);
                                      setShowAddModal(true);
                                    }}
                                    className="text-decoration-none p-0"
                                  >
                                    <Plus size={16} />
                                    <br />
                                    Add Recipe
                                  </Button>
                                </div>
                              )}
                            </div>
                          )}
                        </Droppable>
                      </div>
                    ))}
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Col>
        </Row>
      </DragDropContext>

      {/* Add Recipe Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Recipe to {selectedDay} - {selectedMeal}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {recipes.map(recipe => (
              <Card key={recipe._id} className="mb-2 cursor-pointer" onClick={() => handleAddRecipe(recipe._id)}>
                <Card.Body className="p-2">
                  <div className="d-flex align-items-center">
                    <img
                      src={recipe.image || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'}
                      alt={recipe.title}
                      style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px' }}
                      className="me-3"
                    />
                    <div>
                      <h6 className="mb-1">{recipe.title}</h6>
                      <small className="text-muted">
                        {recipe.cookTime} min • {recipe.servings} servings
                      </small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default MealPlanner;