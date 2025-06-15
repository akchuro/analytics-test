import './App.css'
import SqlQueryTool from "./components/SqlQueryTool";
import { CubeProvider } from "@cubejs-client/react";
import cubejsApi from "./cubejs-config";

function App() {
    return (
        <CubeProvider cubejsApi={cubejsApi}>
            <SqlQueryTool />
        </CubeProvider>
    )
}

export default App