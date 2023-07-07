interface ExercisesSummary {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface ExercisesValues {
    target: number;
    dailyHours: number[];
}

const parseArgumentsExercises = (args: string[]): ExercisesValues => {
    if (args.length < 4) throw new Error("Not enough arguments.");
    if (isNaN(Number(args[2]))) throw new Error("First argument is no number.");

    const dailyHours = args.slice(3).map((hours, index) => {
        if (isNaN(Number(hours)))
            throw new Error(`The ${index + 2} argument is no number`);
        return Number(hours);
    });
    const target = Number(args[2]);
    return { target, dailyHours };
};

export const calculateExercises = (
    dailyHours: number[],
    target: number
): ExercisesSummary => {
    const periodLength = dailyHours.length;
    const trainingDays = dailyHours.reduce(
        (sum, hours) => (hours ? sum + 1 : sum),
        0
    );
    const average =
        dailyHours.reduce((hours, sum) => (sum += hours), 0) / periodLength;
    const success = average >= target;
    const rating = average >= target * 0.5 ? (average >= target ? 3 : 2) : 1;
    const ratingDescriptions = [
        "not even half done",
        "not too bad but could be better",
        "well done",
    ];
    const ratingDescription = ratingDescriptions[rating - 1];
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
};

try {
    const { dailyHours, target } = parseArgumentsExercises(process.argv);
    console.log(calculateExercises(dailyHours, target));
} catch (error: unknown) {
    let errorMessage = "Something bad happend.";
    if (error instanceof Error) errorMessage += " Error: " + error.message;
    console.log(errorMessage);
}
