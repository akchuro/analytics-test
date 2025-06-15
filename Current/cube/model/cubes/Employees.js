cube(`Employees`, {
  sql: `SELECT * FROM Employees`,

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

    firstName: {
      sql: `FirstName`,
      type: `string`
    },

    secondName: {
      sql: `SecondName`,
      type: `string`
    },

    lastName: {
      sql: `LastName`,
      type: `string`
    },

    fullName: {
      sql: `
        CASE 
          WHEN SecondName IS NOT NULL AND SecondName != '' 
          THEN FirstName || ' ' || SecondName || ' ' || LastName
          ELSE FirstName || ' ' || LastName
        END
      `,
      type: `string`
    }
  }
});