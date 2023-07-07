interface BmiValues {
    height: number;
    weight: number;
}

const parseArgumentsBmi = (args: string[]): BmiValues => {
    if (args.length < 4) throw new Error("Not enough arguments");
    if (args.length > 4) throw new Error("Too many arguments");
    if (isNaN(Number(args[2]))) throw new Error("First argument is no number");
    if (isNaN(Number(args[3]))) throw new Error("Second argument is no number");

    return { height: Number(args[2]), weight: Number(args[3]) };
};

export const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / ((height / 100) ^ 2);
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal range";
    if (bmi < 30) return "Overweight";
    return "Obese";
};

try {
    const { weight, height } = parseArgumentsBmi(process.argv);
    console.log(calculateBmi(height, weight));
} catch (error: unknown) {
    let errorMessage = "Something bad happend.";
    if (error instanceof Error) errorMessage += " Error: " + error.message;
    console.log(errorMessage);
}
