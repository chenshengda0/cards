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
            //??????
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
            //??????
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
            //??????
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
            //??????
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

    //???????????????
    getLast(arr:any[]){
        try{
            if( arr.length <= 0 ){
                throw new Error("?????????????????????") 
            }
            const dp = Array.from( {length: arr.length}, (_,i)=>({cardString: arr[i], cardNum: 0, cardGroup: [] }) );
            const re = new RegExp( /[0-9]+(?=_)/, "g" );
            dp.map( (row:any, i:number)=>{
                dp[i].cardNum =  eval( row["cardString"].match( re ).join("+") );
                dp[i].cardGroup = row["cardString"].split("_").filter( (row:any) => row )
            } )
            //??????
            dp.sort( (a,b)=>b.cardNum - a.cardNum )
            console.table( dp )
            console.log( "????????????(???): ",dp[0].cardNum, "????????????(??????): ", dp[0].cardGroup.join( "," )  )
        }catch(err:any){
            console.log( err.message )
        }finally{
            console.log( "???????????????" )
        }

    }


}

;( async()=>{
    /*
        2. [??????] ????????????????????????A???K,???????????????52??????, ??? ????????????????????????????????????????????? ??????????????????????????????????????? `??????`,
        ??????????????????20??????????????????,????????????????????????????????????(?????????????????????????????????)
    */

    const createCards = CreateCards.getInstance();
    const LimitParam = await inquirer.prompt([
        {
          name: "LimitCount",
          message: `????????????????????????`,
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
                message: `????????????????????????`,
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