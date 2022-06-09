let intensidade = [];
let intensidadeInicial = 35;
let canvas = [];
let x = 60;
let y = 30;
let htmlTable = "";
let development = false;
let estilo = ""
const fireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]



function start(){
    // varreArray()
    dadosIniciais()
    desenhaTabela()

    setInterval(() => {
        varreArray();

        desenhaTabela()
        
    }, 10);

}

start();


function desenhaTabela(){
    htmlTable = '';
    lengthCanvas = x * y;
    tabela = document.querySelector("#canvas");
    num = 0;
    intensidadeInicial -=  (y-1);

    for (i = 0; i < y; i++) {
        htmlTable += `<tr>`
        num = i * x;
        for (j = 0; j < x; j++) {
            //se estiver em ambiente de desenvolvimento
            //ele popula o array com números na intensidade
            if (development){
                intensidade[num + j] = intensidadeInicial;
            }
            

            estilo = (development)?`color:${renderizaIntensidade(num + j)}`:`background-color:${renderizaIntensidade(num + j)}`;
            htmlTable += (development)?`  <td style="${estilo}">
                                <span class="index">${num + j}</span>
                                <span class="intense">${intensidade[num + j]}</span>
                            </td>`: `<td style="${estilo}"></td>`;
            
        }
        htmlTable += `</tr>`
        if (development){
            intensidadeInicial++; 
        }
        
    }

    

    tabela.innerHTML = htmlTable;

}

function renderizaIntensidade(pos){
    let addColor = 0;
    addColor = ((addColor + pos) >= 15 & (addColor + pos) <= 31)?5:0;
    
    return `rgb(${fireColorsPalette[intensidade[pos+(addColor)]].r}, ${fireColorsPalette[intensidade[pos+(addColor)]].g}, ${fireColorsPalette[intensidade[pos+(addColor)]].b})`

}
function varreArray(){
    

    for (i = y+1; i != 0; i--) {
        num = i * x;
        for (j = x; j != 0; j--) {
            if (intensidade[num+j+x]>0){
                payload = Math.floor(1+Math.random() * (intensidade[num+j+x]/3));
                console.log(payload);
                //randomiza a direção do fogo
                diff = Math.floor(-Math.random()+Math.random());
                intensidade[num + j+diff] = intensidade[num+j+(x)] - payload<=36?intensidade[num+j+x] - payload:0;
                // intensidade[num + j-x-2] = intensidade[num+j+(x)] - payload<=32?intensidade[num+j+x] - payload:0;
                // intensidade[num + j-(x*2)-1] = intensidade[num+j] - payload<=32?intensidade[num+j+x] - payload:0;
            }


            // if (num+j-1 <= num){
            //     intensidade[num+j-1] > 0 = intensidade[num+j-1]>0
            // }
        }
    }


    for (let i = 0; i < x * y; i++){
        if ((i < x*y) & i >= (x*y-x)){
            intensidade[i]=27 + Math.floor(Math.random() * 6);
        }else{
            intensidade[i]=intensidade[i];
        }
    }

}


function dadosIniciais(){
    
    
    for (let i = 0; i < x * y; i++){
        if ((i < x*y) & i >= (x*y-x)){
            intensidade[i]=28 + Math.floor(Math.random() * 5);
        }else{
            intensidade[i]=0;
        }
    }
    console.log(intensidade);
}


