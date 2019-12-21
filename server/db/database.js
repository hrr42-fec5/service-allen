
const cassandra = require('cassandra-driver'),
      authProvider = new cassandra.auth.PlainTextAuthProvider('scylla', 'PASSWORD');

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  keyspace: 'zagat'
});

client.connect()
  .then((err) => {
    if(err) {
      console.log(err);
    }else {
      console.log("[Database] Connection Success");
    }
  });

module.exports = client;