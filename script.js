let myChart = null;

function predictSpecies() {
    const pl = parseFloat(document.getElementById('pl').value);
    const pw = parseFloat(document.getElementById('pw').value);
    const container = document.getElementById('result-container');
    const resultText = document.getElementById('prediction-text');
    const flowerImg = document.getElementById('flower-img');

    if (isNaN(pl) || isNaN(pw)) {
        alert("Please enter Petal dimensions to see the AI result!");
        return;
    }

    let species = "";
    let imgUrl = "";

    // Threshold logic from the Logistic Regression model
    if (pl <= 2.5) {
        species = "Iris Setosa";
        imgUrl = "https://upload.wikimedia.org/wikipedia/commons/5/56/Kosaciec_szczecinkowaty_Iris_setosa.jpg";
    } else if (pl <= 4.8) {
        species = "Iris Versicolor";
        imgUrl = "https://upload.wikimedia.org/wikipedia/commons/4/41/Iris_versicolor_3.jpg";
    } else {
        species = "Iris Virginica";
        imgUrl = "https://upload.wikimedia.org/wikipedia/commons/9/9f/Iris_virginica.jpg";
    }

    resultText.innerHTML = "✨ AI Prediction: " + species;
    flowerImg.src = imgUrl;
    container.style.display = "block";
    
    renderDynamicChart(pl, pw);
}

function renderDynamicChart(inputPL, inputPW) {
    const ctx = document.getElementById('featureChart').getContext('2d');
    if (myChart) { myChart.destroy(); }

    myChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [
                { label: 'Setosa', data: [{x: 1.5, y: 0.2}], backgroundColor: '#ff6384' },
                { label: 'Versicolor', data: [{x: 4.2, y: 1.3}], backgroundColor: '#36a2eb' },
                { label: 'Virginica', data: [{x: 5.5, y: 2.1}], backgroundColor: '#4bc0c0' },
                {
                    label: 'YOUR INPUT',
                    data: [{x: inputPL, y: inputPW}],
                    backgroundColor: '#1a73e8',
                    pointRadius: 10,
                    borderColor: '#000',
                    borderWidth: 2
                }
            ]
        },
        options: {
            scales: {
                x: { title: { display: true, text: 'Petal Length (cm)' }, min: 0, max: 7 },
                y: { title: { display: true, text: 'Petal Width (cm)' }, min: 0, max: 3 }
            }
        }
    });
}