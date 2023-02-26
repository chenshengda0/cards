class Water{

    private static Instance:Water;
    private constructor(){}
    static async getInstance(){
        if( !Water.Instance ){
            Water.Instance = new Water()
        }
        return Water.Instance;
    }

    async five(){
        //A-B B-A A-C C-A B-C C-B 六種可能
        const vist = [
            {
                from: 0,
                to: 1,
            },
            {
                from: 1,
                to: 0,
            },
            {
                from: 0,
                to: 2,
            },
            {
                from: 2,
                to: 0,
            },
            {
                from: 1,
                to: 2,
            },
            {
                from: 2,
                to: 1,
            }
        ]
        const box = [
            {
                capacity: 10,
                current: 10,
            },
            {
                capacity: 7,
                current: 0,
            },
            {
                capacity: 3,
                current: 0,
            }
        ]
        const data:any = []
        const result = new Set();
        const dfs = function(box:any,temp:any){
            //console.log( result )
            if( box[0].current === 5 && box[1].current === 5 ){// && box[1].current === 5
                data.push( [...temp] )
                return 
            }
            for( let i = 0; i < vist.length; i++ ){
                //複製變量
                const current = JSON.parse( JSON.stringify(box) )
                //const temp = JSON.parse( JSON.stringify(box) )
                //to 杯子已滿，剪枝
                if( current[vist[i].to].current === current[vist[i].to].capacity ){
                    //console.log( "to box 已滿", "vist: ", vist[i], "box: ", current )
                    continue;
                }
                //from 杯子為空杯，剪枝
                if( current[vist[i].from].current === 0 ){
                    //console.log( "from box 為空","vist: ", vist[i], "box: ", current )
                    continue;
                }
                if( result.has( box.map( (row:any) => row.current ).join("-") ) ){
                    //console.log( "狀態已存在","vist: ", vist[i], "box: ", current )
                    continue;
                }
                //console.log( "倒水","vist: ", vist[i], "box: ", current )
                //執行倒水
                //接收的杯子最多能接收多少升水
                const toLast =  current[vist[i].to].capacity - current[vist[i].to].current;
                //倒水的杯子剩餘多少升水
                const fromCurrent = current[vist[i].from].current;
                if( toLast <= fromCurrent ){
                    //倒滿
                    //計算剩餘水量
                    current[vist[i].from].current -= toLast;
                    current[vist[i].to].current += toLast
                    //console.log( "倒滿：", vist[i], "prev:", prev, "box: ", box )
                }else{
                    //倒完
                    current[vist[i].from].current = 0;
                    current[vist[i].to].current += fromCurrent;
                    //console.log( "倒完：", vist[i], "prev:", prev, "box: ", box )
                }
                temp.push( {handle: vist[i], start: box.map( (row:any) => row.current ).join("-"), end: current.map( (row:any) => row.current ).join("-") } )
                result.add( box.map( (row:any) => row.current ).join("-") )
                //console.log( "vist: ", vist[i], "box: ", box, "prev: ", prev )
                dfs(current,temp)
                temp.pop()
                result.delete( box.map( (row:any) => row.current ).join("-") )
            }
        }
        dfs(box,[])
        data.sort( (a:any, b:any)=>a.length - b.length )
        console.table( data[0] )
    }

}

;(async()=>{
    const water = await Water.getInstance()
    console.log( "/**********************************************************************平分出5L水******************************************************************/" )
    console.log( "從10L/10L、7L/0L、3L/0L三個容器中將水平分成兩份" )
    await water.five()
    console.log( "/**********************************************************************平分出5L水******************************************************************/" )
})();
export {

}