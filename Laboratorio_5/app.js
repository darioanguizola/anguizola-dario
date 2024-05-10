var PieChartModule = (function () {
  var myCanvas = document.getElementById("myCanvas");
  myCanvas.width = 400;
  myCanvas.height = 400;
  var ctx = myCanvas.getContext("2d");

  function drawPieSlice(centerX, centerY, radius, startAngle, endAngle, color) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fill();
  }

  var Piechart = function (options) {
      this.canvas = options.canvas;
      this.ctx = this.canvas.getContext("2d");
      this.colors = options.colors;
      this.data = options.data;
      this.draw = function () {
          var total_value = 0;
          var color_index = 0;
          for (var categ in this.data) {
              var val = this.data[categ];
              total_value += val;
          }
          var start_angle = 0;
          for (categ in this.data) {
              val = this.data[categ];
              var slice_angle = (2 * Math.PI * val) / total_value;
              drawPieSlice(
                  this.canvas.width / 2,
                  this.canvas.height / 2,
                  Math.min(this.canvas.width / 2, this.canvas.height / 2),
                  start_angle,
                  start_angle + slice_angle,
                  this.colors[color_index % this.colors.length]
              );
              start_angle += slice_angle;
              color_index++;
          }
      };
      this.updateData = function (newData) {
          this.data = newData;
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          this.draw();
      };
  };

  let myCandidate = {};

  let myPiechart = new Piechart({
      canvas: myCanvas,
      data: myCandidate,
      colors: [],
  });
  myPiechart.draw();

  function agregarElemento(nombre, valor) {
      myCandidate[nombre] = valor;
      let colorAleatorio = '#' + Math.floor(Math.random() * 16777215).toString(16);
      myPiechart.colors.push(colorAleatorio);
      myPiechart.updateData(myCandidate);

      let btn = document.createElement("button");
      btn.textContent = nombre;
      btn.onclick = function () {
          PieChartModule.incrementarElemento(nombre);
      };
      document.body.appendChild(btn);
  }

  function incrementarElemento(nombre) {
      myCandidate[nombre]++;
      myPiechart.updateData(myCandidate);
  }

  function eliminarElemento(nombre) {
      delete myCandidate[nombre];
      myPiechart.colors.splice(myPiechart.colors.indexOf(myCandidate[nombre]), 1);
      myPiechart.updateData(myCandidate);

      var btns = document.getElementsByTagName("button");
      for (var i = 0; i < btns.length; i++) {
          if (btns[i].textContent === nombre) {
              btns[i].parentNode.removeChild(btns[i]);
              break;
          }
      }
  }

  function agregarNuevoGenero() {
      var nombre = prompt("Ingrese el nombre del nuevo género:");
      if (nombre) {
          agregarElemento(nombre, 1);
      } else {
          alert("Debe ingresar un nombre válido.");
      }
  }

  function eliminarGenero() {
      var nombre = prompt("Ingrese el nombre del género a eliminar:");
      if (nombre && myCandidate.hasOwnProperty(nombre)) {
          eliminarElemento(nombre);
      } else {
          alert("Debe ingresar un nombre válido que exista en el gráfico.");
      }
  }

  return {
      agregarElemento: agregarElemento,
      incrementarElemento: incrementarElemento,
      eliminarElemento: eliminarElemento,
      agregarNuevoGenero: agregarNuevoGenero,
      eliminarGenero: eliminarGenero,
  };
})();
