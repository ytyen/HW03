var svg = d3.select("#block5").append("svg").attr({
  width: "340",
  height: "340"
});

svg.append("g").append("rect").attr({
  fill: "white",
  width: "100%",
  height: "100%"
});

//--------------------------------

var easeArr = ["linear", "quad", "cubic", "sin", "exp", "circle", "elastic", "back", "bounce"];

bind5(easeArr);
render5();

function bind5(dataSet) {
  var selection_circle = svg.selectAll("circle").data(dataSet);
  var selection_text = svg.selectAll("text").data(dataSet);
  var selection_line = svg.selectAll("line").data(dataSet);

  // 初始化設定
  selection_line.enter().append("line").attr({
    x1: 100,
    y1: function (d, i) {
      return 20 + i * 35;
    },
    x2: 300,
    y2: function (d, i) {
      return 20 + i * 35;
    },
    stroke: "lightgreen"
  }).text(function (d) {
    return d;
  });
  selection_line.exit().remove();

  selection_circle.enter().append("circle").attr({
    cx: 100,
    cy: function (d, i) {
      return 20 + i * 35;
    },
    r: 15,
    fill: "gold"
  });
  selection_circle.exit().remove();

  selection_text.enter().append("text").attr({
    x: 5,
    y: function (d, i) {
      return 25 + i * 35;
    },
    fill: "black"
  }).text(function (d) {
    return d;
  });
  selection_text.exit().remove();


}

function render5() {
  //需要動畫的設定
  svg.selectAll("circle")
    .on("click", function (d) {
      if (+d3.select(this).attr('cx') > 100) {
        d3.select(this)
          .transition()
          .duration(500)
          .ease(d)
          .attr({
            cx: 100
          });
      } else {
        d3.select(this)
          .transition()
          .duration(500)
          .ease(d)
          .attr({
            cx: 300
          });
      }
    });
}