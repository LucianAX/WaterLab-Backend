let insertIntoTable = measurement => {
    let measurementsTable = document.getElementById('measurements-table-body');
    let newTableRow = document.createElement('tr');
    
    newTableRow.innerHTML =
        `
        <td>${measurement.id}</td>
        <td>${measurement.timestamp}</td>
        <td>${measurement.ph_value}</td>
        <td>${measurement.temperature_celsius}</td>
        <td>${measurement.electric_conductivity}</td>
        `;

    measurementsTable.appendChild(newTableRow);
}

async function getMeasurements () {
    //sends request
    try {
        //sends request
        const response = await fetch('http://localhost:4000/api/measurements', {
            method: 'GET'
        });

        //handles response if successful
        if (response.ok) {
            const jsonResponse = await response.json();
            
            //Code to execute with jsonResponse
            // console.log(jsonResponse);

            jsonResponse.measurements.forEach(measurement => insertIntoTable(measurement));
            // insertIntoTable(jsonResponse.measurements[0]);
        }
    } 
    //handles response if unsuccessful
    catch (error) {
        console.log(error);
    }
}

getMeasurements();




// //create new object
// const xhr = new XMLHttpRequest();
// const url = 'http://localhost:4000/api/measurements';

// //handle response
// xhr.responseType = 'json';
// xhr.onreadystatechange = () => {
//     if (xhr.readyState === XMLHttpRequest.DONE) {
//         //Code to execute with response
//         console.log('E bine');
//         console.log(xhr.response);
//     }
// };

// //open request and send object
// xhr.open('GET', url);
// xhr.send();



