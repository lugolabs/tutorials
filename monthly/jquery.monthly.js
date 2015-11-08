(function($) {

  $.fn.monthly = function(options) {

    var months = options.months || ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

      Monthly = function(el) {
        this._el = $(el);
        this._init();
        this._render();
        this._renderYears();
        this._renderMonths();
        this._bind();
      };

    Monthly.prototype = {
      _init: function() {
        this._el.html(months[0] + ' ' + options.years[0]);
      },

      _render: function() {
        var linkPosition = this._el.position(),
          cssOptions = {
            display: 'none',
            position: 'absolute',
            top: linkPosition.top + this._el.height() + (options.topOffset || 0),
            left: linkPosition.left
          };
        this._container = $('<div class="monthly-wrp">')
          .css(cssOptions)
          .appendTo($('body'));
      },

      _bind: function() {
        var self = this;
        this._el.on('click', $.proxy(this._show, this));
        $(document).on('click', $.proxy(this._hide, this));
        this._yearsSelect.on('click', function(e) { e.stopPropagation(); });
        this._container.on('click', 'button', $.proxy(this._selectMonth, this));
      },

      _show: function(e) {
        e.preventDefault();
        e.stopPropagation();
        this._container.css('display', 'inline-block');
      },

      _hide: function() {
        this._container.css('display', 'none');
      },

      _selectMonth: function(e) {
        var monthIndex = $(e.target).data('value'),
          month = months[monthIndex],
          year = this._yearsSelect.val();
        this._el.html(month + ' ' + year);
        if (options.onMonthSelect) {
          options.onMonthSelect(monthIndex, year);
        }
      },

      _renderYears: function() {
        var markup = $.map(options.years, function(year) {
          return '<option>' + year + '</option>';
        });
        var yearsWrap = $('<div class="years">').appendTo(this._container);
        this._yearsSelect = $('<select>').html(markup.join('')).appendTo(yearsWrap);
      },

      _renderMonths: function() {
        var markup = ['<table>', '<tr>'];
        $.each(months, function(i, month) {
          if (i > 0 && i % 4 === 0) {
            markup.push('</tr>');
            markup.push('<tr>');
          }
          markup.push('<td><button data-value="' + i + '">' + month +'</button></td>');
        });
        markup.push('</tr>');
        markup.push('</table>');
        this._container.append(markup.join(''));
      }
    };

    return this.each(function() {
      return new Monthly(this);
    });

  };

}(jQuery));
