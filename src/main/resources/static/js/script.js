document.addEventListener('DOMContentLoaded', function () {
    var addRowButton = document.querySelector('.add-row')
    var meanButton = document.querySelector('.mean-button')
    var weightedButton = document.querySelector('.weighted-button')
    var assignmentCounter = 1

    // add assignment counter


    // Function to add a new row
    addRowButton.onclick = function () {
        var table = document.getElementsByTagName('tbody')[0]
        var newRow = document.createElement('tr')
        assignmentCounter++

        newRow.innerHTML = `
            <td>Activity ${assignmentCounter}</td>
            <td>A${assignmentCounter}</td>
            <td><input type="text" class="input-weight" /></td>
            <td>
                <input type="text" class="input-gradeNum" name="gradeNum" /> /
                <input type="text" class="input-gradeDen" name="gradeDen" />
            </td>
            <td></td>
        `;

        table.appendChild(newRow)
        addLiveUpdate()
    };

    // Function to calculate mean of grades
    function calculateMean() {
        var grades = document.getElementsByName('gradeNum')
        var denominators = document.getElementsByName('gradeDen')
        var sum = 0
        var count = 0

        for (var i = 0; i < grades.length; i++) {
            var num = parseFloat(grades[i].value)
            var den = parseFloat(denominators[i].value)
            if (!isNaN(num) && !isNaN(den) && den != 0) {
                sum += num / den
                count++
            }
        }

        var mean = sum / count
        displayResult('Mean of grades: ' + (mean * 100).toFixed(2) + '%')
    }

    // Function to calculate weighted grades
    function calculateWeighted() {
        var grades = document.getElementsByName('gradeNum')
        var denominators = document.getElementsByName('gradeDen')
        var weights = document.getElementsByClassName('input-weight')
        var weightedSum = 0
        var totalWeight = 0

        for (var i = 0; i < grades.length; i++) {
            var num = parseFloat(grades[i].value)
            var den = parseFloat(denominators[i].value)
            var weight = parseFloat(weights[i].value)

            if (!isNaN(num) && !isNaN(den) && den != 0 && !isNaN(weight)) {
                weightedSum += (num / den) * weight
                totalWeight += weight
            }
        }

        var weightedMean = weightedSum / totalWeight
        displayResult('Weighted grades: ' + (weightedMean * 100).toFixed(2) + '%')
    }

    // Add event listeners to calculation buttons
    meanButton.onclick = calculateMean
    weightedButton.onclick = calculateWeighted

    // Function to update the result display
    function displayResult(result) {
        var resultDisplay = document.querySelector('.result')
        resultDisplay.textContent = result
    }

    // Live update for percentage column
    function addLiveUpdate() {
        var gradeInputs = document.getElementsByName('gradeNum')
        var denInputs = document.getElementsByName('gradeDen')

        for (var i = 0; i < gradeInputs.length; i++) {
            gradeInputs[i].oninput = updatePercent
            denInputs[i].oninput = updatePercent
        }
    }

    function updatePercent() {
        var row = this.closest('tr')
        var gradeNum = parseFloat(row.querySelector('input[name="gradeNum"]').value)
        var gradeDen = parseFloat(row.querySelector('input[name="gradeDen"]').value)

        if (!isNaN(gradeNum) && !isNaN(gradeDen) && gradeDen != 0) {
            var percent = (gradeNum / gradeDen) * 100
            row.querySelector('td:last-child').textContent = percent.toFixed(2) + '%'
        } else {
            row.querySelector('td:last-child').textContent = ''
        }
    }

    // Initialize live update for the first row
    addLiveUpdate()
});
