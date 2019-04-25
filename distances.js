function calcDistances() {
  const origins = [
    "Mal, Tongeren, Belgium",
    "Gent, Belgium",
    "Leest, Belgium",
    "Peer, Belgium",
    "As, Belgium",
    "Tielt, Belgium",
    "Lot, Belgium",
    "Puurs, Belgium",
    "Lint, Belgium",
    "Knokke-Heist, Belgium",
    "Reet, Belgium",
    "Bree, Belgium",
    "Schriek, Belgium",
    "Geel, Belgium",
    "Jeuk, Belgium",
    "Doel, Belgium",
    "Duffel, Belgium",
    "Sinnaai, Belgium",
    "Vorst, Belgium",
    "Niel, Belgium",
    "Mere, Belgium",
    "Gits, Belgium",
    "Boom, Belgium",
    "Haacht, Belgium"
  ];
  const destinations = origins;
  const service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origins,
      destinations,
      travelMode: "DRIVING",
      avoidTolls: true
    },
    callback
  );

  function callback({ originAddresses, destinationAddresses, rows }, status) {
    if (status == "OK") {
      const origins = originAddresses;
      const destinations = destinationAddresses;
      let output = "<table><tr><th>&nbsp;</th>";
      // FROM:
      for (var i = 0; i < origins.length; i++) {
        output += `<th>${origins[i]}</th>`;
      }
      output += "</tr>";
      for (let i = 0; i < origins.length; i++) {
        const results = rows[i].elements;
        output += `<tr><th>${destinations[i]}</th>`;

        results.forEach(element => {
          const distance = element.distance.text;
          const duration = element.duration.text;
          output += `<td>${distance}</td>`;
        });

        output += "</tr>";
      }
      output += "</table>";
      appendHtml(document.body, output);
    } else {
      console.log("PEUT, ging iets mis.");
    }
  }
}

function appendHtml(el, str) {
  const div = document.createElement("div");
  div.innerHTML = str;
  while (div.children.length > 0) {
    el.appendChild(div.children[0]);
  }
}
