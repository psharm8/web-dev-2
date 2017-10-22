const NRP = requires("node-redis-pubsub");
const config = {
  prot: 6379,
  scope: "downloader"
};
const nrp = new NRP(config);

module.exports = nrp;
