var showSolved = true;

function showRowSolved(row) {
  chk = row.cells[3].querySelector('input[type="checkbox"]');
  if (chk.checked && !showSolved) {
    return false;
  }
  return true;
}

function toggleSolved() {
  // Get the main filter checkbox and the table
  const table = document.getElementById('problemTable');
  const rows = table.getElementsByTagName('tr');
  
  console.log('Toggling solved problems');


  showSolved = !showSolved;

  // Loop through all table rows, starting from index 1 to skip the header row
  for (let i = 1; i < rows.length; i++) {
    const currentRow = rows[i];
    // Get the checkbox within the current row (assuming the checkbox is in the 3rd cell (index 2))
    const rowCheckbox = currentRow.cells[3].querySelector('input[type="checkbox"]');

    // If the main filter is checked AND the row's checkbox is NOT checked, hide the row
    if (!showSolved && rowCheckbox.checked) {
      currentRow.style.display = 'none';
    } else {
      // Otherwise, ensure the row is visible
      currentRow.style.display = ''; // or 'table-row'
    }
  }
  tagFilter();
}

const checkboxes = document.querySelectorAll('.checkbox-solved');
const storageKey = 'checkboxStates';

checkboxes.forEach(checkbox => {
  checkbox.addEventListener('click', function() {
    const row = this.closest('tr');
    if (!showSolved && this.checked) {
      row.style.display = 'none';
    }
  });
})

function resetSolved() {
  for (i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = false;
  }
  showSolved = false;
  toggleSolved()
  saveCheckboxes() 
}

// Function to save all checkbox states
function saveCheckboxes() {
    const states = {};
    checkboxes.forEach(checkbox => {
        states[checkbox.id] = checkbox.checked;
    });
    // Store the states object as a JSON string
    localStorage.setItem(storageKey, JSON.stringify(states));
}

// Function to load all checkbox states
function loadCheckboxes() {
    const storedStates = localStorage.getItem(storageKey);
    if (storedStates) {
        const states = JSON.parse(storedStates);
        checkboxes.forEach(checkbox => {
            // Set the 'checked' property based on the stored state for its ID
            if (states[checkbox.id] !== undefined) {
                checkbox.checked = states[checkbox.id];
            }
        });
    }
}

// Add event listeners to all checkboxes
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', saveCheckboxes);
});

function toggleTags() {
    const cells = document.querySelectorAll(".hideable");
    cells.forEach(el => el.classList.toggle('hidden'))
}


function tagFilter() {
  var input, filter, table, tr, td, i, j, txtValue, chk;
  input = document.getElementById("tagInput");
  filter = input.value.toUpperCase();
  console.log('Filtering according to tags: ' +filter)
  filter = filter.split(' ');
  table = document.getElementById("problemTable");
  rows = table.getElementsByTagName("tr");
  for (i = 1; i < rows.length; i++) {
    if (!showRowSolved(rows[i])) {
      continue;
    }
    td = rows[i].getElementsByTagName("td")[2];
	chk = true;
    if (td) {
      txtValue = td.textContent || td.innerText;
	  txtValue = txtValue.toUpperCase();
	  for (j = 0; j < filter.length; j++) {
		if (!txtValue.includes(filter[j])) {
			rows[i].style.display = "none";
			chk = false;
			break;
		}
	  }
	  if (chk) {
		  rows[i].style.display = "";
	  }
    }       
  }
}


function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById('problemTable');
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

loadCheckboxes();