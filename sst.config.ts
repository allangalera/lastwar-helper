/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "lastwar-helper",
      removal: "remove",
      home: "aws",
    };
  },
  async run() {
    new sst.aws.SolidStart("MyWeb");
  },
});
