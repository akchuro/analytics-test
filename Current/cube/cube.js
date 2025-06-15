module.exports = {
    contextToAppId: ({ authInfo }) => 'CUBEJS_APP',
    preAggregationsSchema: ({ authInfo }) => 'pre_aggregations',
    schemaPath: 'model/cubes',

    dbType: 'sqlite',
    driverFactory: () => ({
        type: 'sqlite',
        database: process.env.CUBEJS_DB_NAME
    })
};