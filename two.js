Minecraft = {};


//Block elements - defining properties - type,
/* var block1 = new Minecraft.block("wood");
alert(block1.type);*/

/*Minecraft.block = function (type){

    this.domBlock; //refers to dom element
    this.type = type;
    this.selected = false;
    this.onGround = false;
    this.position = [];
    this.width = 50;
    this.height = 50;
  }*/

//Create a block based on type or id (needs to be positioned after click)
Minecraft.block.prototype.create = function (){
 
 var self = this;
 this.blockHolder = document.createElement("div");
   //Each DOM block element will have class block 
   this.blockHolder.addClass("block", "dirt");
   //not all background images have a png extension, use if/else based on type
   this.blockHolder.css("background", "'./images/" + this.type + ".png' ");

   console.log(self);

   this.blockHolder.click(function () {
     console.log(self);
     if(Minecraft.selectedTool != null){
      Minecraft.block.prototype.tryToRemove(self);
    }
  })
 }
 
 Minecraft.block.prototype.tryToRemove = function (block){
  console.log('in delete function');
    //if the block objects DOM element contains a class that matches the Selecetedtools
    //approachedblock, then the tool and the block match, and we can remove the block

    if(block.blockHolder.hasClass(Minecraft.selectedTool.approachedBlock)){
    //types need to match classes, whatever object we create in the constructor
    //their classes should be set to type
    block.blockHolder.removeClass(block.type);
    block.blockHolder.addClass("sky");
    console.log(block.blockHolder.classList);
    
  }

}


Minecraft.tools = function (type, approachedBlock){

  this.toolHolder;
  this.type = type;
  this.approachedBlock = approachedBlock;
  this.selected = false;

  this.create = function() {

    var self = this;
    this.toolHolder = document.createElement("div");
    this.toolHolder.classList.add("tool");
    this.toolHolder.style.backgroundImage =  "url('./images/" + this.type + ".png')";
    document.getElementById("tools-container").appendChild(this.toolHolder);

    
    this.toolHolder.addEventListener('click', function () {
      Minecraft.selectTool(self);
    })
    
  }



//methods
}

//onclick --set to true in constructor for now.
/*Minecraft.tools.prototype.select = function(selected){
    this.selected = selected;
  }*/

  Minecraft.allTools = [];
  Minecraft.allBlocks = [];
  Minecraft.selectedTool;
  Minecraft.selectedBlock;
  Minecraft.toolName = ["pickaxe","shovel","axe"];
  Minecraft.blocks = ["rock", "dirt", "wood", "sky", "cloud", "leaves"];

  Minecraft.initializeTools = function (tools, blocks) {
    //find a way to return tool object

    for(var i = 0; i < tools.length; i++){
      Minecraft.allTools[i] = new Minecraft.tools(tools[i], blocks[i]);
      console.log(tools, blocks);
      Minecraft.allTools[i].create();
    }
  }

  Minecraft.initializeBlocks = function(blocks) {
   for(var i = 0; i < blocks.length; i++){

     //how to get X,Y coordinates from map
    Minecraft.allBlocks[i] = new Minecraft.block(blocks[i], x , y);
    Minecraft.allBlocks[i].create();
  }


}

//get id and associated block to prevent if else conditions, set to selected in constructor
Minecraft.selectTool = function (self){
//better approach then setting every object type false
Minecraft.selectedTool = self;

console.log(Minecraft.selectedTool);
}



Minecraft.start = function (){

Minecraft.initializeTools(Minecraft.toolName, Minecraft.blocks);
//this.initializeBlocks
Minecraft.initializeBlocks(Minecraft.blocks);

}

Minecraft.start();