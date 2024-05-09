// app.js
(() => {
  const App = {
    htmlElements: {
      form: document.getElementById("form"),
      candidatesList: document.getElementById("candidates-list"),
    },
    init() {
      App.bindEvents();
    },
    bindEvents() {
      App.htmlElements.form.addEventListener("submit", App.handlers.onSubmit);
      App.htmlElements.candidatesList.addEventListener("click", App.handlers.onClick);
    },
    handlers: {
      onSubmit(e) {
        e.preventDefault();
        const name = e.target.name.value;
        const color = e.target.color.value;
        CandidateController.addCandidate(name, color);
        App.renderCandidates();
      },
      onClick(e) {
        if (e.target.classList.contains('remove')) {
          const index = parseInt(e.target.parentElement.dataset.index);
          CandidateController.removeCandidate(index);
          App.renderCandidates();
        } else if (e.target.classList.contains('add-points')) {
          const index = parseInt(e.target.parentElement.dataset.index);
          CandidateController.addPoints(index);
          App.renderCandidates();
        }
      },
    },
    renderCandidates() {
      const candidatesList = App.htmlElements.candidatesList;
      candidatesList.innerHTML = '';
      const totalPoints = CandidateController.getTotalPoints();
      CandidateController.getCandidates().forEach((candidate, index) => {
        const percentage = totalPoints === 0 ? 0 : (candidate.points / totalPoints) * 100;
        const candidateDiv = document.createElement('div');
        candidateDiv.classList.add('candidate');
        candidateDiv.dataset.index = index;
        candidateDiv.innerHTML = `
          <div class="color-indicator" style="background-color: ${candidate.color}"></div>
          <div class="bar" style="width: ${percentage}%"></div>
          <span>${candidate.name} (${candidate.points})</span>
          <button class="remove">Eliminar</button>
          <button class="add-points">Agregar Punto</button>
        `;
        candidatesList.appendChild(candidateDiv);
      });
    },
  };

  const CandidateController = {
    candidates: [],
    addCandidate(name, color) {
      this.candidates.push({ name, color, points: 0 });
    },
    removeCandidate(index) {
      this.candidates.splice(index, 1);
    },
    addPoints(index) {
      this.candidates[index].points++;
    },
    getCandidates() {
      return this.candidates;
    },
    getTotalPoints() {
      return this.candidates.reduce((total, candidate) => total + candidate.points, 0);
    },
  };

  App.init();
})();