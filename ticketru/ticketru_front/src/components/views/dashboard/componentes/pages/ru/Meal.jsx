import React from 'react';
import { Card, Button } from 'react-bootstrap';

const meals = [
    { day: 'Monday', meal: 'Chicken Salad' },
    { day: 'Tuesday', meal: 'Beef Stew' },
    { day: 'Wednesday', meal: 'Vegetable Soup' },
    { day: 'Thursday', meal: 'Spaghetti Bolognese' },
    { day: 'Friday', meal: 'Fish and Chips' }
];

const MealCard = ({ day, meal }) => (
    <Card style={{ width: '18rem' }}>
        <Card.Body>
            <Card.Title>{day}</Card.Title>
            <Card.Text>{meal}</Card.Text>
            <Button variant="primary">Order Now</Button>
        </Card.Body>
    </Card>
);

const Lunch = () => (
    <div>
        <h1>Lunch Menu</h1>
        <div className="d-flex flex-wrap justify-content-around">
            {meals.map((meal, index) => (
                <MealCard key={index} day={meal.day} meal={meal.meal} />
            ))}
        </div>
    </div>
);

const Dinner = () => (
    <div>
        <h1>Dinner Menu</h1>
        <div className="d-flex flex-wrap justify-content-around">
            {meals.map((meal, index) => (
                <MealCard key={index} day={meal.day} meal={meal.meal} />
            ))}
        </div>
    </div>
);

export default { Lunch, Dinner };
