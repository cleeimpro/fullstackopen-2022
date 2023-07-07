import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight))
        res.status(400).json({ error: "malformatted or missing parameters" });
    else {
        const bmi = calculateBmi(height, weight);
        res.json({ weight, height, bmi });
    }
});

app.post("/exercises", (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { target, daily_exercises } = req.body;

    if (!target || !daily_exercises) {
        res.status(400).send({ error: "parameters missing" });
    } else if (
        isNaN(Number(target)) ||
        !Array.isArray(daily_exercises) ||
        !daily_exercises.every((hours) => !isNaN(Number(hours)))
    ) {
        res.status(400).send({ error: "malformatted parameters" });
    } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        res.json(calculateExercises(daily_exercises, target));
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
