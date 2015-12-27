(function($, undefined) {

  $.widget('ui.weekpicker', {
    _weekOptions: {
      showOtherMonths:   true,
      selectOtherMonths: true
    },

    _create: function() {
      var self = this;
      this._dateFormat = this.options.dateFormat || $.datepicker._defaults.dateFormat;
      var date = this._initialDate();
      this._setWeek(date);
      var onSuccess = this.options.onSuccess;
      this._picker = $(this.element).datepicker($.extend(this.options, this._weekOptions, {
        onSelect: function(dateText, inst) {
          self._setWeek(self._picker.datepicker('getDate'));
          var startDateText = $.datepicker.formatDate(self._dateFormat, self._startDate, inst.settings);
          self._picker.val(startDateText);
          if (onSuccess) onSuccess(dateText, startDateText, self._startDate, self._endDate, inst);
        },
        beforeShowDay: function(date) {
          var cssClass = date >= self._startDate && date <= self._endDate ? 'ui-datepicker-current-day' : '';
          return [true, cssClass];
        },
        onChangeMonthYear: function(year, month, inst) {
          self._selectCurrentWeek();
        }
      }));
      $(document)
        .on('mousemove',  '.ui-datepicker-calendar tr', function() { $(this).find('td a').addClass('ui-state-hover'); })
        .on('mouseleave', '.ui-datepicker-calendar tr', function() { $(this).find('td a').removeClass('ui-state-hover'); });
      this._picker.datepicker('setDate', date);
    },

    _initialDate: function() {
      if (this.options.currentText) {
        return $.datepicker.parseDate(this._dateFormat, this.options.currentText);
      } else {
        return new Date;
      }
    },

    _setWeek: function(date) {
      this._startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
      this._endDate   = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 6);
    },

    _selectCurrentWeek: function() {
      $('.ui-datepicker-calendar')
        .find('.ui-datepicker-current-day a')
        .addClass('ui-state-active');
    }
  });

})(jQuery);
