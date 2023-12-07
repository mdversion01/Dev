// web-dev-server.config.js
module.exports = {
    mimeTypes: {
      ".css": "text/css",
    },
    rootDir: "./", // Adjust the path to your project root
    // Mount the 'src' directory to '/src' in the server
    mount: {
      "/src": "./src",
    },
    // Other configuration settings
  };
  