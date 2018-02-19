/**
 * Part of phoenix project.
 *
 * @copyright  Copyright (C) 2017 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

;(function($) {
  "use strict";

  var plugin = 'listDependent';

  var nope = function(value, ele, dep) {
  };

  var defaultOptions = {
    ajax: {
      url: null,
      value_field: 'value'
    },
    source: null,
    text_field: 'title',
    value_field: 'id',
    first_option: null,
    default_value: null,
    initial_load: true,
    empty_mark: '__EMPTY__',
    hooks: {
      before_request: nope,
      after_request: nope
    }
  };

  /**
   * Class init.
   * @param {jQuery}        $element
   * @param {jQuery|string} dependent
   * @param {Object}        options
   * @constructor
   */
  var ListDependent = function($element, dependent, options) {
    this.element = $element;
    this.options = $.extend(true, {}, defaultOptions, options);
    this.dependent = $(dependent);

    this.bindEvents();

    if (this.options.initial_load) {
      this.changeList(this.dependent.val(), true);
    }
  };

  ListDependent.prototype = {

    /**
     * Bind events.
     */
    bindEvents: function() {
      var self = this;

      this.dependent.on('change', function(event) {
        var $this = $(this);
        self.changeList($this.val());
      });
    },

    /**
     * Update the list elements.
     *
     * @param {*}    value
     * @param {bool} initial
     */
    changeList: function(value, initial) {
      value = value || this.dependent.val();

      // Empty mark
      if (value === '') {
        value = this.options.empty_mark;
      }

      if (this.options.ajax.url) {
        this.ajaxUpdate(value);
      } else if (this.options.source) {
        this.sourceUpdate(value, initial);
      }
    },

    /**
     * Update list by source.
     *
     * @param {string} value
     * @param {bool}   initial
     */
    sourceUpdate: function(value, initial) {
      var self = this;
      var source = this.options.source;

      this.beforeHook(value, self.element, self.dependent);

      if (source[value]) {
        this.updateListElements(source[value]);
      } else {
        this.updateListElements([]);

        if (!initial && value !== '' && parseInt(value) !== 0) {
          console.log('List for value: ' + value + ' not found.');
        }
      }

      this.afterHook(value, self.element, self.dependent);
    },

    /**
     * Do ajax.
     *
     * @param {string} value
     */
    ajaxUpdate: function(value) {
      var self = this;
      var uri = new SimpleURI(this.options.ajax.url);
      uri.setVar(this.options.ajax.value_field, value);

      self.beforeHook(value, self.element, self.dependent);

      $.get(uri.toString())
        .done(function(response) {
          if (response.success) {
            self.updateListElements(response.data);
          } else {
            console.error(response.message);
          }
        }).fail(function(response) {
        console.error(response.message);
      }).always(function() {
        self.afterHook(value, self.element, self.dependent);
      });
    },

    /**
     * Update list elements.
     *
     * @param {Array} items
     */
    updateListElements: function(items) {
      var self = this;
      var textField = this.options.text_field;
      var valueField = this.options.value_field;
      self.element.empty();

      if (this.options.first_option) {
        items.unshift({});
        items[0][textField] = this.options.first_option[textField];
        items[0][valueField] = this.options.first_option[valueField];
      }

      $.each(items, function() {
        var value = this[valueField];
        var option = $('<option>' + this[textField] + '</option>');
        option.attr('value', value);

        if (this.attributes) {
          $.each(this.attributes, function(index) {
            option.attr(index, this);
          });
        }

        if (self.options.default_value == value) {
          option.attr('selected', 'selected');
        }

        self.element.append(option);
      });

      self.element.trigger('chosen:updated');
      self.element.trigger('change');
    },

    /**
     * Before hook.
     *
     * @param {string} value
     * @param {jQuery} element
     * @param {jQuery} dependent
     * @returns {*}
     */
    beforeHook: function(value, element, dependent) {
      var before = this.options.hooks.before_request;

      return before.call(this, value, element, dependent);
    },

    /**
     * After hook.
     *
     * @param {string} value
     * @param {jQuery} element
     * @param {jQuery} dependent
     * @returns {*}
     */
    afterHook: function(value, element, dependent) {
      var after = this.options.hooks.after_request;

      return after.call(this, value, element, dependent);
    }
  };

  /**
   * Push plugins.
   *
   * @param {jQuery} dependent
   * @param {Object} options
   *
   * @returns {*}
   */
  $.fn[plugin] = function(dependent, options) {
    if (!$.data(this, "phoenix." + plugin)) {
      $.data(this, "phoenix." + plugin, new ListDependent(this, dependent, options));
    }

    return $.data(this, "phoenix." + plugin);
  };
})(jQuery);
