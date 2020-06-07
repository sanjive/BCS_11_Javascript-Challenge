// YOUR CODE HERE!
// UFO data from data.js
var dataUFO = data;
// Sample data - Data Object is an array of key-value pairs
/*
    data = [{
        datetime: "1/1/2010",
        city: "benton",
        state: "ar",
        country: "us",
        shape: "circle",
        durationMinutes: "5 mins.",
        comments: "4 bright green circles high in the sky going in circles then one bright green light at my front door."
    }]
*/

// ----> Body
// Get reference to the body section
var bodyUFO = d3.select('body');

// ----> Table
// Get reference to the UFO Table (id="ufo-table")
var tblUFO = bodyUFO.select('#ufo-table');
// Get reference to the UFO Table tbody
var tbodyUFO = tblUFO.select('tbody');

// ----> Filter Form
// Get reference to the UFO Table (id="filter-form")
var frmFilterUFO = bodyUFO.select('#filter-form');
// Get reference to the DateTime filter filed (id="datetime")
var filterDatetime = frmFilterUFO.select("#datetime");
// Get reference to the City filter filed (id="city")
var filterCity = frmFilterUFO.select("#city");
// Get reference to the State filter filed (id="state")
var filterState = frmFilterUFO.select("#state");
// Get reference to the Country filter filed (id="country")
var filterCountry = frmFilterUFO.select("#country");
// Get reference to the shape filter filed (id="shape")
var filterShape = frmFilterUFO.select("#shape");

// ----> Button
// Get reference to the filter button (id="filter-btn")
var btnFilter = frmFilterUFO.select("#filter-btn");
// Get reference to the Reset Button (id="reset-btn")
var btnReset = frmFilterUFO.select("#reset-btn");

var renderTable = (tableData, tbodyTable) => {
    // Populates the tbodyTable with tableData
    tableData.forEach((record) => {
        // Append one table row `tr` for each UFO Sighting record
        var row = tbodyTable.append("tr");
        Object.entries(record).forEach(([key, value]) => {
            // Append a cell `td` to the row for each value (Column)
            var cell = row.append("td");
            cell.text(value);
        });
    });
};

function resetTable() {
    //reset the table and populate with original data
    tbodyUFO.html("");
    renderTable(dataUFO, tbodyUFO);
};

// Filter by attribute on `filterButton` Button Click Event
function processFilters() {
    // Prevent the page from refreshing
    d3.event.preventDefault();
    // Initialization `tbodyUFO` tbody data to `Blanks` to clear previous data
    tbodyUFO.html("");

    // ----> Process Date Filter `filterDatetime`
    var inputDateTime = filterDatetime.property("value").trim();
    console.log(inputDateTime);
    // ----> Process City Filter `filterCity`
    var inputCity = filterCity.property("value").toLowerCase().trim();
    console.log(inputCity);
    // ----> Process State Filter `filterState`
    var inputState = filterState.property("value").toLowerCase().trim();
    console.log(inputState);
    // ----> Process Country Filter `filterCountry`
    var inputCountry = filterCountry.property("value").toLowerCase().trim();
    console.log(inputCountry);
    // ----> Process Shape Filter `filterShape`
    var inputShape = filterShape.property("value").toLowerCase().trim();
    console.log(inputShape);

    // Initialize the filteredDataUFO to dataUFO
    // At this time the data has not been subject to any filteration.
    filteredDataUFO = dataUFO;

    //Process the filters - This will result in all filters being evaluated together.
    // Filter `dataUFO` Data with datetime value selected
    if (inputDateTime != "") { var filteredDataUFO = filteredDataUFO.filter(UFORecord => UFORecord.datetime === inputDateTime) };
    // Filter `dataUFO` Data with city value selected
    if (inputCity != "") { var filteredDataUFO = filteredDataUFO.filter(UFORecord => UFORecord.city === inputCity) };
    // Filter `dataUFO` Data with state value selected
    if (inputState != "") { var filteredDataUFO = filteredDataUFO.filter(UFORecord => UFORecord.state === inputState) };
    // Filter `dataUFO` Data with country value selected
    if (inputCountry != "") { var filteredDataUFO = filteredDataUFO.filter(UFORecord => UFORecord.country === inputCountry) };
    // Filter `dataUFO` Data with shape value selected
    if (inputShape != "") { var filteredDataUFO = filteredDataUFO.filter(UFORecord => UFORecord.shape === inputShape) };

    // Render the table with data based on the filter selection, if no records returned then display 'No Results found!' message.
    if (filteredDataUFO.length !== 0) { renderTable(filteredDataUFO, tbodyUFO) } else { tbodyUFO.append("tr").append("td").text("No results found!") };
};

// Create event handlers
// `bodyUFO` Body OnLoad Event
bodyUFO.on("onLoad", resetTable);
//bodyUFO.on("onLoad", renderTable(dataUFO, tbodyUFO));
// `btnFilter` Button Click Event
btnFilter.on("click", processFilters);
// `frmFilterUFO` Form Submit Event
frmFilterUFO.on("submit", processFilters);
// `btnReset` Button Click Event
btnReset.on("click", resetTable);

// On page load event - Render the table with data and display
resetTable();
