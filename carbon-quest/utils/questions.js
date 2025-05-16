export const transportationQuestions = [
    {
        title: "How do you travel today?",
        options: [
            {value: "Car", code: 1},
            {value: "Bus", code: 2},
            {value: "Train", code: 3},
            {value: "Taxi", code: 4},
            {value: "Airplane", code: 5},
            {value: "Bicycle", code: 6},
            {value: "Walking", code: 7}
        ],
        slug: "travel",
        answer: null,
        type: "mcq",
        order: 0
    },
    {
        title: "Type of fuel",
        options: [
            {value: "Petrol", code: "A"},
            {value: "Diesel", code: "B"},
            {value: "Electric", code: "C"},
            {value: "Hybrid", code: "D"},
        ],
        slug: "fuel",
        answer: null,
        type: "mcq",
        input: [1, 2, 4],
        order: 1
    },
    {
        title: "Distance travelled",
        slug: "distance",
        answer: null,
        type: "input number",
        order: 2
    }
]

export const energyQuestions = [
    {
        title: "Enter your consumption type",
        options: [
            {value: "Electricity", unit: "kWh", av: 0.233},
            {value: "Natural gas", unit: "m3", av: 2.03},
            {value: "Heating oil", unit: "litres", av: 2.68},
            {value: "LPG", unit: "litres", av: 1.51},
            {value: "Wood", unit: "kg", av: 2.93},
            {value: "Coal", unit: "kg", av: 0.36},
        ],
        slug: "travel",
        answer: null,
        type: "mcq",
        order: 0
    },
    {
        title: "Enter your consumption",
        slug: "consumption",
        answer: null,
        type: "input number",
        order: 1
    }
]



