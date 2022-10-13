
export default async ()=> {
  // console.log("global teardown");
  await global.mongod.stop();
};