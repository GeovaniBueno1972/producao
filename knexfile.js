// Update with your config settings.


module.exports = {
  
    client:'postgresql',
    connection: {
      connectionString: 'postgres://mocutjaxmpefri:7a00ac34c66a83f0ed6490c376e91bb4fc5d12c0044d5512e3d12ac6f3f0fa4e@ec2-44-194-201-94.compute-1.amazonaws.com:5432/dd3gkc07tfoolb',
      ssl: {
        rejectUnauthorized: false
      },
      connectionOptions: {
        DateStyle: 'ISO,DMY',
      }

    }

}


