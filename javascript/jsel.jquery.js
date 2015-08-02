/*!
 * jSel is “Visual selection of elements for jQuery framework”.
 *
 * @author demorfi <demorfi@gmail.com>
 * @version 1.0
 * @source https://github.com/demorfi/jsel
 * @license http://opensource.org/licenses/MIT Licensed under MIT License
 */
(function ($)
{

    /**
     * Initialize.
     *
     * @param {object} [options] Available options
     * @param {boolean} [options.active] Enable by default
     * @param {number} [options.breakCode] Code button for unselected
     * @param {number} [options.borderSize] Border size selected object
     * @param {boolean} [options.useLabel] Use label for selected object
     * @param {boolean} [options.useEvent] Use events for selected object
     * @param {object} [options.events] Available events
     * @param {object} [options.callback] Functions callbacks
     * @param {function} [options.callback.init] Callback init wrapper
     * @param {function} [options.callback.select] Callback selected object
     * @param {object} [options.class] Used css class list
     * @param {string} [options.class.wrapper] Use class for element jsel-wrapper
     * @param {string} [options.class.selector] Use class for element jsel-selector
     * @param {string} [options.class.selectionLabel] Use class for element jsel-selection-label
     * @param {string} [options.class.selectionEvents] Use class for element jsel-selection-events
     * @param {string} [options.class.eventsItems] Use class for element jsel-events-items
     * @param {string} [options.class.selectionLeft] Use class for element jsel-selection-left
     * @param {string} [options.class.selectionRight] Use class for element jsel-selection-right
     * @param {string} [options.class.selectionTop] Use class for element jsel-selection-top
     * @param {string} [options.class.selectionBottom] Use class for element jsel-selection-bottom
     * @return {object} jsel
     */
    $.fn.jsel = function (options)
    {
        var obj = this.data('jselSelf') ? $__construct.call(this.data('jselSelf'), this, options) :
                  (new $__construct(this, options));

        this.data('jselSelf', obj);
        return (obj.init());
    };

    /**
     * Constructor application.
     * Merge default setting.
     *
     * @param {object} el <ul> html element
     * @param {object} [options] Available options
     * @param {boolean} [options.active] Enable by default
     * @param {number} [options.breakCode] Code button for unselected
     * @param {number} [options.borderSize] Border size selected object
     * @param {boolean} [options.useLabel] Use label for selected object
     * @param {boolean} [options.useEvent] Use events for selected object
     * @param {object} [options.events] Available events
     * @param {object} [options.callback] Functions callbacks
     * @param {function} [options.callback.init] Callback init wrapper
     * @param {function} [options.callback.select] Callback selected object
     * @param {object} [options.class] Used css class list
     * @param {string} [options.class.wrapper] Use class for element jsel-wrapper
     * @param {string} [options.class.selector] Use class for element jsel-selector
     * @param {string} [options.class.selectionLabel] Use class for element jsel-selection-label
     * @param {string} [options.class.selectionEvents] Use class for element jsel-selection-events
     * @param {string} [options.class.eventsItems] Use class for element jsel-events-items
     * @param {string} [options.class.selectionLeft] Use class for element jsel-selection-left
     * @param {string} [options.class.selectionRight] Use class for element jsel-selection-right
     * @param {string} [options.class.selectionTop] Use class for element jsel-selection-top
     * @param {string} [options.class.selectionBottom] Use class for element jsel-selection-bottom
     * @private
     * @constructor
     * @return {object} this
     */
    var $__construct = function (el, options)
    {
        this.version = 1.0;
        this.options = $.extend(true, {
                'active'    : false,
                'breakCode' : 27,
                'borderSize': 2,
                'useLabel'  : true,
                'useEvent'  : true,
                'events'    : {},

                'callback': {
                    'init'  : null,
                    'select': null
                },

                'class': {
                    'wrapper'        : 'jsel-wrapper',
                    'selector'       : 'jsel-selector',
                    'selectionLabel' : 'jsel-selection-label',
                    'selectionEvents': 'jsel-selection-events',
                    'eventsItems'    : 'jsel-events-items',
                    'selectionLeft'  : 'jsel-selection-left',
                    'selectionRight' : 'jsel-selection-right',
                    'selectionTop'   : 'jsel-selection-top',
                    'selectionBottom': 'jsel-selection-bottom'
                }
            },
            options);

        this.$el = $(el).first();
        return (this);
    };

    /**
     * Constructor application prototype.
     *
     * @private
     * @constructor
     */
    $__construct.prototype = {

        /**
         * Initialize in prototype.
         *
         * {object} this
         */
        init: function ()
        {
            if (this.$el.length) {

                // build interface
                this.build();
                this.getOption('useEvent') && this.buildEvents();

                this.getOption('active') && this.setActive();
                this.setOption('useEvent', !$.isEmptyObject(this.getOption('events')));

                this.getCallback('init').call(this, this.$el);
            }

            return (this);
        },

        /**
         * Building elements.
         *
         * @private
         * @return {void}
         */
        build: function ()
        {
            if (!this.$el.find(this.getClass('wrapper', true)).length) {
                this.$wrap = $('<div>').addClass(this.getClass('wrapper'))
                    .append($('<div>').addClass(this.getClass('selectionLabel')))
                    .append($('<div>').addClass(this.getClass('selectionEvents')))
                    .append($('<div>').addClass(this.getClass('selectionLeft')))
                    .append($('<div>').addClass(this.getClass('selectionRight')))
                    .append($('<div>').addClass(this.getClass('selectionTop')))
                    .append($('<div>').addClass(this.getClass('selectionBottom')))
                    .appendTo(this.$el);
            }
        },

        /**
         * Building events.
         *
         * @private
         * @return {void}
         */
        buildEvents: function ()
        {
            if (this.$wrap && !this.$wrap.find(this.getClass('eventsItems', true)).length) {
                $('<ul>').addClass(this.getClass('eventsItems'))
                    .appendTo(this.$wrap.find(this.getClass('selectionEvents', true)));

                // toggle show available events
                this.$el.on('click.jselEvents', $.proxy(function (event)
                {
                    var el = $(event.target);
                    if (el.hasClass(this.getClass('selectionEvents'))) {
                        el.find(this.getClass('eventsItems', true)).show();
                    } else {
                        this.$el.find(this.getClass('eventsItems', true)).hide();
                    }
                }, this));
            }

            // update events list
            var elEventsItems = this.$el.find(this.getClass('eventsItems', true)).empty(),
                objEvents     = this.getOption('events');
            for (var event in objEvents) {
                if (objEvents.hasOwnProperty(event)) {
                    $('<li>').attr('id', 'jselEvent-' + event).html(objEvents[event].label)
                        .on('click.jselEvent', $.proxy(function (callback, event)
                        {
                            callback.call(this, this.$selected, event);
                        }, this, objEvents[event].callback))
                        .appendTo(elEventsItems);
                }
            }
        },

        /**
         * Get class name.
         *
         * @param {string} name Class or classes id
         * @param {boolean} [selector] Use css selector
         * @return {string}
         */
        getClass: function (name, selector)
        {
            if (name.indexOf(' ') !== -1) {
                return (name.split(' ').map($.proxy(function (name)
                {
                    if (name.length) {
                        return (this.getClass(name, selector));
                    }
                }, this)).join(selector ? ',' : ' '));
            }
            return ((selector ? '.' : '') + this.options['class'][name]);
        },

        /**
         * Get callback function.
         *
         * @param {string} name Callback id
         * @return {function}
         */
        getCallback: function (name)
        {
            return ($.isFunction(this.options.callback[name]) ? this.options.callback[name] : $.noop);
        },

        /**
         * Get option value.
         *
         * @param {string} name Option id
         * @return {*}
         */
        getOption: function (name)
        {
            return (this.options[name]);
        },

        /**
         * Change option.
         *
         * @param {string} name Option id
         * @param {*} value Option value
         * @return {void}
         */
        setOption: function (name, value)
        {
            this.options[name] = value;
        },

        /**
         * Get app version.
         *
         * @return {number}
         */
        getVersion: function ()
        {
            return (this.version);
        },

        /**
         * Change status to active.
         *
         * @return {void}
         */
        setActive: function ()
        {
            this.$el.addClass(this.getClass('selector')).on({
                'mousemove.jselPos': $.proxy(this.setPosition, this),
                'click.jselSelect' : $.proxy(this.selectElement, this),
                'keyup.jselBreak'  : $.proxy(this.breakSelect, this)
            }).find(this.getClass('wrapper', true)).show();
        },

        /**
         * Change status to inactive.
         *
         * @return {void}
         */
        setInactive: function ()
        {
            this.$el.off('mousemove.jsel click.jsel keyup.jsel')
                .find(this.getClass('wrapper', true)).hide();

            this.breakSelect();
        },

        /**
         * Has selected object.
         *
         * @param {object} el jQuery element
         * @return {boolean}
         */
        hasSelected: function (el)
        {
            return (this.$selected || el.closest(this.getClass('wrapper', true)).length);
        },

        /**
         * Select object.
         *
         * @param {object} event Event selected object
         * @return {void}
         */
        selectElement: function (event)
        {
            var element = $(event.target);
            if (!this.hasSelected(element)) {
                this.$selected = element;
                this.getOption('useEvent') && this.$el.find(this.getClass('selectionEvents', true)).show();
            }
        },

        /**
         * Unselect selected object.
         *
         * @param {object} [event] Event code button for unselected
         * @return {void}
         */
        breakSelect: function (event)
        {
            if (!event || event.keyCode === this.getOption('breakCode')) {
                delete this.$selected;
                this.$el.find(this.getClass('selectionEvents', true)).hide();
            }
        },

        /**
         * Change selected position.
         *
         * @param {object} event Event selected object
         * @return {void}
         */
        setPosition: function (event)
        {
            var element = $(event.target);
            if (!this.hasSelected(element)) {
                var box  = this.getOffsetCalc(element),
                    size = '[' + Math.round(element.innerWidth()) + 'x' + Math.round(element.innerHeight()) + 'px]';

                // use label for selected object
                if (this.getOption('useLabel')) {
                    var jselLabel = this.$el.find(this.getClass('selectionLabel', true))
                        .text(this.getSelector(element) + ' ' + size)
                        .css({
                            'left'     : box.leftMin,
                            'max-width': box.widthMax
                        }).show();

                    var jselLabelTop = box.top - jselLabel.innerHeight() - box.border;
                    jselLabel.css({
                        'top': jselLabelTop >= 1 ? jselLabelTop : box.top
                    });
                }

                // button available events
                var jselEvents = this.$el.find(this.getClass('selectionEvents', true));
                jselEvents.css({
                    'left': box.leftMax,
                    'top' : box.topMin
                });

                // change position left and right border
                this.$el.find(this.getClass('selectionLeft selectionRight', true))
                    .css({
                        'height': box.height,
                        'width' : box.border,
                        'left'  : box.leftMin,
                        'top'   : box.top
                    })
                    .filter(this.getClass('selectionRight', true)).css('left', box.leftMax);

                // change position top and bottom border
                this.$el.find(this.getClass('selectionTop selectionBottom', true))
                    .css({
                        'height': box.border,
                        'width' : box.widthMax,
                        'left'  : box.leftMin,
                        'top'   : box.topMin
                    })
                    .filter(this.getClass('selectionBottom', true)).css('top', box.topMax);

                this.getCallback('select').call(this, this.$el, element);
            }
        },

        /**
         * Get calculated position element.
         *
         * @param {object} element jQuery element
         * @return {object}
         */
        getOffsetCalc: function (element)
        {
            var box = {
                'border': this.getOption('borderSize'),
                'width' : element.innerWidth(),
                'height': element.innerHeight(),
                'left'  : element.offset().left,
                'top'   : element.offset().top
            };

            box.borderMax = box.border * 2;
            box.widthMax = box.width + box.borderMax;
            box.leftMin = box.left - box.border;
            box.leftMax = box.left + box.width;
            box.topMin = box.top - box.border;
            box.topMax = box.top + box.height;
            return (box);
        },

        /**
         * Get unique selector element.
         *
         * @param {object} element jQuery element
         * @return {string}
         */
        getSelector: function (element)
        {
            var path = element.parents().add(element).map(function ()
            {
                var path = this.tagName.toLowerCase();
                if (path !== 'body' && path !== 'html') {
                    path += (this.id ? ('#' + this.id) : '')
                            + (this.className ? ('.' + $.trim(this.className.replace(/\s/gi, '.'))) : '')
                            + (':nth-child(' + ($(this).index() + 1) + ')');

                    return (path);
                }
            }).get().join(' > ');
            return (path);
        }
    };

    /**
     * An anonymous call to the class .jsel-trigger.
     */
    $(function ()
    {
        $('.jsel-trigger').jsel({'active': true});
    });
})(jQuery);