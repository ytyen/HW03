// 1. 定義width, height, padding, letterList變數
var w = 1000;
var h = 600;
var padding = 100;
var letterList = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "M", "N", "O", "P", "Q", "T", "U", "V",
  "W", "X", "Z"
];

//2. 建立svg()畫布環境

svg4();

function mid(d) {
  d.amount = +d.amount || 0;
  d.number = +d.number || 0;
  return d;
}

//3. 用d3讀取csv
d3.csv("https://raw.githubusercontent.com/ytyen/HW03/master/data/invoice.csv", mid, function (dataSet) {

  bind4(dataSet);
  render4(dataSet);

});

function svg4() {
  d3.select("#block4").append("svg").attr({
    width: w,
    height: h
  });
  d3.select("#block4 svg").append("g").append("rect").attr({
    width: "100%",
    height: "100%",
    fill: "white"
  });
}

//4. 建立bind()

function bind4(dataSet) {
  var selection = d3.select("#block4 svg")
    .selectAll("circle")
    .data(dataSet);

  selection.enter().append("circle");
  selection.exit().remove();
}

function render4(dataSet) {
  //5. 定義xScale,yScale,rScale, fScale比例尺(range目的在決定在svg上位置)

  var xScale = d3.time.scale()
    .domain([
      new Date("2013-01-01"),
      new Date("2016-08-01")
    ])
    .range([padding, w - padding]);
  var yScale = d3.scale.linear()
    .domain([
      0,
      d3.max(dataSet, function (d) {
        return d.number
      })
    ])
    .range([h - padding, padding]);
  var rScale = d3.scale.linear()
    .domain([
      d3.min(dataSet, function (d) {
        return d.amount;
      }),
      d3.max(dataSet, function (d) {
        return d.amount;
      })
    ])
    .range([5, 30]);
  var fScale = d3.scale.category20();

  // Axis
  var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient('bottom');
  var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient('left');

  //6. 建立render()繪圖
  d3.select("#block4").selectAll("circle")
    .attr({
      cx: function (d) {
        return xScale(new Date(d.date));
      },
      cy: function (d) {
        return yScale(d.number);
      },
      r: function (d) {
        return rScale(d.amount);
      },
      fill: function (d, i) {
        return fScale(d.cid);
      }
    });

  d3.select('#block4 svg')
    .append('g')
    .classed('axis', true)
    .attr('transform', 'translate(0,' + (h - padding + 20) + ')')
    .call(xAxis);

  d3.select('#block4 svg')
    .append('g')
    .classed('axis', true)
    .attr('transform', 'translate(' + (padding - 20) + ',0)')
    .call(yAxis);
}