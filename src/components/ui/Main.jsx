import Home from "../../pages/Home";
import Header from "./Header";

const Main = ({children})=>{
    

    return (
        <main className="flex-1">
            <Header/>
            <Home/>
        </main>
    )
}
export default Main;