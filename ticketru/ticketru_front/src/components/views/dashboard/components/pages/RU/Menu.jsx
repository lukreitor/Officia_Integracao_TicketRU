import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

import { Card } from 'react-bootstrap';

const mealsLunch = [
    { day: 'Segunda', meal: 'Salada de Frango' },
    { day: 'Terça', meal: 'Beef com Arroz' },
    { day: 'Quarta', meal: 'Cuzcuz' },
    { day: 'Quinta', meal: 'Spaghetti' },
    { day: 'Sexta', meal: 'Peixe com maionese' }
];

const mealsDinner = [
    { day: 'Segunda', meal: 'Salada de Frango' },
    { day: 'Terça', meal: 'Beef de Panela' },
    { day: 'Quarta', meal: 'Baião de Dois' },
    { day: 'Quinta', meal: 'Spaghetti' },
    { day: 'Sexta', meal: 'Peru com maionese' }
];

const MealCard = ({ day, meal }) => (
    <Card style={{ width: '18rem' }}>
        <Card.Body>
            <Card.Title>{day}</Card.Title>
            <Card.Text>{meal}</Card.Text>
        </Card.Body>
    </Card>
);

const Lunch = () => (
    <div>
        <h1>Menu no Almoço</h1>
        <div className="d-flex flex-wrap justify-content-around">
            {mealsLunch.map((meal, index) => (
                <MealCard
                    key={index}
                    day={meal.day}
                    meal={meal.meal}
                    className="mt-1 mb-1"
                />
            ))}
        </div>
    </div>
);

const Dinner = () => (
    <div>
        <h1>Menu no Jantar</h1>
        <div className="d-flex flex-wrap justify-content-around">
            {mealsDinner.map((meal, index) => (
                <MealCard key={index} day={meal.day} meal={meal.meal} />
            ))}
        </div>
    </div>
);

function Menu() {
    const [selectedMeal, setSelectedMeal] = useState('lunch');

    return (
        <div>
            <div className="d-flex justify-content-around mb-3 ">
                <Button
                    className=" bg-violet"
                    onClick={() => setSelectedMeal('lunch')}
                >
                    Almoço
                </Button>
                <Button
                    className=" bg-violet"
                    onClick={() => setSelectedMeal('dinner')}
                >
                    Jantar
                </Button>
            </div>
            {selectedMeal === 'lunch' ? <Lunch /> : null}
            {selectedMeal === 'dinner' ? <Dinner /> : null}
        </div>
    );
}

export default Menu;
