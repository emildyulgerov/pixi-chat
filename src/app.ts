import * as PIXI from 'pixi.js';
import { Button } from './Button';
import { createTile, makeTileTexture, slice } from './util';
import {io} from 'socket.io-client';

let socket = io('http://localhost:3000')

socket.on('connect', () => {
    console.log('hey');
})

const app = new PIXI.Application({
    width: 800,
    height: 600,
    backgroundColor: 0x4472c4
})
document.body.appendChild(app.view as HTMLCanvasElement);

let input = "";

let chatLog = [];

app.ticker.add(update);





init();
async function init(){
    const containerBlueButton = await makeTileTexture('assets/bevel.png', 25, 105, 25, 105);
    const containerOrangeButton = await makeTileTexture('assets/hover.png', 25, 105, 25, 105);
    const containerInsetButton = await makeTileTexture('assets/inset.png', 25, 105, 25, 105);
    
    const orangeButton = createTile(containerOrangeButton, 125, 50);
    const insetButton = createTile(containerInsetButton, 125, 50);
    const blueButton = createTile(containerBlueButton, 125, 50);

    const btn = new Button('Send', onClick, blueButton, orangeButton, insetButton);
    btn.position.set(625, 525)
    app.stage.addChild(btn)


    const containerChat = new PIXI.Container();

    containerChat.position.set(0, 0);


    const testOutput = new PIXI.Graphics();
    testOutput.beginFill(0xffffff);
    testOutput.drawRoundedRect(25, 25, 750, 475, 20);
    testOutput.endFill();

    containerChat.addChild(testOutput);
    app.stage.addChild(containerChat);



    const containerInput = new PIXI.Container();
    const testInput = createTile(containerInsetButton, 575, 50);
    let text = new PIXI.Text(input);
    text.position.set(10,10);
    
    let outputText = new PIXI.Text('');
    testOutput.addChild(outputText);
    outputText.position.set(30, 25)
   
    document.body.addEventListener('keydown', (e) => {
        if (e.key == 'Backspace'){
            input = input.slice(0, -1);
            text.text = input;
            return;
        }
        if (e.key == 'Enter'){
            onClick();
        }
        if (e.key.length == 1){
            if (text.width > testInput.width - 25){
                return;
            }
            input += e.key;
            text.text = input;
        } 
    })
    
    containerInput.position.set(25, 525);
    containerInput.addChild(testInput);
    
    containerInput.addChild(text);

        

    app.stage.addChild(containerInput);
    
    function onClick(){
        if (!input){
            return;
        }
        chatLog.push(input);
        if (chatLog.length > 15){
            chatLog.shift();
        }
        outputText.text = chatLog.join('\n')

        input = '';
        text.text = input;
        //setup socket.io emitting msg here
    }
    
}
function update(dt: number){
   // init()
}























//*my btn code :

 // orangeButton.visible = false;
    // blueButton.visible = true;
    // insetButton.visible = false;


    // const containerBtn = new PIXI.Container();
    // containerBtn.interactive = true;

    // containerBtn.position.set(625, 525);

    // containerBtn.addChild(blueButton);
    // containerBtn.addChild(orangeButton);
    // containerBtn.addChild(insetButton);
    // app.stage.addChild(containerBtn);



    // containerBtn.on('mouseenter', () => {
    //     orangeButton.visible = true;
    // });

    // containerBtn.on('mouseleave', () => {
    //     orangeButton.visible = false;
    // })

    // containerBtn.on('mousedown', () => {
    //     insetButton.visible = true;
    // })
    // containerBtn.on('mouseup', () => {
    //     insetButton.visible = false;
    // })

     // const btnText = new PIXI.Text('SendAAAAAAAAAAAAAAAA', {
    //     fontFamily: 'Arial',
    //     fill: 0xff1010,
    //     //align: 'center',
        
    // })
    // btnText.position.set(containerBtn.width / 4, containerBtn.height / 4);
    // containerBtn.addChild(btnText);


//





