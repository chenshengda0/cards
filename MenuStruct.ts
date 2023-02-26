class MenuStruct{

    private blob = new Blob( [JSON.stringify([
        {id: 1, pid: 0, title: "page1" },
        {id: 11, pid: 1, title: "page1-1" },
        {id: 111, pid: 11, title: "page1-1-1" },
        {id: 1111, pid: 111, title: "page1-1-1-1" },
        {id: 11111, pid: 1111, title: "page1-1-1-1-1" },
    ])], {type: "text/xml"} )

    private static Instance:MenuStruct;
    private constructor(){}
    static async getInstance(){
        if( !MenuStruct.Instance ){
            MenuStruct.Instance = new MenuStruct()
        }
        return MenuStruct.Instance;
    }

    async getMenu(){
        try{
            const reader = this.blob.stream()
            const toMenu = new TransformStream({
                async transform( thunk, controller ){
                    const menu = JSON.parse( Buffer.from( thunk ).toString("utf8") )
                    console.log("原數據: ", menu)
                    const menuObj = menu.reduce( (prev:any, cur:any)=>{
                        return {
                            ...prev,
                            [cur.id]: {
                                ...cur,
                                titles: "",
                                path: []
                            }
                        }
                    },{} )
                    const dfs = function(menu:any[],temp:any[]){
                        if( temp.length >= 1 && temp[0].pid === 0 ){
                            menuObj[ temp.slice(-1)[0].id ].titles = `/${temp.map( (row)=> row.title ).join("/")}`;
                            menuObj[ temp.slice(-1)[0].id ].path = temp.map( (row)=> row.id );
                        }
                        for( let i = 0; i < menu.length; i++ ){
                            const current = JSON.parse( JSON.stringify( menu ) )
                            if( temp.length >=1 && temp.slice(-1)[0].id !== current[i].pid ) continue;
                            temp.push( current[i] )
                            const next = current.filter( (row:any,index:number) => index !==  i )
                            dfs( next, temp )
                            temp.pop()
                        }
                    }
                    dfs(menu, [])
                    //console.table( menuObj )
                    controller.enqueue( Buffer.from( JSON.stringify( Object.values( menuObj ) ) ) )
                }
            })
            console.log( "菜單結構數據: ", await new Response( reader.pipeThrough( toMenu ) ).json() )
        }catch(err:any){
            console.log( err.message )
        }finally{
            console.log("獲取菜單結構數據")
        }
    }

}

;(async()=>{
    const menuStruct = await MenuStruct.getInstance()
    console.log( "/**********************************************************************DFS獲取菜單結構******************************************************************/" )
    await menuStruct.getMenu()
    console.log( "/**********************************************************************DFS獲取菜單結構******************************************************************/" )
})();

export {

}