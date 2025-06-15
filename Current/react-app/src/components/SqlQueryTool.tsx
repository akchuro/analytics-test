import { useCallback, useState } from "react";
import { QueryRenderer } from "@cubejs-client/react";
import Editor from "@monaco-editor/react";
import cubejsApi from "../cubejs-config";

interface SqlQueryToolProps {}

function SqlQueryTool(props: SqlQueryToolProps) {
    const defaultQuery = `{
  "measures": [
    "Documents.estimateCount",
    "Documents.contractCount",
    "Documents.conversionRate"
  ],
  "dimensions": [
    "Documents.monthCreated",
    "Employees.fullName"
  ],
  "order": {
    "Documents.monthCreated": "asc"
  }
}`;

    const [query, setQuery] = useState(defaultQuery);
    const [error, setError] = useState<string>("");
    const [queryObj, setQueryObj] = useState<any>(JSON.parse(defaultQuery));

    const executeQuery = useCallback(() => {
        try {
            const parsedQuery = JSON.parse(query);
            setQueryObj(parsedQuery);
            setError("");
        } catch (error) {
            setError(error instanceof Error ? error.message : "Invalid JSON");
        }
    }, [query]);

    return (
        <div className="min-h-screen bg-black p-4">
            <div className="flex flex-col w-full">
                <div className="flex gap-6">
                    <div className="w-1/4 flex flex-col">
                        <h1 className="text-xl font-semibold text-white mb-2">Cube.js Query</h1>
                        <div className="bg-white p-4 rounded-lg border-2 border-blue-500" style={{ height: "70vh" }}>
                            <Editor
                                value={query}
                                onChange={(text) => setQuery(text || "")}
                                height="100%"
                                defaultLanguage="json"
                                options={{
                                    minimap: { enabled: false },
                                    fontSize: 14,
                                    scrollBeyondLastLine: false
                                }}
                            />
                            {error && <div className="text-red-600 mt-2">{error}</div>}
                        </div>
                        <button
                            className="bg-blue-700 text-white px-4 py-2 hover:bg-blue-600 mt-4 w-max"
                            onClick={executeQuery}
                        >
                            Execute Query
                        </button>
                    </div>

                    <div className="w-1/2 flex flex-col ml-auto">
                        <h1 className="text-xl font-semibold text-white mb-2">Answer</h1>
                        <div className="bg-white p-4 rounded-lg border-2 border-blue-500" style={{ height: "70vh" }}>
                            <QueryRenderer
                                query={queryObj}
                                cubejsApi={cubejsApi}
                                render={({ resultSet, error, loading }) => {
                                    if (loading) {
                                        return <div className="flex items-center justify-center h-full">Loading...</div>;
                                    }

                                    if (error) {
                                        return (
                                            <div className="text-red-600">
                                                <h3>Error:</h3>
                                                <pre className="text-sm mt-2">{error.toString()}</pre>
                                            </div>
                                        );
                                    }

                                    if (!resultSet) {
                                        return (
                                            <div className="flex items-center justify-center h-full text-gray-500">
                                                No data to display. Execute a query first.
                                            </div>
                                        );
                                    }

                                    const tablePivotData = resultSet.tablePivot();
                                    const rowData = tablePivotData.map((row: any, index: number) => ({
                                        ...row,
                                        key: `row_${index}`
                                    }));

                                    if (!rowData || rowData.length === 0) {
                                        return (
                                            <div className="flex items-center justify-center h-full text-gray-500">
                                                No data found.
                                            </div>
                                        );
                                    }

                                    return (
                                        <div className="h-full">
                                            <div className="mb-4 text-sm text-gray-600">
                                                Found {rowData.length} records
                                            </div>

                                            <div className="overflow-auto" style={{ height: "calc(100% - 40px)" }}>
                                                <table className="w-full border-collapse border border-gray-300 text-black">
                                                    <thead>
                                                    <tr className="bg-gray-100">
                                                        <th className="border border-gray-300 px-4 py-2 text-left text-black font-semibold">Месяц</th>
                                                        <th className="border border-gray-300 px-4 py-2 text-left text-black font-semibold">Сотрудник</th>
                                                        <th className="border border-gray-300 px-4 py-2 text-left text-black font-semibold">Estimate</th>
                                                        <th className="border border-gray-300 px-4 py-2 text-left text-black font-semibold">Contract</th>
                                                        <th className="border border-gray-300 px-4 py-2 text-left text-black font-semibold">Конверсия (%)</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {rowData.map((row: any, index: number) => (
                                                        <tr key={index} className="hover:bg-gray-50">
                                                            <td className="border border-gray-300 px-4 py-2 text-black">
                                                                {row['Documents.monthCreated']}
                                                            </td>
                                                            <td className="border border-gray-300 px-4 py-2 text-black">
                                                                {row['Employees.fullName']}
                                                            </td>
                                                            <td className="border border-gray-300 px-4 py-2 text-black">
                                                                {row['Documents.estimateCount']}
                                                            </td>
                                                            <td className="border border-gray-300 px-4 py-2 text-black">
                                                                {row['Documents.contractCount']}
                                                            </td>
                                                            <td className="border border-gray-300 px-4 py-2 text-black">
                                                                {row['Documents.conversionRate']}%
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    );
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SqlQueryTool;