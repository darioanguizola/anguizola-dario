const App = (() => {
  // Variables privadas
  const candidates = [];
  let pieChart; // Variable para almacenar el gráfico de pastel

  // Elementos HTML
  const htmlElements = {
    chart: document.getElementById("chart"),
    form: document.getElementById("form"),
    results: document.getElementById("results"),
    pieChartCanvas: document.getElementById("pieChartCanvas")
  };

  // Funciones privadas
  const addCandidate = (name, color) => {
    candidates.push({ name: name, color: color, points: 1 });
    render();
    drawChart();
    drawPieChart();
  };

  const removeCandidate = (index) => {
    candidates.splice(index, 1);
    render();
    drawChart();
    drawPieChart();
  };

  const addPoints = (index, points) => {
    candidates[index].points += points;
    render();
    drawChart();
    drawPieChart();
  };

  const render = () => {
    htmlElements.results.innerHTML = candidates.map((candidate, index) => {
      return cardTemplate(candidate.name, candidate.color, candidate.points, index);
    }).join("");
  };

  const drawChart = () => {
    const sumOfPoints = candidates.reduce((acc, candidate) => acc + candidate.points, 0);
    const html = candidates.map(candidate => {
      const percentage = (candidate.points / sumOfPoints) * 100;
      return `<div class="bar" style="width: ${percentage}%; background-color: ${candidate.color};"></div>`;
    });
    htmlElements.chart.innerHTML = html.join("");
  };

  const drawPieChart = () => {
    // Destruir el gráfico anterior si existe
    if (typeof pieChart !== 'undefined') {
      pieChart.destroy();
    }

    const ctx = htmlElements.pieChartCanvas.getContext("2d");
    const labels = candidates.map(candidate => candidate.name);
    const data = candidates.map(candidate => candidate.points);
    const backgroundColors = candidates.map(candidate => candidate.color);

    // Crear un nuevo gráfico de pastel
    pieChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: backgroundColors
        }]
      }
    });
  };

  const bindEvents = () => {
    htmlElements.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = e.target.name.value;
      const color = e.target.color.value;
      addCandidate(name, color);
    });

    htmlElements.results.addEventListener("click", (e) => {
      const target = e.target;
      if (target.classList.contains("add")) {
        const index = parseInt(target.dataset.index);
        addPoints(index, 1);
      } else if (target.classList.contains("substract")) {
        const index = parseInt(target.dataset.index);
        addPoints(index, -1);
      } else if (target.classList.contains("remove")) {
        const index = parseInt(target.dataset.index);
        removeCandidate(index);
      }
    });
  };

  // Plantilla para la tarjeta del candidato
  const cardTemplate = (name, color, points, index) => { // Actualización de la función
    return `
      <div class="card" data-index="${index}" data-count="${points}" data-name="${name}" data-color="${color}">
        <h2>
          <div>${name}</div>
          <div>
            <span class="count">${points}</span>
            <div class="pill" style="background-color: ${color};"></div>
          </div>
        </h2>
        <div class="card-footer">
          <button class="substract" data-index="${index}">-</button>
          <button class="add" data-index="${index}">+</button> 
          <button class="remove" data-index="${index}">Eliminar</button>
        </div>
      </div>
    `;
  };

  // Inicialización del módulo
  const init = () => {
    bindEvents();
  };

  // Interfaz pública
  return {
    init: init,
  };
})();

// Inicialización de la aplicación
App.init();
