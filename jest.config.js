module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  testMatch: ["**/tests/**/?(*.)+(spec|test).js"],
  testEnvironment: "node",
  testPathIgnorePatterns: [
    "/node_modules/",
    "/src/",
    "/lib/",
    "/coverage/"
  ],
};