# jSel
------
This is “Visual selection of elements for jQuery framework” [Check out the demo](https://demorfi.github.io/jsel)

Required
========
* jQuery framework >= 1.8
* [* JRE for build]

Features
========
* Light weight (min. 5KB code)
* Cross browser support (IE, Chrome, Firefox, Opera, Vivaldi)
* Wide API interfaces
* A large field of activity
* Customize the way you like

How to Use
==========

Install the jsel in the footer
```javascript
<script src="/javascript/jsel.jquery.min.js"></script>
<script>$(function() {$('body').jsel('events': {}).setActive()});</script>
```

or add special class for your element `<body class="jsel-trigger">`.

Options
=======
<table>
  <tr>
    <th>Option</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>active</td>
    <td>false</td>
    <td>[boolean] Enable by default</td>
  </tr>
  <tr>
    <td>breakCode</td>
    <td>27</td>
    <td>[number] Code button for unselected (default ESC)</td>
  </tr>
  <tr>
    <td>borderSize</td>
    <td>2</td>
    <td>[number] Border size selected object</td>
  </tr>
  <tr>
    <td>useLabel</td>
    <td>true</td>
    <td>[boolean] Use label for selected object</td>
  </tr>
  <tr>
    <td>useEvent</td>
    <td>true</td>
    <td>[boolean] Use events for selected object</td>
  </tr>
  <tr>
    <td>events</td>
    <td>{}</td>
    <td>[object] Available events</td>
  </tr>
</table>

Callback
========
<table>
  <tr>
    <th>Option</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>callback.init</td>
    <td>null</td>
    <td>[function] Callback init wrapper</td>
  </tr>
  <tr>
    <td>callback.select</td>
    <td>null</td>
    <td>[function] Callback selected object</td>
  </tr>
</table>

Example of use
==============
```javascript
$(function ()
{
  $('body').jsel({
    'events':
    {
      'delete':
      {
        'label': 'Delete',
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
      'show':
      {
        'label': 'Show Selector',
        'callback': function (element)
        {
          alert(this.getSelector(element));
        }
      }
    }
  }).setActive();
});
```

Build
=====
```bash
cd ~ && git clone https://github.com/demorfi/jsel.git jsel && cd jsel
make && ls builds -lX

# rebuild
make clean && make && ls builds -lX
```

or use ready files in directories.

Change Log
==========
v1.0 - Aug 02, 2015
--------------------
 * Initialize version 1.0

License
=======
This is licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php).
