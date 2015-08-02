/**
 * jSel is “Visual selection of elements for jQuery framework”.
 *
 * @author demorfi <demorfi@gmail.com>
 * @version 1.0
 * @source https://github.com/demorfi/jsel
 * @license http://opensource.org/licenses/MIT Licensed under MIT License
 */

$(function ()
{
    $('body').jsel({
        'events': {

            'clone': {
                'label'   : 'Clone',
                'callback': function (element)
                {
                    element.after(element.clone(true));
                }
            },

            'delete': {
                'label'   : 'Delete',
                'callback': function (element)
                {
                    var newPos = element.next().length ? element.next() : element.parent();
                    element.remove();

                    // reload selected
                    this.setInactive();
                    newPos.length && this.setPosition({target: newPos});
                    this.setActive();
                }
            },

            'show': {
                'label'   : 'Show Selector',
                'callback': function (element)
                {
                    alert(this.getSelector(element));
                }
            },

            'action': {
                'label'   : 'Action Test',
                'callback': function (element, event)
                {
                    alert('Sent in the developer console');
                    console.log(element, event);
                }
            }
        }
    }).setActive();
});