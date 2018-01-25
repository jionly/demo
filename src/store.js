const STORAGE_KEY="todolist"
export default{
    fetch(){
        return JSON.parse(window.localStorage.getItem( STORAGE_KEY)||"[]")
    },
    save(tasks){
        window.localStorage.setItem(STORAGE_KEY,JSON.stringify(tasks))
    }
}