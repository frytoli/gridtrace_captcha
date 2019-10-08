# Gridtrace CAPTCHA

![gridtrace](https://user-images.githubusercontent.com/17416542/66367417-b59f7c00-e959-11e9-843f-29c7c611f624.gif)

A pure JS CAPTCHA solution that prompts a user to trace a randomly generated grid path of blocks in succession. The generated grid path is always at least 6 blocks long, and at most 10 blocks long (6 <= p <= 10, where p is path length).

### Dependencies

Tested with Jquery-3.4.1

### How to Use

Please view the example css and html files.

#### HTML

Declare a div where you would like the grid to be located on your page. Set the following two attributes: class='captcha-grid', id='captcha-grid':

```
<!-- Import source -->
<script type='text/javascript' src='jquery-3.4.1.min.js'></script>
<script type='text/javascript' src='gridtrace_captcha.js'></script>

<!-- Create the 'captcha-grid' element -->
<div class='captcha-grid' id='captcha-grid'></div>
```

#### CSS

Stylize the elements as desired. The elements and their corresponding class names are as follows:

* captcha-grid : the grid element containing the captcha blocks
* captcha-block-row : the individual rows of captcha blocks contained by the grid element
* captcha-block : the individual captcha blocks that make up the rows within the grid element

#### JS

Block colors can be personalized with minor edits to the js script. Simply change the following variables at the top of "gridtrace_captcha.js":

```
var block_default_color = '#ffffff';
var block_path_color = '#e1ffd4';
var block_good_color = '#81f051';
var block_bad_color = '#ff1500';
```

Set the grid size in a similar way. Change the "max_x" and "max_y" variables at the top of "gridtrace_captcha.js", where max_x is the maximum number of desired columns on the x-axis, and max_y is the number of desired rows on the y-axis. The default values of these variables of 8 and 4, respectively:

```
var max_x = 8;
var max_y = 4;
```

#### Validation

Upon document initialization, Gridtrace dynamically creates both the captcha grid as well as a hidden div ('id'='captcha-validater') with an empty value ('value'=''). Once a user successfully traces the captcha block path without making a mistake, the value of this div is changed to 'success' ('value'='success'). To validate that the captcha was solved, check the value of this hidden element. For example:

```
// Using javascript

var successful_captcha_attempt = false;

var validater = document.getElementById('captcha-validater');
var is_validated = validater.getAttribute('value');
if (var == 'success') {
  successful_captcha_attempt = true;
}
```
