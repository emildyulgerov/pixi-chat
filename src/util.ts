import * as PIXI from 'pixi.js';


export async function makeTileTexture(url: string, left: number, right: number, top: number, bottom: number){
    const texture = PIXI.BaseTexture.from(url);

    await new Promise((res, rej) => {
        texture.on('loaded', res);
        texture.on('error', rej);
    });


    const lw = left; // 25
    const cw = right - left;  // right - 25 = 80 => right = 105
    const rw = texture.width - right; // right = 105 => texture.width = 130

    const th = top;
    const ch = bottom - top;
    const bh = texture.height - bottom;

    return [
        [
            slice(texture, 0, 0, lw, th),
            slice(texture, left, 0, cw, th),
            slice(texture, right, 0, rw, th),
        ],
        [
            slice(texture, 0, top, lw, ch),
            slice(texture, left, top, cw, ch),
            slice(texture, right, top, rw, ch),
        ],
        [
            slice(texture, 0, bottom, lw, bh),
            slice(texture, left, bottom, cw, bh),
            slice(texture, right, bottom, rw, bh),
        ],
    ];
}


export function createTile(tiles, width: number, height: number){
    const container = new PIXI.Container();

    const b_tl = new PIXI.Sprite(tiles[0][0]);
    const b_t = new PIXI.Sprite(tiles[0][1]);
    const b_tr = new PIXI.Sprite(tiles[0][2]);


    const b_bl = new PIXI.Sprite(tiles[2][0]);
    const b_b = new PIXI.Sprite(tiles[2][1]);
    const b_br = new PIXI.Sprite(tiles[2][2]);
    
    const b_l = new PIXI.Sprite(tiles[1][0]);
    const b_r = new PIXI.Sprite(tiles[1][2]);
    
    if (width > (b_tl.width + b_tr.width)) {
        b_t.width = width - (b_tl.width + b_tr.width);
        b_b.width = width - (b_bl.width + b_br.width);

        b_t.position.set(b_tl.width, 0);
        b_b.position.set(b_bl.width, height - b_b.height);

        container.addChild(b_t, b_b);
    }

    b_tl.position.set(0, 0);
    b_tr.position.set(width - b_tr.width, 0);
    b_bl.position.set(0, height - b_bl.height);
    b_br.position.set(width - b_br.width, height - b_br.height);

    b_t.position.set(b_tl.width, 0);
    b_b.position.set(b_bl.width, height - b_b.height);

    // b_l.position.set(0, b_tl.height);
    // b_r.position.set(width - b_r.width, b_tr.height);

 

    container.addChild(b_tl, b_t, b_tr, b_bl, b_b, b_br);

    return container;
}


export function slice(baseTexture, x, y, w, h){
    return new PIXI.Texture(baseTexture, new PIXI.Rectangle(x, y, w, h))
}