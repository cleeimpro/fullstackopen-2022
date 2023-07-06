interface exercisesSummary {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (
    dailyHours: number[],
    target: number
): exercisesSummary => {
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
