import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Clock, Users, Star } from 'lucide-react';

const RecipeCard = ({ recipe }) => {
  const {
    _id,
    title,
    description,
    image,
    cookTime,
    servings,
    cuisine,
    mealType,
    difficulty,
    rating = 0
  } = recipe;

  const getCuisineColor = (cuisine) => {
    const colors = {
      'Italian': 'success',
      'Mexican': 'warning',
      'Asian': 'danger',
      'American': 'primary',
      'Mediterranean': 'info',
      'Indian': 'secondary'
    };
    return colors[cuisine] || 'secondary';
  };

  return (
    <Card className="recipe-card h-100">
      <div className="position-relative">
        <Card.Img
          variant="top"
          src={image || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'}
          className="recipe-card-img"
          alt={title}
        />
        <div className="position-absolute top-0 end-0 m-2">
          <Badge bg={getCuisineColor(cuisine)} className="category-badge">
            {cuisine}
          </Badge>
        </div>
        {rating > 0 && (
          <div className="position-absolute top-0 start-0 m-2">
            <Badge bg="warning" className="d-flex align-items-center gap-1">
              <Star size={12} fill="white" />
              {rating.toFixed(1)}
            </Badge>
          </div>
        )}
      </div>
      
      <Card.Body className="recipe-card-body">
        <Card.Title className="recipe-card-title">{title}</Card.Title>
        <Card.Text className="recipe-card-text">
          {description && description.length > 100 
            ? `${description.substring(0, 100)}...` 
            : description || 'A delicious recipe waiting to be discovered!'}
        </Card.Text>
        
        <div className="recipe-meta">
          <div className="d-flex gap-3">
            <div className="recipe-time">
              <Clock size={16} />
              <span>{cookTime || 30} min</span>
            </div>
            <div className="recipe-servings">
              <Users size={16} />
              <span>{servings || 4} servings</span>
            </div>
          </div>
          {difficulty && (
            <Badge 
              bg={difficulty === 'Easy' ? 'success' : difficulty === 'Medium' ? 'warning' : 'danger'}
              className="px-2 py-1"
            >
              {difficulty}
            </Badge>
          )}
        </div>
      </Card.Body>
      
      <div className="card-footer bg-transparent border-0 p-3">
        <Link 
          to={`/recipe/${_id}`} 
          className="btn btn-custom-primary w-100 text-decoration-none"
        >
          View Recipe
        </Link>
      </div>
    </Card>
  );
};

export default RecipeCard;