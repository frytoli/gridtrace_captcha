# Gridtrace CAPTCHA

##### Built with pure JS

![gridtrace](https://user-images.githubusercontent.com/17416542/66367417-b59f7c00-e959-11e9-843f-29c7c611f624.gif)

### Dependencies

Currently works with Jquery-3.4.1

### How to Use

Please view the example css and html files.

#### HTML

Declare a div where you would like the grid to be located on your page. Set the following attributes: class='captcha-grid', id='captcha-grid', max_x='x' where x is the maximum number of desired columns on the x-axis, max_y='y' where y is the number of desired rows on the y-axis:

```
<!-- Import source -->
<script type='text/javascript' src='jquery-3.4.1.min.js'></script>
<script type='text/javascript' src='gridtrace_captcha.js'></script>

<!-- Create the 'captcha-grid' element -->
<div class='captcha-grid' id='captcha-grid' max_x='8' max_y='4'></div>
```

#### CSS

Stylize the elements as desired. The elements and their corresponding class names are as follows. Note that the only stylization that you do not have control over is the color of the randomly selected captcha block path, the color of successfully traced captcha blocks, and the color of the incorrectly traced captcha blocks:

* captcha-grid : the grid element containing the captcha blocks
* captcha-block-row : the individual rows of captcha blocks contained by the grid element
* captcha-block : the individual captcha blocks that make up the rows within the grid element

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
