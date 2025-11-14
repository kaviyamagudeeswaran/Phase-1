import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, ListGroup, Badge } from 'react-bootstrap';
import { useRecipes } from '../context/RecipeContext';
import { ShoppingCart, Check, Plus, Printer as Print, Trash2 } from 'lucide-react';

const ShoppingList = () => {
  const { shoppingList, generateShoppingList } = useRecipes();
  const [currentWeek, setCurrentWeek] = useState(getCurrentWeek());
  const [checkedItems, setCheckedItems] = useState({});
  const [customItems, setCustomItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [groupedList, setGroupedList] = useState({});

  function getCurrentWeek() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const week = Math.ceil(((now - start) / 86400000 + start.getDay() + 1) / 7);
    return `${now.getFullYear()}-W${week}`;
  }

  useEffect(() => {
    if (shoppingList.length === 0) {
      generateShoppingList(currentWeek);
    }
  }, [currentWeek]);

  useEffect(() => {
    // Group items by category
    const grouped = {};
    const categories = {
      'Produce': ['tomato', 'onion', 'garlic', 'pepper', 'lettuce', 'carrot', 'celery', 'potato', 'lemon', 'lime', 'apple', 'banana'],
      'Meat & Poultry': ['chicken', 'beef', 'pork', 'turkey', 'fish', 'salmon', 'tuna'],
      'Dairy': ['milk', 'cheese', 'butter', 'yogurt', 'cream', 'eggs'],
      'Pantry': ['flour', 'sugar', 'salt', 'pepper', 'oil', 'vinegar', 'rice', 'pasta'],
      'Spices & Herbs': ['basil', 'oregano', 'thyme', 'paprika', 'cumin', 'cinnamon'],
      'Other': []
    };

    [...shoppingList, ...customItems].forEach(item => {
      let category = 'Other';
      const itemName = item.name || item;
      
      for (const [cat, keywords] of Object.entries(categories)) {
        if (keywords.some(keyword => itemName.toLowerCase().includes(keyword))) {
          category = cat;
          break;
        }
      }

      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(item);
    });

    setGroupedList(grouped);
  }, [shoppingList, customItems]);

  const toggleItemCheck = (itemId) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const addCustomItem = () => {
    if (newItem.trim()) {
      const customItem = {
        id: `custom-${Date.now()}`,
        name: newItem.trim(),
        amount: 1,
        unit: 'item',
        isCustom: true
      };
      setCustomItems(prev => [...prev, customItem]);
      setNewItem('');
    }
  };

  const removeCustomItem = (itemId) => {
    setCustomItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handlePrint = () => {
    window.print();
  };

  const clearCompleted = () => {
    const completedIds = Object.keys(checkedItems).filter(id => checkedItems[id]);
    setCustomItems(prev => prev.filter(item => !completedIds.includes(item.id)));
    setCheckedItems(prev => {
      const newChecked = { ...prev };
      completedIds.forEach(id => delete newChecked[id]);
      return newChecked;
    });
  };

  const totalItems = [...shoppingList, ...customItems].length;
  const completedItems = Object.values(checkedItems).filter(Boolean).length;
  const progressPercentage = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  return (
    <Container className="py-5" style={{ marginTop: '80px' }}>
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="display-5">
                <ShoppingCart size={32} className="me-2" />
                Shopping List
              </h1>
              <p className="text-muted">Week: {currentWeek}</p>
            </div>
            <div className="d-flex gap-2 no-print">
              <Button variant="outline-secondary" onClick={clearCompleted}>
                Clear Completed
              </Button>
              <Button variant="outline-primary" onClick={handlePrint}>
                <Print size={16} className="me-1" />
                Print
              </Button>
              <Button 
                className="btn-custom-primary"
                onClick={() => generateShoppingList(currentWeek)}
              >
                Regenerate List
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span>Shopping Progress</span>
                <Badge bg="primary">{completedItems} of {totalItems} items</Badge>
              </div>
              <div className="progress" style={{ height: '8px' }}>
                <div 
                  className="progress-bar"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4 no-print">
        <Col>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Add Custom Item</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex gap-2">
                <Form.Control
                  type="text"
                  placeholder="Add item to shopping list..."
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addCustomItem()}
                />
                <Button onClick={addCustomItem} className="btn-custom-primary">
                  <Plus size={16} />
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        {Object.entries(groupedList).map(([category, items]) => (
          items.length > 0 && (
            <Col lg={6} className="mb-4" key={category}>
              <Card>
                <Card.Header>
                  <h5 className="mb-0">{category}</h5>
                  <Badge bg="secondary">{items.length} items</Badge>
                </Card.Header>
                <ListGroup variant="flush">
                  {items.map((item, index) => {
                    const itemId = item.id || `${category}-${index}`;
                    const isChecked = checkedItems[itemId] || false;
                    
                    return (
                      <ListGroup.Item key={itemId} className="shopping-list-item">
                        <div className="d-flex align-items-center">
                          <Form.Check
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleItemCheck(itemId)}
                            className="me-3"
                          />
                          <div className={`flex-grow-1 ${isChecked ? 'text-decoration-line-through text-muted' : ''}`}>
                            <strong>{item.name || item}</strong>
                            {item.amount && item.unit && (
                              <span className="text-muted ms-2">
                                ({item.amount} {item.unit})
                              </span>
                            )}
                          </div>
                          {item.isCustom && (
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => removeCustomItem(itemId)}
                              className="no-print"
                            >
                              <Trash2 size={14} />
                            </Button>
                          )}
                        </div>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              </Card>
            </Col>
          )
        ))}
      </Row>

      {totalItems === 0 && (
        <Row>
          <Col className="text-center py-5">
            <ShoppingCart size={64} className="text-muted mb-3" />
            <h4 className="text-muted">No items in your shopping list</h4>
            <p className="text-muted">Add recipes to your meal plan to automatically generate a shopping list</p>
            <Button href="/meal-planner" className="btn-custom-primary">
              Go to Meal Planner
            </Button>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ShoppingList;