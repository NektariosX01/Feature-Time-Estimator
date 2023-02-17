function calculateTimeEstimate(featureSize, complexity, experience) {
    let baseEstimate;
    switch (featureSize) {
        case "XS":
            baseEstimate = 2;
            break;
        case "S":
            baseEstimate = 4;
            break;
        case "M":
            baseEstimate = 8;
            break;
        case "L":
            baseEstimate = 16;
            break;
        case "XL":
            baseEstimate = 32;
            break;
        default:
            baseEstimate = 8;
    }

    let complexityMultiplier;
    switch (complexity) {
        case "Simple":
            complexityMultiplier = 1;
            break;
        case "Moderate":
            complexityMultiplier = 2;
            break;
        case "Complex":
            complexityMultiplier = 4;
            break;
        default:
            complexityMultiplier = 2;
    }

    let experienceMultiplier;
    switch (experience) {
        case "Novice":
            experienceMultiplier = 2;
            break;
        case "Intermediate":
            experienceMultiplier = 1.5;
            break;
        case "Expert":
            experienceMultiplier = 1;
            break;
        default:
            experienceMultiplier = 1.5;
    }

    const unadjustedEstimate = baseEstimate * complexityMultiplier;
    const adjustedExperienceEstimate = unadjustedEstimate * experienceMultiplier;

    const confidenceInterval = [adjustedExperienceEstimate * 0.8, adjustedExperienceEstimate * 1.2];

    return {
        timeEstimate: adjustedExperienceEstimate,
        confidenceInterval: confidenceInterval,
    };
}

const estimateButton = document.getElementById("estimate-button");

estimateButton.addEventListener("click", (event) => {
    event.preventDefault();

    const featureSize = document.getElementById("feature-size").value;
    const complexity = document.getElementById("complexity").value;
    const experience = document.getElementById("experience").value;

    const timeEstimate = calculateTimeEstimate(featureSize, complexity, experience);

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `Time estimate: ${timeEstimate.timeEstimate.toFixed(1)} days<br>Confidence interval: ${timeEstimate.confidenceInterval[0].toFixed(1)} - ${timeEstimate.confidenceInterval[1].toFixed(1)} days`;
});
