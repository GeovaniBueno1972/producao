// Update with your config settings.


module.exports = {
  
    client:'postgresql',
    connection: {
      connectionString: 'postgres://enlggwngtipbtr:adc51e4b93ccc89385901ee39117d5dc02f49269a4b93e137e5be33b97574aa9@ec2-34-228-100-83.compute-1.amazonaws.com:5432/da79pdnm8df5lr',
      ssl: {
        rejectUnauthorized: false
      },
      connectionOptions: {
        DateStyle: 'ISO,DMY',
      }

    }

}


