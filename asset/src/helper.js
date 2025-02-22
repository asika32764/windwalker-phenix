/**
 * Part of phoenix project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

(($) => {
  class PhoenixHelper extends PhoenixPlugin {
    static get is() { return 'Helper'; }

    static get proxies() {
      return {
        $get: 'get',
        $set: 'set',
        isDebug: 'isDebug',
        confirm: 'confirm',
        keepAlive: 'keepAlive',
        stopKeepAlive: 'stopKeepAlive',
        isNullDate: 'isNullDate',
        getNullDate: 'getNullDate',
        loadScript: 'loadScript',
        notify: 'notify',
        numberFormat: 'numberFormat',
        sprintf: 'sprintf',
        vsprintf: 'vsprintf',
      };
    }

    static get defaultOptions() {
      return {}
    }

    constructor() {
      super();

      this.aliveHandle = null;
    }

    get(obj, path) {
      const keys = Array.isArray(path) ? path : path.split('.');

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];

        if (!obj || !obj.hasOwnProperty(key)) {
          obj = undefined;
          break;
        }

        obj = obj[key];
      }

      return obj;
    }

    set(obj, path, value) {
      const keys = Array.isArray(path) ? path : path.split('.');
      let i;

      for (i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        console.log(obj.hasOwnProperty(key), key);
        if (!obj.hasOwnProperty(key)) {
          obj[key] = {};
        }

        obj = obj[key];
      }

      obj[keys[i]] = value;

      return value;
    }

    isDebug() {
      return Boolean(this.phoenix.data('windwalker.debug'));
    }

    /**
     * Confirm popup.
     *
     * @param {string}   message
     * @param {Function} callback
     * @param {Function} falseCallback
     */
    confirm(message, callback, falseCallback = null) {
      message = message || 'Are you sure?';

      const d = $.Deferred();
      const when = $.when(d);

      if (callback) {
        when.done(callback);
      }

      if (falseCallback) {
        when.catch(callback);
      }

      const confirmed = confirm(message);

      if (confirmed) {
        d.resolve(confirmed);
      } else {
        d.reject(confirmed);
      }

      return when;
    }

    loadScript(urls, autoConvert = true) {
      if (typeof urls === 'string') {
        urls = [urls];
      }

      const promises = [];
      const data = {};
      const endsWith = (str, suffix) => str.indexOf(suffix, str.length - suffix.length) >= 0;
      data[this.phoenix.asset('version')] = '1';

      urls.forEach(url => {
        const ext = url.split('.').pop();
        let loadUri = url;

        if (autoConvert) {
          let assetFile, assetMinFile;

          if (endsWith(url, '.min.' + ext)) {
            assetMinFile = url;
            assetFile = url.slice(0, -`.min.${ext}`.length) + '.' + ext;
          } else {
            assetFile = url;
            assetMinFile = url.slice(0, -`.${ext}`.length) + '.min.' + ext;
          }

          loadUri = this.phoenix.data('windwalker.debug') ? assetFile : assetMinFile;
        }

        promises.push(
          $.getScript({
            url: this.addUriBase(loadUri),
            cache: true,
            data
          })
        );
      });

      return $.when(...promises);
    }

    addUriBase(uri, type = 'path') {
      if (uri.substr(0, 2) === '//' || uri.substr(0, 4) === 'http') {
        return uri;
      }

      return this.phoenix.asset(type) + '/' + uri;
    }

    /**
     * Notify information.
     * @param {string|Array} message
     * @param {string}       type
     * @returns {*}
     */
    notify(message, type = 'info') {
      return this.phoenix.addMessage(message, type);
    }

    /**
     * Keep alive.
     *
     * @param {string} url
     * @param {Number} time
     *
     * @return {number}
     */
    keepAlive(url, time = 60000) {
      return this.aliveHandle = window.setInterval(() => $.get(url), time);
    }

    /**
     * Stop keep alive
     */
    stopKeepAlive() {
      clearInterval(this.aliveHandle);

      this.aliveHandle =  null;

      return this;
    }

    /**
     * Is NULL date from default SQL.
     *
     * @param {string} date
     */
    isNullDate(date) {
      return ['0000-00-00 00:00:00', this.getNullDate()].indexOf(date) !== -1;
    }

    /**
     * Get NULL date from default SQL.
     *
     * @returns {string}
     */
    getNullDate() {
      return this.phoenix.data('phoenix.date')['empty'];
    }

    /**
     * Number format like php function.
     *
     * @param {string|number} number
     * @param {number}        decimals
     * @param {string}        decPoint
     * @param {string}        thousandsSep
     * @returns {string}
     */
    numberFormat(number, decimals = 0, decPoint = '.', thousandsSep = ',') {
      number = Number(number);

      const str = number.toFixed(decimals ? decimals : 0).toString().split('.');
      const parts = [];

      for (var i = str[0].length; i > 0; i -= 3) {
        parts.unshift(str[0].substring(Math.max(0, i - 3), i));
      }

      str[0] = parts.join(thousandsSep ? thousandsSep : ',');

      return str.join(decPoint ? decPoint : '.');
    }
  }

  window.PhoenixHelper = PhoenixHelper;

  // Fork sprintf here to reduce requests
  (function() {
    var re = {
      not_string: /[^s]/,
      not_bool: /[^t]/,
      not_type: /[^T]/,
      not_primitive: /[^v]/,
      number: /[diefg]/,
      numeric_arg: /[bcdiefguxX]/,
      json: /[j]/,
      not_json: /[^j]/,
      text: /^[^\x25]+/,
      modulo: /^\x25{2}/,
      placeholder: /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,
      key: /^([a-z_][a-z_\d]*)/i,
      key_access: /^\.([a-z_][a-z_\d]*)/i,
      index_access: /^\[(\d+)\]/,
      sign: /^[\+\-]/
    }

    function sprintf(key) {
      // `arguments` is not an array, but should be fine for this call
      return sprintf_format(sprintf_parse(key), arguments)
    }

    function vsprintf(fmt, argv) {
      return sprintf.apply(null, [fmt].concat(argv || []))
    }

    function sprintf_format(parse_tree, argv) {
      var cursor = 1, tree_length = parse_tree.length, arg, output = '', i, k, match, pad, pad_character, pad_length, is_positive, sign
      for (i = 0; i < tree_length; i++) {
        if (typeof parse_tree[i] === 'string') {
          output += parse_tree[i]
        }
        else if (Array.isArray(parse_tree[i])) {
          match = parse_tree[i] // convenience purposes only
          if (match[2]) { // keyword argument
            arg = argv[cursor]
            for (k = 0; k < match[2].length; k++) {
              if (!arg.hasOwnProperty(match[2][k])) {
                throw new Error(sprintf('[sprintf] property "%s" does not exist', match[2][k]))
              }
              arg = arg[match[2][k]]
            }
          }
          else if (match[1]) { // positional argument (explicit)
            arg = argv[match[1]]
          }
          else { // positional argument (implicit)
            arg = argv[cursor++]
          }

          if (re.not_type.test(match[8]) && re.not_primitive.test(match[8]) && arg instanceof Function) {
            arg = arg()
          }

          if (re.numeric_arg.test(match[8]) && (typeof arg !== 'number' && isNaN(arg))) {
            throw new TypeError(sprintf('[sprintf] expecting number but found %T', arg))
          }

          if (re.number.test(match[8])) {
            is_positive = arg >= 0
          }

          switch (match[8]) {
            case 'b':
              arg = parseInt(arg, 10).toString(2)
              break
            case 'c':
              arg = String.fromCharCode(parseInt(arg, 10))
              break
            case 'd':
            case 'i':
              arg = parseInt(arg, 10)
              break
            case 'j':
              arg = JSON.stringify(arg, null, match[6] ? parseInt(match[6]) : 0)
              break
            case 'e':
              arg = match[7] ? parseFloat(arg).toExponential(match[7]) : parseFloat(arg).toExponential()
              break
            case 'f':
              arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg)
              break
            case 'g':
              arg = match[7] ? String(Number(arg.toPrecision(match[7]))) : parseFloat(arg)
              break
            case 'o':
              arg = (parseInt(arg, 10) >>> 0).toString(8)
              break
            case 's':
              arg = String(arg)
              arg = (match[7] ? arg.substring(0, match[7]) : arg)
              break
            case 't':
              arg = String(!!arg)
              arg = (match[7] ? arg.substring(0, match[7]) : arg)
              break
            case 'T':
              arg = Object.prototype.toString.call(arg).slice(8, -1).toLowerCase()
              arg = (match[7] ? arg.substring(0, match[7]) : arg)
              break
            case 'u':
              arg = parseInt(arg, 10) >>> 0
              break
            case 'v':
              arg = arg.valueOf()
              arg = (match[7] ? arg.substring(0, match[7]) : arg)
              break
            case 'x':
              arg = (parseInt(arg, 10) >>> 0).toString(16)
              break
            case 'X':
              arg = (parseInt(arg, 10) >>> 0).toString(16).toUpperCase()
              break
          }
          if (re.json.test(match[8])) {
            output += arg
          }
          else {
            if (re.number.test(match[8]) && (!is_positive || match[3])) {
              sign = is_positive ? '+' : '-'
              arg = arg.toString().replace(re.sign, '')
            }
            else {
              sign = ''
            }
            pad_character = match[4] ? match[4] === '0' ? '0' : match[4].charAt(1) : ' '
            pad_length = match[6] - (sign + arg).length
            pad = match[6] ? (pad_length > 0 ? pad_character.repeat(pad_length) : '') : ''
            output += match[5] ? sign + arg + pad : (pad_character === '0' ? sign + pad + arg : pad + sign + arg)
          }
        }
      }
      return output
    }

    var sprintf_cache = Object.create(null)

    function sprintf_parse(fmt) {
      if (sprintf_cache[fmt]) {
        return sprintf_cache[fmt]
      }

      var _fmt = fmt, match, parse_tree = [], arg_names = 0
      while (_fmt) {
        if ((match = re.text.exec(_fmt)) !== null) {
          parse_tree.push(match[0])
        }
        else if ((match = re.modulo.exec(_fmt)) !== null) {
          parse_tree.push('%')
        }
        else if ((match = re.placeholder.exec(_fmt)) !== null) {
          if (match[2]) {
            arg_names |= 1
            var field_list = [], replacement_field = match[2], field_match = []
            if ((field_match = re.key.exec(replacement_field)) !== null) {
              field_list.push(field_match[1])
              while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
                if ((field_match = re.key_access.exec(replacement_field)) !== null) {
                  field_list.push(field_match[1])
                }
                else if ((field_match = re.index_access.exec(replacement_field)) !== null) {
                  field_list.push(field_match[1])
                }
                else {
                  throw new SyntaxError('[sprintf] failed to parse named argument key')
                }
              }
            }
            else {
              throw new SyntaxError('[sprintf] failed to parse named argument key')
            }
            match[2] = field_list
          }
          else {
            arg_names |= 2
          }
          if (arg_names === 3) {
            throw new Error('[sprintf] mixing positional and named placeholders is not (yet) supported')
          }
          parse_tree.push(match)
        }
        else {
          throw new SyntaxError('[sprintf] unexpected placeholder')
        }

        _fmt = _fmt.substring(match[0].length)
      }
      return sprintf_cache[fmt] = parse_tree
    }

    // Push to class
    PhoenixHelper.prototype.sprintf = sprintf;
    PhoenixHelper.prototype.vsprintf = vsprintf;

  })(PhoenixHelper);
})(jQuery);
