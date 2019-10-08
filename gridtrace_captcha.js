block_default_color$(document).ready(function(){

  // Set block colors
  var block_default_color = '#ffffff'; // Default color of normal blocks
  var block_path_color = '#e1ffd4';    // Color of the blocks in the path to be traced
  var block_good_color = '#81f051';    // Color of blocks that are successfully traced
  var block_bad_color = '#ff1500';     // Color of blocks that are not a part of the path and are incorrectly traced

  // Dynamically generate captcha grid
  var parent_div = document.getElementById('captcha-grid');
  var max_x = Number(parent_div.getAttribute('max_x'));
  var max_y = Number(parent_div.getAttribute('max_y'));
  var validater = document.createElement('div');
  validater.id = 'captcha-validater';
  validater.style.display = 'none';
  validater.value = '';
  parent_div.appendChild(validater);
  for (y=max_y; y>0; y--) {
    var new_row = document.createElement('div');
    new_row.className = 'captcha-block-row';
    parent_div.appendChild(new_row);
    for (x=max_x; x>0; x--) {
      x_str = x.toString();
      y_str = y.toString();
      var new_id = `${x_str}-${y_str}`;
      var new_block = document.createElement('div');
      new_block.className = 'captcha-block';
      new_block.id = new_id;
      new_block.style.backgroundColor = block_default_color;
      new_row.appendChild(new_block);
    }
  }

  function rand_from_range(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function find_next_point(max_x, max_y, last_x, last_y) {
    // Randomly select north-south or east-west
    var direction = rand_from_range(1,2);
    if (direction == 1) {
      // north-south
      // If last point is most north or south, do not allow as an option for current point
      if (last_y == max_y) {
        direction = 2;
      } else if (last_y == 1) {
        direction = 1;
      } else {
        // Randomly select north or south
        direction = rand_from_range(1,2);
      }
      if (direction == 1) {
        // north
        last_y = last_y + 1;
      }
      else {
        // south
        last_y = last_y - 1;
      }
    }
    else {
      // east-west
      // If last point is most east or west, do not allow as an option for current point
      if (last_x == 1) {
        direction = 2;
      } else if (last_x == max_x) {
        direction = 1;
      } else {
        // Randomly select east or west
        direction = rand_from_range(1,2);
      }
      if (direction == 1) {
        // east
        last_x = last_x - 1;
      }
      else {
        // west
        last_x = last_x + 1;
      }
    }
    return [last_x, last_y];
  }

  var all_points = [];
  for (var x=1; x<max_x+1; x++) {
    for (var y=1; y<max_y+1; y++) {
      var x_str = x.toString();
      var y_str = y.toString();
      var point_id = `${x_str}-${y_str}`;
      all_points.push(point_id);
    }
  }

  // Randomly select a path (6 <= length <= 10)
  var path_len = rand_from_range(6, 10);
  // Select a starting point
  var last_x = rand_from_range(1, max_x);
  var last_y = rand_from_range(1, max_y);
  // Create path
  var path = [];
  for (var itr=0; itr<path_len; itr++) {
    // If we are at the starting point, add starting point
    if (itr == 0) {
      var last_x_str = last_x.toString();
      var last_y_str = last_y.toString();
      var point_id = `${last_x_str}-${last_y_str}`;
    }
    else {
      // While the point has not yet already been chosen
      while (path.includes(point_id) == true) {
        var point = find_next_point(max_x, max_y, last_x, last_y);
        last_x = point[0];
        last_y = point[1];
        last_x_str = last_x.toString();
        last_y_str = last_y.toString();
        point_id = `${last_x_str}-${last_y_str}`;
      }
    }
    // Add point ID to list
    path.push(point_id);
  }

  var not_path = all_points;
  // Iterate over path, find boxes, and change colors
  for (var itr=0; itr<path_len; itr++) {
    var np_index = not_path.indexOf(path[itr]);
    if (np_index !== -1) not_path.splice(np_index, 1);
    var box = document.getElementById(path[itr]);
    box.style.backgroundColor = block_path_color;
  }

  // Handle mouseover events for captcha
  var completed_path = [];
  document.onmouseover = function(e) {
    if (e.target.id.includes('-') == true) {
      if (path.includes(e.target.id) == true && completed_path.includes(e.target.id) == false) {
        completed_path.push(e.target.id);
        var box = document.getElementById(e.target.id);
        box.style.backgroundColor = block_good_color;
        if (completed_path.length == path_len) {
          // verification is true
          all_points = [];
          path = [];
          not_path = [];
          document.getElementById('captcha-validater').setAttribute('value', 'success');
        }
      } else if (not_path.includes(e.target.id) == true && completed_path != []) {
        for (itr=0; itr<completed_path.length; itr++) {
          var box = document.getElementById(completed_path[itr]);
          box.style.backgroundColor = block_path_color;
        }
        completed_path = [];
        var box = document.getElementById(e.target.id);
        box.style.backgroundColor = block_bad_color;
        setTimeout(function(){ box.style.backgroundColor = block_default_color; },1000);
      }
    }
  }

});
