  // Définir une requête de connection standard JS
  var request = new XMLHttpRequest();
  // Choisir la méthode GET comme une méthode d'accès au serveur et récupérer les données .
  request.open("GET", "http://127.0.0.1:3000/policies", true);
  // Load les données à partir de la serveur -> Début connection
  request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    var table = document.getElementById("policiesTable");
    console.log(data);
    var j = 1;
    data.forEach((i) => {
      // Insérer une ligne dans le tableau
      var row = table.insertRow(-1);
      // Insérer une cellule dans le tableau
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);
      var cell6 = row.insertCell(5);

      cell1.innerHTML = j;
      cell2.innerHTML = i.policyTitle;
      cell3.innerHTML = i.policyDescription;
      
      cell4.innerHTML =
        "<a href=viewPolicie.html?id=" + i._id + ">  <span class='material-symbols-outlined'>visibility</span> </a>";
      cell5.innerHTML =
        "<a href=updatePolicies.html?id=" + i._id + ">  <span class='material-symbols-outlined'>stylus</span> </a>";
      cell6.innerHTML =
        "<a href=deletePolicie.html?id=" + i._id + ">  <span class='material-symbols-outlined'>delete</span> </a>";
      j = j + 1;
    });
  };
  // Send request
  request.send();

