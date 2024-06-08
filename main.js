// bai quan ly diem tuyen sinh
function calculateTotalScore(scores, area, priorityType, cutoffScore) {
    const areaPriority = { 'A': 2, 'B': 1, 'C': 0.5, 'X': 0 };
    const typePriority = { 1: 2.5, 2: 1.5, 3: 1, 0: 0 };
    const totalScore = scores.reduce((a, b) => a + b, 0) + (areaPriority[area] || 0) + (typePriority[priorityType] || 0);
    const hasZeroScore = scores.includes(0);

    if (totalScore >= cutoffScore && !hasZeroScore) {
        return `Thí sinh đậu với tổng điểm là ${totalScore}`;
    } else {
        return `Thí sinh rớt với tổng điểm là ${totalScore}`;
    }
}

function calculateAdmission() {
    const cutoffScore = parseFloat(document.getElementById('cutoffScore').value);
    const scores = [
        parseFloat(document.getElementById('score1').value),
        parseFloat(document.getElementById('score2').value),
        parseFloat(document.getElementById('score3').value)
    ];
    const area = document.getElementById('area').value;
    const priorityType = parseInt(document.getElementById('priorityType').value, 10);

    const result = calculateTotalScore(scores, area, priorityType, cutoffScore);
    document.getElementById('result').innerText = result;
}