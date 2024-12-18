const unitData = {
    length: ['meters', 'kilometers', 'feet', 'miles'],
    weight: ['grams', 'kilograms', 'pounds', 'ounces'],
    temperature: ['celsius', 'fahrenheit', 'kelvin']
};

const conversions = {
    length: {
        meters: { meters: 1, kilometers: 0.001, feet: 3.281, miles: 0.000621 },
        kilometers: { meters: 1000, kilometers: 1, feet: 3281, miles: 0.621 },
        feet: { meters: 0.3048, kilometers: 0.0003048, feet: 1, miles: 0.000189 },
        miles: { meters: 1609.34, kilometers: 1.609, feet: 5280, miles: 1 }
    },
    weight: {
        grams: { grams: 1, kilograms: 0.001, pounds: 0.00220462, ounces: 0.035274 },
        kilograms: { grams: 1000, kilograms: 1, pounds: 2.20462, ounces: 35.274 },
        pounds: { grams: 453.592, kilograms: 0.453592, pounds: 1, ounces: 16 },
        ounces: { grams: 28.3495, kilograms: 0.0283495, pounds: 0.0625, ounces: 1 }
    },
    temperature: {
        celsius: { celsius: 1, fahrenheit: (c) => (c * 9/5) + 32, kelvin: (c) => c + 273.15 },
        fahrenheit: { celsius: (f) => (f - 32) * 5/9, fahrenheit: 1, kelvin: (f) => (f + 459.67) * 5/9 },
        kelvin: { celsius: (k) => k - 273.15, fahrenheit: (k) => (k * 9/5) - 459.67, kelvin: 1 }
    }
};

function populateUnits() {
    const unitType = document.getElementById('unitType').value;
    const inputUnit = document.getElementById('inputUnit');
    const outputUnit = document.getElementById('outputUnit');

    inputUnit.innerHTML = outputUnit.innerHTML = '';

    unitData[unitType].forEach(unit => {
        const option1 = document.createElement('option');
        const option2 = document.createElement('option');
        option1.value = option2.value = unit;
        option1.text = option2.text = unit.charAt(0).toUpperCase() + unit.slice(1);
        inputUnit.add(option1);
        outputUnit.add(option2);
    });
}

function convert() {
    const unitType = document.getElementById('unitType').value;
    const inputUnit = document.getElementById('inputUnit').value;
    const outputUnit = document.getElementById('outputUnit').value;
    const inputValue = parseFloat(document.getElementById('inputValue').value);

    let outputValue;
    if (typeof conversions[unitType][inputUnit][outputUnit] === 'function') {
        outputValue = conversions[unitType][inputUnit][outputUnit](inputValue);
    } else {
        outputValue = inputValue * conversions[unitType][inputUnit][outputUnit];
    }
    document.getElementById('outputValue').value = outputValue;
}

document.getElementById('unitType').addEventListener('change', populateUnits);

// Initial population of units based on default selection
populateUnits();