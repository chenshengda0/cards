const inquirer = require("inquirer");
class CreateCards{

    private static Instance:CreateCards;
    private constructor(){}
    static getInstance(){
        if( !CreateCards.Instance ){
            CreateCards.Instance = new CreateCards();
        }
        return CreateCards.Instance;
    }

    creator(limit:number = 20){
        const colors = ["Spade","Heart","Club","Diamond"]
        const cards = Array.from( "A234567890JQK" ).reduce( (prev:any, cur: any)=>{
            for( const color of colors ){
                switch( cur ){
                    case "A":
                        prev.push( [color, cur, 1] );
                        break;
                    case "0":
                        prev.push( [color, "10", 10] );
                        break;
                    case "J":
                        prev.push( [color, cur, 11] );
                        break;
                    case "Q":
                        prev.push( [color, cur, 12] );
                        break;
                    case "K":
                        prev.push( [color, cur, 13] );
                        break;
                    default:
                        prev.push( [color, cur, parseInt(cur)] );
                        break
                }
            }
            return prev;
        },[] );
        const shuffle_cards = cards.sort( ()=> 0.5 - Math.random() ).slice( 0, limit )
        console.table( shuffle_cards )
        return shuffle_cards;
    }
}

class Cards{
    private static Instance:Cards;
    private constructor(){}
    static getInstance(){
        if( !Cards.Instance ){
            Cards.Instance = new Cards();
        }
        return Cards.Instance
    }

    Ais1(cards:any[]){
        const result:any[] = []
        const A1Same = function(arr:any){
            const paramArr = arr.reduce( (prev:any, cur:any)=>{
                const current =  cur[1] === "A" ? [cur[0], cur[1], 1] : cur
                return [ ...prev, current ]
            },[] )
            const _recursive = function(arr:any, temp:any){
                if( temp.length >= 3 ){
                    result.push( `${temp.map( (row:any)=> row.join("-") ).join("_")}_` )
                }
                for( let i = 0; i < arr.length; i++  ){
                    if( i > 0 && arr[i][2] === arr[i-1][2] ) continue;
                    if( temp.length >= 1 && temp.slice(0,1)[0][2] !== arr[i][2]  ) continue;
                    const tempArr = arr.filter( (_:any,index:number)=> index !== i )
                    //console.log( "tempArr: ", tempArr )
                    temp.push( arr[i] )
                    _recursive( tempArr, temp )
                    temp.pop()
                }
            }
            _recursive( paramArr.sort( (a:any,b:any) => a[2] - b[2] ), [] )
        }
        const A1Sort = function(arr:any){
            const paramArr = arr.reduce( (prev:any, cur:any)=>{
                const current =  cur[1] === "A" ? [cur[0], cur[1], 1] : cur
                return [ ...prev, current ]
            },[])
            const _recursive = function(arr:any, temp:any){
                if( temp.length >= 3 ){
                    result.push( `${temp.map( (row:any)=> row.join("-") ).join("_")}_` )
                }
                for( let i = 0; i < arr.length; i++  ){
                    if( temp.length >= 1 &&  arr[i][2] - temp.slice(-1)[0][2] !== 1 ) continue;
                    const tempArr = arr.filter( (_:any,index:number)=> index !== i )
                    temp.push( arr[i] )
                    _recursive( tempArr, temp )
                    temp.pop()
                }
            }
            //分組
            const SpadeArr = paramArr.sort( (a:any,b:any) =>  a[0].localeCompare(b[0]) ).filter( (row:any) => row[0] === "Spade" ).sort( (a:any,b:any)=> a[2] - b[2] );
            const HeartArr = paramArr.sort( (a:any,b:any) =>  a[0].localeCompare(b[0]) ).filter( (row:any) => row[0] === "Heart" ).sort( (a:any,b:any)=> a[2] - b[2] );
            const ClubArr = paramArr.sort( (a:any,b:any) =>  a[0].localeCompare(b[0]) ).filter( (row:any) => row[0] === "Club" ).sort( (a:any,b:any)=> a[2] - b[2] );
            const DiamondArr = paramArr.sort( (a:any,b:any) =>  a[0].localeCompare(b[0]) ).filter( (row:any) => row[0] === "Diamond" ).sort( (a:any,b:any)=> a[2] - b[2] );
            _recursive( SpadeArr, [] )
            _recursive( HeartArr, [] )
            _recursive( ClubArr, [] )
            _recursive( DiamondArr, [] )
        }
        A1Same( cards )
        A1Sort( cards )
        console.log("A == 1")
        //console.table( result )
        this.getLast( result )
    }

    Ais14(cards:any[]){
        const result:any[] = [];
        const A14Same = function(arr:any){
            const paramArr = arr.reduce( (prev:any, cur:any)=>{
                const current =  cur[1] === "A" ? [cur[0], cur[1], 14] : cur
                return [ ...prev, current ]
            },[])
            const _recursive = function(arr:any, temp:any){
                if( temp.length >= 3 ){
                    result.push( `${temp.map( (row:any)=> row.join("-") ).join("_")}_` )
                }
                for( let i = 0; i < arr.length; i++  ){
                    if( i > 0 && arr[i][2] === arr[i-1][2] ) continue;
                    if( temp.length >= 1 && temp.slice(0,1)[0][2] !== arr[i][2]  ) continue;
                    const tempArr = arr.filter( (_:any,index:number)=> index !== i )
                    //console.log( "tempArr: ", tempArr )
                    temp.push( arr[i] )
                    _recursive( tempArr, temp )
                    temp.pop()
                }
            }
            _recursive( paramArr.sort( (a:any,b:any) => a[2] - b[2] ), [] )
        }
        const A14Sort = function(arr:any){
            const paramArr = arr.reduce( (prev:any, cur:any)=>{
                const current =  cur[1] === "A" ? [cur[0], cur[1], 14] : cur
                return [ ...prev, current ]
            }, [])
            const _recursive = function(arr:any, temp:any){
                if( temp.length >= 3 ){
                    result.push( `${temp.map( (row:any)=> row.join("-") ).join("_")}_` )
                }
                for( let i = 0; i < arr.length; i++  ){
                    if( temp.length >= 1 &&  arr[i][2] - temp.slice(-1)[0][2] !== 1 ) continue;
                    const tempArr = arr.filter( (_:any,index:number)=> index !== i )
                    temp.push( arr[i] )
                    _recursive( tempArr, temp )
                    temp.pop()
                }
            }
            //分組
            const SpadeArr = paramArr.sort( (a:any,b:any) =>  a[0].localeCompare(b[0]) ).filter( (row:any) => row[0] === "Spade" ).sort( (a:any,b:any)=> a[2] - b[2] );
            const HeartArr = paramArr.sort( (a:any,b:any) =>  a[0].localeCompare(b[0]) ).filter( (row:any) => row[0] === "Heart" ).sort( (a:any,b:any)=> a[2] - b[2] );
            const ClubArr = paramArr.sort( (a:any,b:any) =>  a[0].localeCompare(b[0]) ).filter( (row:any) => row[0] === "Club" ).sort( (a:any,b:any)=> a[2] - b[2] );
            const DiamondArr = paramArr.sort( (a:any,b:any) =>  a[0].localeCompare(b[0]) ).filter( (row:any) => row[0] === "Diamond" ).sort( (a:any,b:any)=> a[2] - b[2] );
            _recursive( SpadeArr, [] )
            _recursive( HeartArr, [] )
            _recursive( ClubArr, [] )
            _recursive( DiamondArr, [] )
        }
        A14Same( cards )
        A14Sort( cards )
        console.log("A == 14")
        //console.table( result )
        this.getLast( result )
    }

    Ais1OR14(cards:any[]){
        const result:any[] = [];
        const A1Same = function(arr:any){
            const paramArr = arr.reduce( (prev:any, cur:any)=>{
                const current =  cur[1] === "A" ? [cur[0], cur[1], 1] : cur
                return [ ...prev, current ]
            },[] )
            const _recursive = function(arr:any, temp:any){
                if( temp.length >= 3 ){
                    result.push( `${temp.map( (row:any)=> row.join("-") ).join("_")}_` )
                }
                for( let i = 0; i < arr.length; i++  ){
                    if( i > 0 && arr[i][2] === arr[i-1][2] ) continue;
                    if( temp.length >= 1 && temp.slice(0,1)[0][2] !== arr[i][2]  ) continue;
                    const tempArr = arr.filter( (_:any,index:number)=> index !== i )
                    //console.log( "tempArr: ", tempArr )
                    temp.push( arr[i] )
                    _recursive( tempArr, temp )
                    temp.pop()
                }
            }
            _recursive( paramArr.sort( (a:any,b:any) => a[2] - b[2] ), [] )
        }
        const A14Same = function(arr:any){
            const paramArr = arr.reduce( (prev:any, cur:any)=>{
                const current =  cur[1] === "A" ? [cur[0], cur[1], 14] : cur
                return [ ...prev, current ]
            },[])
            const _recursive = function(arr:any, temp:any){
                if( temp.length >= 3 ){
                    result.push( `${temp.map( (row:any)=> row.join("-") ).join("_")}_` )
                }
                for( let i = 0; i < arr.length; i++  ){
                    if( i > 0 && arr[i][2] === arr[i-1][2] ) continue;
                    if( temp.length >= 1 && temp.slice(0,1)[0][2] !== arr[i][2]  ) continue;
                    const tempArr = arr.filter( (_:any,index:number)=> index !== i )
                    //console.log( "tempArr: ", tempArr )
                    temp.push( arr[i] )
                    _recursive( tempArr, temp )
                    temp.pop()
                }
            }
            _recursive( paramArr.sort( (a:any,b:any) => a[2] - b[2] ), [] )
        }
        const A1Sort = function(arr:any){
            const paramArr = arr.reduce( (prev:any, cur:any)=>{
                const current =  cur[1] === "A" ? [cur[0], cur[1], 1] : cur
                return [ ...prev, current ]
            },[])
            const _recursive = function(arr:any, temp:any){
                if( temp.length >= 3 ){
                    result.push( `${temp.map( (row:any)=> row.join("-") ).join("_")}_` )
                }
                for( let i = 0; i < arr.length; i++  ){
                    if( temp.length >= 1 &&  arr[i][2] - temp.slice(-1)[0][2] !== 1 ) continue;
                    const tempArr = arr.filter( (_:any,index:number)=> index !== i )
                    temp.push( arr[i] )
                    _recursive( tempArr, temp )
                    temp.pop()
                }
            }
            //分組
            const SpadeArr = paramArr.sort( (a:any,b:any) =>  a[0].localeCompare(b[0]) ).filter( (row:any) => row[0] === "Spade" ).sort( (a:any,b:any)=> a[2] - b[2] );
            const HeartArr = paramArr.sort( (a:any,b:any) =>  a[0].localeCompare(b[0]) ).filter( (row:any) => row[0] === "Heart" ).sort( (a:any,b:any)=> a[2] - b[2] );
            const ClubArr = paramArr.sort( (a:any,b:any) =>  a[0].localeCompare(b[0]) ).filter( (row:any) => row[0] === "Club" ).sort( (a:any,b:any)=> a[2] - b[2] );
            const DiamondArr = paramArr.sort( (a:any,b:any) =>  a[0].localeCompare(b[0]) ).filter( (row:any) => row[0] === "Diamond" ).sort( (a:any,b:any)=> a[2] - b[2] );
            _recursive( SpadeArr, [] )
            _recursive( HeartArr, [] )
            _recursive( ClubArr, [] )
            _recursive( DiamondArr, [] )
        }
        const A14Sort = function(arr:any){
            const paramArr = arr.reduce( (prev:any, cur:any)=>{
                const current =  cur[1] === "A" ? [cur[0], cur[1], 14] : cur
                return [ ...prev, current ]
            }, [])
            const _recursive = function(arr:any, temp:any){
                if( temp.length >= 3 ){
                    result.push( `${temp.map( (row:any)=> row.join("-") ).join("_")}_` )
                }
                for( let i = 0; i < arr.length; i++  ){
                    if( temp.length >= 1 &&  arr[i][2] - temp.slice(-1)[0][2] !== 1 ) continue;
                    const tempArr = arr.filter( (_:any,index:number)=> index !== i )
                    temp.push( arr[i] )
                    _recursive( tempArr, temp )
                    temp.pop()
                }
            }
            //分組
            const SpadeArr = paramArr.sort( (a:any,b:any) =>  a[0].localeCompare(b[0]) ).filter( (row:any) => row[0] === "Spade" ).sort( (a:any,b:any)=> a[2] - b[2] );
            const HeartArr = paramArr.sort( (a:any,b:any) =>  a[0].localeCompare(b[0]) ).filter( (row:any) => row[0] === "Heart" ).sort( (a:any,b:any)=> a[2] - b[2] );
            const ClubArr = paramArr.sort( (a:any,b:any) =>  a[0].localeCompare(b[0]) ).filter( (row:any) => row[0] === "Club" ).sort( (a:any,b:any)=> a[2] - b[2] );
            const DiamondArr = paramArr.sort( (a:any,b:any) =>  a[0].localeCompare(b[0]) ).filter( (row:any) => row[0] === "Diamond" ).sort( (a:any,b:any)=> a[2] - b[2] );
            _recursive( SpadeArr, [] )
            _recursive( HeartArr, [] )
            _recursive( ClubArr, [] )
            _recursive( DiamondArr, [] )
        }
        A1Same( cards )
        A14Same( cards )
        A1Sort( cards )
        A14Sort( cards )
        console.log( "A == 1 OR A == 14" )
        //console.table( result )
        this.getLast( result )
    }

    //計算最大組
    getLast(arr:any[]){
        try{
            if( arr.length <= 0 ){
                throw new Error("未查詢到卡牌組") 
            }
            const dp = Array.from( {length: arr.length}, (_,i)=>({cardString: arr[i], cardNum: 0, cardGroup: [] }) );
            const re = new RegExp( /[0-9]+(?=_)/, "g" );
            dp.map( (row:any, i:number)=>{
                dp[i].cardNum =  eval( row["cardString"].match( re ).join("+") );
                dp[i].cardGroup = row["cardString"].split("_").filter( (row:any) => row )
            } )
            //排序
            dp.sort( (a,b)=>b.cardNum - a.cardNum )
            console.table( dp )
            console.log( "最大組合(和): ",dp[0].cardNum, "最大組合(列表): ", dp[0].cardGroup.join( "," )  )
        }catch(err:any){
            console.log( err.message )
        }finally{
            console.log( "查詢最大組" )
        }

    }


}

;( async()=>{
    /*
        2. [可选] 设一副包含点数从A到K,四种花色的52张牌, 将 三张及以上同点数不同花色的牌组 或者三张以及上的同花顺称为 `组合`,
        求出给定一副20张以内的牌中,所能形成的最优的组合列表(最优即组合点数累加最大)
    */

    const createCards = CreateCards.getInstance();
    const LimitParam = await inquirer.prompt([
        {
          name: "LimitCount",
          message: `请輸入卡牌數量？`,
          type: "input",
          default: 20,
        },
    ]);
    const InputCards = createCards.creator( LimitParam.LimitCount )
    const cards = Cards.getInstance()
    let flag:boolean = true;
    while( flag ){
        const compileParam = await inquirer.prompt([
            {
                name: "CompileType",
                message: `请选择编译类型？`,
                type: "list",
                choices: [
                    "Ais1", 
                    "Ais14",
                    "Ais1OR14",
                    "end"
                ],
            },
        ]);
        switch( compileParam.CompileType ){
            case "Ais1":
                cards.Ais1( InputCards );
                break;
            case "Ais14":
                cards.Ais14( InputCards );
                break;
            case "Ais1OR14":
                cards.Ais1OR14( InputCards );
                break;
            default:
                flag = false;
                break;
        }
    }

} )();

export {}