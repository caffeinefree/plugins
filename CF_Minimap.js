//=============================================================================
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
 * @plugindesc A Minimap Plugin for your games!
 * @author Caffeine-Free
 *
 * @param BG Color
 * @desc Color for the minimap background
 * @default rgba(50, 50, 50, 0.5)
 *
 * @param FG Color
 * @desc Color for the minimap foreground
 * @default rgba(150, 150, 150, 0.5)
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
	
	var params = PluginManager.parameters("CF_Minimap");
	
	var _bgcolor = params['BG Color'];
	var _fgcolor = params['FG Color'];
	
	//Create minimap sprite
	Minimap_Sprite = function() {
		this.initialize.apply(this, arguments);
	}
	
	Minimap_Sprite.prototype = Object.create(Sprite_Base.prototype);
	Minimap_Sprite.prototype.constructor = Minimap_Sprite
	
	Minimap_Sprite.prototype.initialize = function() {
		Sprite_Base.prototype.initialize.call(this);
		// push everything into a tile if collidable for minimal drawing
		this.tile = [];
		this.getMapCollision();
		this.draw();
	}
	
	Minimap_Sprite.prototype.getMapCollision = function() {
		for(var i=0;i<$dataMap.width;i++) {
			for(var i2=0;i2<$dataMap.height;i2++) {
				//If tile is passable, push array entry to an object
				if($gameMap.checkPassage(i, i2, 0x0F) == true)
				{
					this.tile.push({
						x: i,
						y: i2,
					});
				}
			}
		}
	}
	
	Minimap_Sprite.prototype.draw = function() {
		//Should we use fill rect, or is there an alternative?
	}
})();
