var dataSet = [{
  "date": "2016/8/1",
  "city": "臺北市",
  "cid": "A",
  "industry": "不動產開發業",
  "platform": "無載具",
  "number": 1530691,
  "amount": 2081432419
}, {
  "date": "2016/8/1",
  "city": "臺北市",
  "cid": "A",
  "industry": "批發業",
  "platform": "無載具",
  "number": 4142289,
  "amount": 5565063958
}, {
  "date": "2016/8/1",
  "city": "臺北市",
  "cid": "A",
  "industry": "資料處理及資訊供應服務業",
  "platform": "無載具",
  "number": 780708,
  "amount": 1359622827
}, {
  "date": "2016/8/1",
  "city": "臺北市",
  "cid": "A",
  "industry": "零售業",
  "platform": "無載具",
  "number": 64927420,
  "amount": 19680973217
}, {
  "date": "2016/8/1",
  "city": "臺北市",
  "cid": "A",
  "industry": "電信業",
  "platform": "無載具",
  "number": 225300,
  "amount": 2302012551
}, {
  "date": "2016/8/1",
  "city": "臺北市",
  "cid": "A",
  "industry": "餐飲業",
  "platform": "無載具",
  "number": 9855745,
  "amount": 5193141219
}, {
  "date": "2016/8/1",
  "city": "臺北市",
  "cid": "A",
  "industry": "影片服務、聲音錄製及音樂出版業",
  "platform": "使用載具",
  "number": 1518980,
  "amount": 2606453896
}, {
  "date": "2016/8/1",
  "city": "臺北市",
  "cid": "A",
  "industry": "資料處理及資訊供應服務業",
  "platform": "使用載具",
  "number": 3936592,
  "amount": 2441866930
}, {
  "date": "2016/8/1",
  "city": "臺北市",
  "cid": "A",
  "industry": "零售業",
  "platform": "使用載具",
  "number": 9675319,
  "amount": 4693713798
}, {
  "date": "2016/8/1",
  "city": "臺北市",
  "cid": "A",
  "industry": "電信業",
  "platform": "使用載具",
  "number": 15939352,
  "amount": 15982550394
}, {
  "date": "2016/8/1",
  "city": "臺北市",
  "cid": "A",
  "industry": "電力及燃氣供應業",
  "platform": "使用載具",
  "number": 688044,
  "amount": 6096595655
}];

var svg = d3.select('#block3').append('svg')
  .attr({
    width: '100%',
    height: 300
  })
bind3(dataSet);
render3();

function bind3(dataSet) {
  var selection = svg
    .selectAll("rect")
    .data(dataSet);
  selection.enter().append("rect");
  selection.exit().remove();

  var selection_text = svg
    .selectAll("text")
    .data(dataSet);
  selection_text.enter().append("text");
  selection_text.exit().remove();
}

function render3() {
  var xScale = d3.scale.linear()
    .domain([0,
      d3.max(dataSet, function (d) {
        return d.amount;
      })
    ])
    .range([0, 300]);

  var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient('bottom')
    .ticks(3)
    .tickFormat(function (d) {
      return d / 1000000000 + 'G';
    });

  svg.selectAll("rect")
    .attr({
      x: 300,
      y: function (d, i) {
        return 10 + 20 * i;
      },
      width: function (d, i) {
        return xScale(d.amount);
      },
      height: 18,
      fill: "red"
    });
  svg.selectAll("text")
    .attr({
      x: 10,
      y: function (d, i) {
        return 25 + 20 * i;
      }
    }).text(function (d) {
      return d.industry;
    });

  svg.append('g')
     .classed('axis', true)
     .attr('transform', 'translate(300,240)')
     .call(xAxis);
}