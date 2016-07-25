(function($) {
    var options = {};

    function init(plot) {
        plot.hooks.draw.push(function(plot, ctx) {
            // DRAW
            $.each(plot.getAxes(), function(axisName, axis) {

                var opts = axis.options // Flot 0.7
                    || plot.getOptions()[axisName]; // Flot 0.6
                if (!opts) return;

                var label = $.extend({
                    fontSize: 12,
                    fontName: 'Arial',
                    text: '',
                    color: '#333333',
                    marginLeft: 20,
                    marginRight: 20
                }, opts.label);

                if (!label.text) return;

                var ctx = plot.getCanvas().getContext('2d');
                ctx.save();
                ctx.font = label.fontSize + 'px ' + label.fontName
                var width = ctx.measureText(label.text).width;
                var height = label.fontSize;
                var x, y;
                if (axisName.charAt(0) == 'x') {
                    x = plot.getPlotOffset().left + plot.width() / 2 - width / 2;
                    y = plot.getCanvas().height;
                } else {
                    var w = plot.getCanvas().clientWidth;
                    var h = plot.getCanvas().clientHeight;
                    if (axis.position == 'left') {
                        x = parseInt(label.marginLeft);
                    } else if (axis.position == 'right') {
                        x = w - parseInt(label.marginRight);
                    }
                    y = h / 2 - width / 2 + width;
                }
                ctx.fillStyle = label.color;
                ctx.translate(x, y);
                ctx.rotate((axisName.charAt(0) == 'x') ? 0 : -Math.PI / 2);
                ctx.fillText(label.text, 0, 0);
                ctx.restore();

            });
        });
    }

    $.plot.plugins.push({
        init: init,
        options: options,
        name: 'jqueryFlotAxesLabel',
        version: '1.0'
    });
})(jQuery);
