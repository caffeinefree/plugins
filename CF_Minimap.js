//=============================================================================
//
// MIT License
//
// Copyright (c) 2017 caffeinefree
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
//
//=============================================================================

/*:
 * @plugindesc Adds a minimap
 * @author Caffeine-Free
 *
 * @param Display
 * @desc Default shown on map Scene
 * @default true
 *
 * @help
 * Usage:
 * 	WRITE ME
 *
 * About:
 * 	WRITE ME
 *
 * Version 1.0
 * Website https://github.com/caffeinefree
 */

(function() {

  /**
   * PARAMETERS
   * @type {Object}
   */
  var PARAMETERS = PluginManager.parameters('CF_Minimap');

  /**
   * Game_Interpreter pluginCommand
   */
  (function() {

    /**
     * Game_Interpreter pluginCommand
     * @param  {String} command Namespace for command
     * @param  {Array} args    Array of command string arguments
     */
    var Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
      Game_Interpreter_pluginCommand.call(this, command, args);

      if (command !== 'Minimap') {
        return;
      }

      switch (args[0]) {
      case 'display':
        if (args[1].toLowerCase() === 'true') {
          // TODO : Get current scene, show minimap if not displayed
        } else {
          // TODO : Get current scene, hide minimap if displayed
        }
        break;
      }
    };

  })();

  /**
   * Window_Minimap
   */
  (function() {

    var LEFT = -1;
    var MIDDLE = 0;
    var RIGHT = 1;
    var TOP = -1;
    var BOTTOM = 1;

    /**
     * Window_Minimap constructor
     */
    function Window_Minimap() {
      this.initialize.apply(this, arguments);
    }

    /**
     * Window_Minimap create
     * @param   {Scene_Base}      scene Scene to display minimap on
     * @return  {Window_Minimap}  New instance of Window_Minimap
     */
    Window_Minimap.create = function(scene) {
      scene._minimapWindow = new Window_Minimap(320, 240, RIGHT, BOTTOM, -32, -32);
      scene.addWindow(scene._minimapWindow);
      return scene._minimapWindow;
    };

    Window_Minimap.prototype = Object.create(Window_Base.prototype);
    Window_Minimap.prototype.constructor = Window_Minimap;

    /**
     * Window_Minimap initialize
     * @param {Number}  width     Window width
     * @param {Number}  height    Window height
     * @param {Number}  x_align   Window X gravity
     * @param {Number}  y_align   Window Y gravity
     * @param {Number}  x_offset  Window X screen offset
     * @param {Number}  y_offset  Window Y screen offset
     */
    Window_Minimap.prototype.initialize = function(width, height, x_align, y_align, x_offset, y_offset) {
      Window_Base.prototype.initialize.call(this, 0, 0, width, height);

      this._minimapSprite = new Sprite_Minimap(100, 100);

      this.recalculatePosition(x_align, y_align, x_offset, y_offset);
      this.refresh();
    };

    /**
     * Window_Minimap update
     */
    Window_Minimap.prototype.update = function() {
      Window_Base.prototype.update.call(this);
      this._minimapSprite.x -= 2;
      this._minimapSprite.y -= 1;
      // TODO : Add code that checks if contents needs redrawing
      this.refresh();
    };

    /**
     * Window_Minimap refresh
     */
    Window_Minimap.prototype.refresh = function() {
      var dx = Math.floor(this._minimapSprite.x).mod(this._minimapSprite.width);
      var dy = Math.floor(this._minimapSprite.y).mod(this._minimapSprite.height);
      var xx = Math.ceil(this.contents.width / this._minimapSprite.width) + 1;
      var hh = Math.ceil(this.contents.height / this._minimapSprite.height) + 1;

      var sw = this._minimapSprite.width;
      var sh = this._minimapSprite.width;
      while (xx--) {
        var yy = hh;
        while (yy--) {
          this.contents.blt(this._minimapSprite.bitmap, 0, 0, sw, sh, dx + (xx - 1) * sw, dy + (yy - 1) * sh);
        }
      }
    };

    /**
     * Window_Minimap recalculatePosition
     */
    Window_Minimap.prototype.recalculatePosition = function(x_align, y_align, x_offset, y_offset) {
      if (x_align === undefined) x_align = LEFT;
      if (y_align === undefined) y_align = TOP;
      if (x_offset === undefined) x_offset = 0;
      if (y_offset === undefined) y_offset = 0;

      var x, y;

      if (x_align <= LEFT) {
        x = 0;
      } else if (x_align >= RIGHT) {
        x = Graphics.width - this.width;
      } else {
        // x_align == MIDDLE
        x = Graphics.width / 2 - this.width / 2;
      }
      x += x_offset;

      if (y_align <= TOP) {
        y = 0;
      } else if (y_align >= BOTTOM) {
        y = Graphics.height - this.height;
      } else {
        // y_align == MIDDLE
        y = Graphics.height / 2 - this.height / 2;
      }
      y += y_offset;

      this.x = x;
      this.y = y;
    };

    /**
     * Scene_Map createAllWindows
     */
    var Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function() {
      Scene_Map_createAllWindows.call(this);
      Window_Minimap.create(this);
    };

  })();

  /**
   * Sprite_Minimap
   */
  (function() {

    /**
     * Sprite_Minimap constructor
     */
    Sprite_Minimap = function() {
      this.initialize.apply(this, arguments);
    }

    Sprite_Minimap.prototype = Object.create(Sprite.prototype);
    Sprite_Minimap.prototype.constructor = Sprite_Minimap

    /**
     * Sprite_Minimap initialize
     */
    Sprite_Minimap.prototype.initialize = function(width, height) {
      Sprite.prototype.initialize.call(this);
      this.createBitmap(width, height);
      this.update();
    };

    /**
     * Sprite_Minimap createBitmap
     */
    Sprite_Minimap.prototype.createBitmap = function(width, height) {
      this.bitmap = new Bitmap(width, height);
    };

    /**
     * Sprite_Minimap update
     */
    Sprite_Minimap.prototype.update = function() {
      Sprite.prototype.update.call(this);
      this.updateBitmap();
    };

    /**
     * Sprite_Minimap updateBitmap
     */
    Sprite_Minimap.prototype.updateBitmap = function() {
      // TODO : Add code that checks if bitmap needs redrawing
      this.redraw();
    };

    /**
     * Sprite_Minimap redraw
     * This is where the drawing happens
     */
    Sprite_Minimap.prototype.redraw = function() {
      this.bitmap.clear();
      this.bitmap.gradientFillRect(0, 0, this.bitmap.width, this.bitmap.height, 'red', 'blue', true);
      this.bitmap.drawCircle(this.bitmap.width / 2, this.bitmap.height / 2, this.bitmap.width / 2, 'green');
    };

  })();

})();
