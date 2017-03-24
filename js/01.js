var arr = [85, 60, 99, 49, 77, 82];
var p = 80;
var h = 200;
var w = 600;
svg();
bind();
render();

function svg() {
  d3.select('#block1').append('svg')
    .attr({
      'width': w,
      'height': h
    });
}

function bind() {
  var data = d3.select("#block1 svg")
    .selectAll("rect").data(arr);
  data.enter().append("rect");
  data.exit().remove();

  var text = d3.select('#block1 svg')
    .selectAll('text').data(arr);
  text.enter().append('text');
  text.exit().remove();
}

function render() {
  d3.selectAll("#block1 svg rect")
    .attr({
      'x': function (d, i) {
        return p + 25 * i;
      },
      'y': function (d) {
        return h - p - d;
      },
      'width': 20,
      'height': function (d) {
        return d;
      },
      'fill': function (d) {
        return d < 70 ? 'red' : 'lightgreen';
      }
    });
  d3.selectAll('#block1 svg text')
    .attr({
      'x': function (d, i) {
        return p + 25 * i + 2;
      },
      'y': function (d) {
        return h - p + 20;
      }
    })
    .text(function (d) {
      return d;
    });
}

function add() {
  arr.push(random(10, 100));
  bind(arr);
  render();
}

function remove() {
  arr.shift();
  bind(arr);
  render();
}

function update() {
  arr = arr.map(function (x) {
    return random(10, 100);
  });
  bind(arr);
  render();
}

function random(N, M) {
  var rScale = d3.scale.linear()
    .domain([0, 1])
    .rangeRound([N, M]);
  return rScale(Math.random());
}