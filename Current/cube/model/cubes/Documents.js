cube(`Documents`, {
  sql: `SELECT * FROM Documents`,

  joins: {
    Employees: {
      sql: `${CUBE}.ResponsibleEmployee = ${Employees}.ID`,
      relationship: `belongsTo`
    },

    Projects: {
      sql: `${CUBE}.Project = ${Projects}.ID`,
      relationship: `belongsTo`
    }
  },

  measures: {
    count: {
      type: `count`
    },

    estimateCount: {
      sql: `Type`,
      type: `count`,
      filters: [
        { sql: `${CUBE}.Type = 'Estimate'` }
      ]
    },

    contractCount: {
      sql: `Type`,
      type: `count`,
      filters: [
        { sql: `${CUBE}.Type = 'Contract'` }
      ]
    },

    conversionRate: {
      sql: `
        CASE 
          WHEN ${estimateCount} = 0 THEN 0
          ELSE ROUND((CAST(${contractCount} AS FLOAT) * 100.0 / ${estimateCount}), 2)
        END
      `,
      type: `number`,
      format: `percent`
    }
  },

  dimensions: {
    id: {
      sql: `ID`,
      type: `number`,
      primaryKey: true
    },

    type: {
      sql: `Type`,
      type: `string`
    },

    dateCreated: {
      sql: `DateCreated`,
      type: `time`
    },

    monthCreated: {
      sql: `strftime('%Y-%m', ${CUBE}.DateCreated)`,
      type: `string`
    },

    responsibleEmployee: {
      sql: `ResponsibleEmployee`,
      type: `number`
    },

    project: {
      sql: `Project`,
      type: `number`
    }
  }
});