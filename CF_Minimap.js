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

      if (command === 'Minimap') {
        switch (args[0]) {
          case 'display':
            if (args[1].toLowerCase() === 'true') {
              // TODO : Get current scene, show minimap if not displayed
            } else {
              // TODO : Get current scene, hide minimap if displayed
            }
            break;
        }
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
      scene._minimapWindow = new Window_Minimap(128, 128, RIGHT, BOTTOM, -48, -48);
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
      if (x_align === undefined) x_align = LEFT;
      if (y_align === undefined) y_align = TOP;
      if (x_offset === undefined) x_offset = 0;
      if (y_offset === undefined) y_offset = 0;

      var x, y;

      if (x_align <= LEFT) {
        x = 0;
      } else if (x_align >= RIGHT) {
        x = Graphics.width - width;
      } else {
        // x_align == MIDDLE
        x = Graphics.width / 2 - width / 2;
      }
      x += x_offset;

      if (y_align <= TOP) {
        y = 0;
      } else if (y_align >= BOTTOM) {
        y = Graphics.height - height;
      } else {
        // y_align == MIDDLE
        y = Graphics.height / 2 - height / 2;
      }
      y += y_offset; // Add y_offset

      Window_Base.prototype.initialize.call(this, x, y, width, height);
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

  })();

})();
