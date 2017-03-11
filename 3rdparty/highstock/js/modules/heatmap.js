/*
 Highcharts JS v5.0.7 (2017-01-17)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(m){"object"===typeof module&&module.exports?module.exports=m:m(Highcharts)})(function(m){(function(c){var k=c.Axis,r=c.Chart,h=c.color,g,e=c.each,w=c.extend,x=c.isNumber,p=c.Legend,t=c.LegendSymbolMixin,y=c.noop,q=c.merge,v=c.pick,u=c.wrap;g=c.ColorAxis=function(){this.init.apply(this,arguments)};w(g.prototype,k.prototype);w(g.prototype,{defaultColorAxisOptions:{lineWidth:0,minPadding:0,maxPadding:0,gridLineWidth:1,tickPixelInterval:72,startOnTick:!0,endOnTick:!0,offset:0,marker:{animation:{duration:50},
width:.01},labels:{overflow:"justify",rotation:0},minColor:"#e6ebf5",maxColor:"#003399",tickLength:5,showInLegend:!0},keepProps:["legendGroup","legendItem","legendSymbol"].concat(k.prototype.keepProps),init:function(a,b){var d="vertical"!==a.options.legend.layout,f;this.coll="colorAxis";f=q(this.defaultColorAxisOptions,{side:d?2:1,reversed:!d},b,{opposite:!d,showEmpty:!1,title:null});k.prototype.init.call(this,a,f);b.dataClasses&&this.initDataClasses(b);this.initStops(b);this.horiz=d;this.zoomEnabled=
!1;this.defaultLegendLength=200},tweenColors:function(a,b,d){var f;b.rgba.length&&a.rgba.length?(a=a.rgba,b=b.rgba,f=1!==b[3]||1!==a[3],a=(f?"rgba(":"rgb(")+Math.round(b[0]+(a[0]-b[0])*(1-d))+","+Math.round(b[1]+(a[1]-b[1])*(1-d))+","+Math.round(b[2]+(a[2]-b[2])*(1-d))+(f?","+(b[3]+(a[3]-b[3])*(1-d)):"")+")"):a=b.input||"none";return a},initDataClasses:function(a){var b=this,d,f=0,n=this.chart.options.chart.colorCount,c=this.options,l=a.dataClasses.length;this.dataClasses=d=[];this.legendItems=[];
e(a.dataClasses,function(a,e){a=q(a);d.push(a);a.color||("category"===c.dataClassColor?(a.colorIndex=f,f++,f===n&&(f=0)):a.color=b.tweenColors(h(c.minColor),h(c.maxColor),2>l?.5:e/(l-1)))})},initStops:function(a){this.stops=a.stops||[[0,this.options.minColor],[1,this.options.maxColor]];e(this.stops,function(a){a.color=h(a[1])})},setOptions:function(a){k.prototype.setOptions.call(this,a);this.options.crosshair=this.options.marker},setAxisSize:function(){var a=this.legendSymbol,b=this.chart,d=b.options.legend||
{},f,n;a?(this.left=d=a.attr("x"),this.top=f=a.attr("y"),this.width=n=a.attr("width"),this.height=a=a.attr("height"),this.right=b.chartWidth-d-n,this.bottom=b.chartHeight-f-a,this.len=this.horiz?n:a,this.pos=this.horiz?d:f):this.len=(this.horiz?d.symbolWidth:d.symbolHeight)||this.defaultLegendLength},toColor:function(a,b){var d=this.stops,f,n,c=this.dataClasses,l,e;if(c)for(e=c.length;e--;){if(l=c[e],f=l.from,d=l.to,(void 0===f||a>=f)&&(void 0===d||a<=d)){n=l.color;b&&(b.dataClass=e,b.colorIndex=
l.colorIndex);break}}else{this.isLog&&(a=this.val2lin(a));a=1-(this.max-a)/(this.max-this.min||1);for(e=d.length;e--&&!(a>d[e][0]););f=d[e]||d[e+1];d=d[e+1]||f;a=1-(d[0]-a)/(d[0]-f[0]||1);n=this.tweenColors(f.color,d.color,a)}return n},getOffset:function(){var a=this.legendGroup,b=this.chart.axisOffset[this.side];a&&(this.axisParent=a,k.prototype.getOffset.call(this),this.added||(this.added=!0,this.labelLeft=0,this.labelRight=this.width),this.chart.axisOffset[this.side]=b)},setLegendColor:function(){var a,
b=this.options,d=this.reversed;a=d?1:0;d=d?0:1;a=this.horiz?[a,0,d,0]:[0,d,0,a];this.legendColor={linearGradient:{x1:a[0],y1:a[1],x2:a[2],y2:a[3]},stops:b.stops||[[0,b.minColor],[1,b.maxColor]]}},drawLegendSymbol:function(a,b){var d=a.padding,f=a.options,c=this.horiz,e=v(f.symbolWidth,c?this.defaultLegendLength:12),l=v(f.symbolHeight,c?12:this.defaultLegendLength),g=v(f.labelPadding,c?16:30),f=v(f.itemDistance,10);this.setLegendColor();b.legendSymbol=this.chart.renderer.rect(0,a.baseline-11,e,l).attr({zIndex:1}).add(b.legendGroup);
this.legendItemWidth=e+d+(c?f:g);this.legendItemHeight=l+d+(c?g:0)},setState:y,visible:!0,setVisible:y,getSeriesExtremes:function(){var a=this.series,b=a.length;this.dataMin=Infinity;for(this.dataMax=-Infinity;b--;)void 0!==a[b].valueMin&&(this.dataMin=Math.min(this.dataMin,a[b].valueMin),this.dataMax=Math.max(this.dataMax,a[b].valueMax))},drawCrosshair:function(a,b){var d=b&&b.plotX,c=b&&b.plotY,e,g=this.pos,l=this.len;b&&(e=this.toPixels(b[b.series.colorKey]),e<g?e=g-2:e>g+l&&(e=g+l+2),b.plotX=
e,b.plotY=this.len-e,k.prototype.drawCrosshair.call(this,a,b),b.plotX=d,b.plotY=c,this.cross&&this.cross.addClass("highcharts-coloraxis-marker").add(this.legendGroup))},getPlotLinePath:function(a,b,d,c,e){return x(e)?this.horiz?["M",e-4,this.top-6,"L",e+4,this.top-6,e,this.top,"Z"]:["M",this.left,e,"L",this.left-6,e+6,this.left-6,e-6,"Z"]:k.prototype.getPlotLinePath.call(this,a,b,d,c)},update:function(a,b){var d=this.chart,c=d.legend;e(this.series,function(a){a.isDirtyData=!0});a.dataClasses&&c.allItems&&
(e(c.allItems,function(a){a.isDataClass&&a.legendGroup.destroy()}),d.isDirtyLegend=!0);d.options[this.coll]=q(this.userOptions,a);k.prototype.update.call(this,a,b);this.legendItem&&(this.setLegendColor(),c.colorizeItem(this,!0))},getDataClassLegendSymbols:function(){var a=this,b=this.chart,d=this.legendItems,f=b.options.legend,g=f.valueDecimals,u=f.valueSuffix||"",l;d.length||e(this.dataClasses,function(f,p){var k=!0,q=f.from,h=f.to;l="";void 0===q?l="\x3c ":void 0===h&&(l="\x3e ");void 0!==q&&(l+=
c.numberFormat(q,g)+u);void 0!==q&&void 0!==h&&(l+=" - ");void 0!==h&&(l+=c.numberFormat(h,g)+u);d.push(w({chart:b,name:l,options:{},drawLegendSymbol:t.drawRectangle,visible:!0,setState:y,isDataClass:!0,setVisible:function(){k=this.visible=!k;e(a.series,function(a){e(a.points,function(a){a.dataClass===p&&a.setVisible(k)})});b.legend.colorizeItem(this,k)}},f))});return d},name:""});e(["fill","stroke"],function(a){c.Fx.prototype[a+"Setter"]=function(){this.elem.attr(a,g.prototype.tweenColors(h(this.start),
h(this.end),this.pos),null,!0)}});u(r.prototype,"getAxes",function(a){var b=this.options.colorAxis;a.call(this);this.colorAxis=[];b&&new g(this,b)});u(p.prototype,"getAllItems",function(a){var b=[],d=this.chart.colorAxis[0];d&&d.options&&(d.options.showInLegend&&(d.options.dataClasses?b=b.concat(d.getDataClassLegendSymbols()):b.push(d)),e(d.series,function(a){a.options.showInLegend=!1}));return b.concat(a.call(this))});u(p.prototype,"colorizeItem",function(a,b,d){a.call(this,b,d);d&&b.legendColor&&
b.legendSymbol.attr({fill:b.legendColor})})})(m);(function(c){var k=c.defined,r=c.each,h=c.noop;c.colorPointMixin={isValid:function(){return null!==this.value},setVisible:function(c){var e=this,g=c?"show":"hide";r(["graphic","dataLabel"],function(c){if(e[c])e[c][g]()})},setState:function(g){c.Point.prototype.setState.call(this,g);this.graphic&&this.graphic.attr({zIndex:"hover"===g?1:0})}};c.colorSeriesMixin={pointArrayMap:["value"],axisTypes:["xAxis","yAxis","colorAxis"],optionalAxis:"colorAxis",
trackerGroups:["group","markerGroup","dataLabelsGroup"],getSymbol:h,parallelArrays:["x","y","value"],colorKey:"value",translateColors:function(){var c=this,e=this.options.nullColor,k=this.colorAxis,h=this.colorKey;r(this.data,function(g){var t=g[h];if(t=g.options.color||(g.isNull?e:k&&void 0!==t?k.toColor(t,g):g.color||c.color))g.color=t})},colorAttribs:function(c){var e={};k(c.color)&&(e[this.colorProp||"fill"]=c.color);return e}}})(m);(function(c){var k=c.colorPointMixin,r=c.each,h=c.merge,g=c.noop,
e=c.pick,m=c.Series,x=c.seriesType,p=c.seriesTypes;x("heatmap","scatter",{animation:!1,borderWidth:0,dataLabels:{formatter:function(){return this.point.value},inside:!0,verticalAlign:"middle",crop:!1,overflow:!1,padding:0},marker:null,pointRange:null,tooltip:{pointFormat:"{point.x}, {point.y}: {point.value}\x3cbr/\x3e"},states:{normal:{animation:!0},hover:{halo:!1,brightness:.2}}},h(c.colorSeriesMixin,{pointArrayMap:["y","value"],hasPointSpecificOptions:!0,supportsDrilldown:!0,getExtremesFromAll:!0,
directTouch:!0,init:function(){var c;p.scatter.prototype.init.apply(this,arguments);c=this.options;c.pointRange=e(c.pointRange,c.colsize||1);this.yAxis.axisPointRange=c.rowsize||1},translate:function(){var c=this.options,e=this.xAxis,g=this.yAxis,k=function(c,a,b){return Math.min(Math.max(a,c),b)};this.generatePoints();r(this.points,function(h){var a=(c.colsize||1)/2,b=(c.rowsize||1)/2,d=k(Math.round(e.len-e.translate(h.x-a,0,1,0,1)),-e.len,2*e.len),a=k(Math.round(e.len-e.translate(h.x+a,0,1,0,1)),
-e.len,2*e.len),f=k(Math.round(g.translate(h.y-b,0,1,0,1)),-g.len,2*g.len),b=k(Math.round(g.translate(h.y+b,0,1,0,1)),-g.len,2*g.len);h.plotX=h.clientX=(d+a)/2;h.plotY=(f+b)/2;h.shapeType="rect";h.shapeArgs={x:Math.min(d,a),y:Math.min(f,b),width:Math.abs(a-d),height:Math.abs(b-f)}});this.translateColors()},drawPoints:function(){p.column.prototype.drawPoints.call(this);r(this.points,function(c){c.graphic.css(this.colorAttribs(c))},this)},animate:g,getBox:g,drawLegendSymbol:c.LegendSymbolMixin.drawRectangle,
alignDataLabel:p.column.prototype.alignDataLabel,getExtremes:function(){m.prototype.getExtremes.call(this,this.valueData);this.valueMin=this.dataMin;this.valueMax=this.dataMax;m.prototype.getExtremes.call(this)}}),k)})(m)});