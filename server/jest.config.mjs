// jest.config.mjs
export default {
  testTimeout: 10000,
  testEnvironment: "node",
  transform: {
    "^.+\\.m?js$": "babel-jest",
  },
  moduleFileExtensions: ["js", "mjs"],
  testMatch: ["**/test/**/*.js"],
};
