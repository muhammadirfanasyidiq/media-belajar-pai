function ExecuteScript(strId)
{
  switch (strId)
  {
      case "5xmBluGdTJi":
        Script1();
        break;
      case "5uRtnbQybVk":
        Script2();
        break;
      case "5WetRhOnUaE":
        Script3();
        break;
      case "6mMKKiBajSb":
        Script4();
        break;
  }
}

window.InitExecuteScripts = function()
{
var player = GetPlayer();
var object = player.object;
var once = player.once;
var addToTimeline = player.addToTimeline;
var setVar = player.SetVar;
var getVar = player.GetVar;
var update = player.update;
var pointerX = player.pointerX;
var pointerY = player.pointerY;
var showPointer = player.showPointer;
var hidePointer = player.hidePointer;
var slideWidth = player.slideWidth;
var slideHeight = player.slideHeight;
window.Script1 = function()
{
  const target = object('6U9jo8BwakB');
const duration = 1000;
const easing = 'ease-out';
const id = '5ZCG5TzvJXI';
const pulseAmount = 0.07;
player.addForTriggers(
id,
target.animate(
[ {scale: '1' }, 
{scale: `${1 + pulseAmount}` }, 
{scale: '1' }, 
{scale: `${1 + pulseAmount}` }, 
{scale: '1' } ]
,
  { fill: 'forwards', duration, easing }
)
);
}

};
