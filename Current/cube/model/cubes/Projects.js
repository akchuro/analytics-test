cube(`Projects`, {
    sql: `SELECT * FROM Projects`,

    measures: {
        count: {
            type: `count`
        }
    },

    dimensions: {
        id: {
            sql: `ID`,
            type: `number`,
            primaryKey: true
        },

        name: {
            sql: `Name`,
            type: `string`
        }
    }
});