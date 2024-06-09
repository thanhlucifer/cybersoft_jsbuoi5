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


//Tinh tien dien
function calculateElectricityBill() {
    const name = document.getElementById('name').value;
    const kwh = parseFloat(document.getElementById('kwh').value);

    let totalCost = 0;
    let remainingKwh = kwh;

    if (remainingKwh > 0) {
        const first50 = Math.min(50, remainingKwh);
        totalCost += first50 * 500;
        remainingKwh -= first50;
    }

    if (remainingKwh > 0) {
        const next50 = Math.min(50, remainingKwh);
        totalCost += next50 * 650;
        remainingKwh -= next50;
    }

    if (remainingKwh > 0) {
        const next100 = Math.min(100, remainingKwh);
        totalCost += next100 * 850;
        remainingKwh -= next100;
    }

    if (remainingKwh > 0) {
        const next150 = Math.min(150, remainingKwh);
        totalCost += next150 * 1100;
        remainingKwh -= next150;
    }

    if (remainingKwh > 0) {
        totalCost += remainingKwh * 1300;
    }

    const resultText = `Khách hàng ${name} phải trả: ${totalCost} đồng cho ${kwh} kWh tiêu thụ.`;
    document.getElementById('result2').innerText = resultText;
}

//tinh thue thu nhap ca nhan
function calculateTaxableIncome(totalIncome, dependents) {
    return totalIncome - 4 - (dependents * 1.6);
}

function formatCurrency(number) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(number * 1e6); // convert triệu to đồng
}

function calculateTax() {
    const fullname = document.getElementById('fullname').value;
    const totalIncome = parseFloat(document.getElementById('totalIncome').value);
    const dependents = parseInt(document.getElementById('dependents').value, 10);

    const taxableIncome = calculateTaxableIncome(totalIncome, dependents);

    let tax = 0;
    if (taxableIncome <= 60) {
        tax = taxableIncome * 0.05;
    } else if (taxableIncome <= 120) {
        tax = 60 * 0.05 + (taxableIncome - 60) * 0.10;
    } else if (taxableIncome <= 210) {
        tax = 60 * 0.05 + 60 * 0.10 + (taxableIncome - 120) * 0.15;
    } else if (taxableIncome <= 384) {
        tax = 60 * 0.05 + 60 * 0.10 + 90 * 0.15 + (taxableIncome - 210) * 0.20;
    } else if (taxableIncome <= 624) {
        tax = 60 * 0.05 + 60 * 0.10 + 90 * 0.15 + 174 * 0.20 + (taxableIncome - 384) * 0.25;
    } else if (taxableIncome <= 960) {
        tax = 60 * 0.05 + 60 * 0.10 + 90 * 0.15 + 174 * 0.20 + 240 * 0.25 + (taxableIncome - 624) * 0.30;
    } else {
        tax = 60 * 0.05 + 60 * 0.10 + 90 * 0.15 + 174 * 0.20 + 240 * 0.25 + 336 * 0.30 + (taxableIncome - 960) * 0.35;
    }

    const resultText = `Khách hàng ${fullname} phải trả: ${formatCurrency(tax)} cho thu nhập chịu thuế là ${formatCurrency(taxableIncome)}.`;
    document.getElementById('result3').innerText = resultText;
}

//tinh tien cap
function toggleConnections() {
    const customerType = document.getElementById('customerType').value;
    const connectionsGroup = document.getElementById('connectionsGroup');
    if (customerType === 'business') {
        connectionsGroup.style.display = 'block';
    } else {
        connectionsGroup.style.display = 'none';
    }
}

function calculateCableBill() {
    const customerId = document.getElementById('customerId').value;
    const customerType = document.getElementById('customerType').value;
    const channels = parseInt(document.getElementById('channels').value) || 0;
    let connections = 0;
    if (customerType === 'business') {
        connections = parseInt(document.getElementById('connections').value) || 0;
    }

    const RESIDENTIAL_PROCESSING_FEE = 4.5;
    const RESIDENTIAL_BASIC_SERVICE_FEE = 20.5;
    const RESIDENTIAL_PREMIUM_CHANNEL_FEE = 7.5;
    
    const BUSINESS_PROCESSING_FEE = 15;
    const BUSINESS_BASIC_SERVICE_FEE = 75;
    const BUSINESS_PREMIUM_CHANNEL_FEE = 50;
    const BUSINESS_ADDITIONAL_CONNECTION_FEE = 5;
    const BUSINESS_BASIC_CONNECTION_LIMIT = 10;
    
    let total = 0;

    if (customerType === 'residential') {
        total = RESIDENTIAL_PROCESSING_FEE + 
                RESIDENTIAL_BASIC_SERVICE_FEE + 
                (RESIDENTIAL_PREMIUM_CHANNEL_FEE * channels);
    } else if (customerType === 'business') {
        let basicServiceFee = BUSINESS_BASIC_SERVICE_FEE;
        if (connections > BUSINESS_BASIC_CONNECTION_LIMIT) {
            basicServiceFee += (connections - BUSINESS_BASIC_CONNECTION_LIMIT) * BUSINESS_ADDITIONAL_CONNECTION_FEE;
        }
        total = BUSINESS_PROCESSING_FEE + 
                basicServiceFee + 
                (BUSINESS_PREMIUM_CHANNEL_FEE * channels);
    }

    document.getElementById('result4').innerText = `Mã Khách Hàng: ${customerId}\nTổng tiền cáp là: $${total.toFixed(2)}`;
}