function getDirPath(depth) {
    if (!depth) {
      depth = 1;
    }
  
    let currentPath;
  
    if (process.platform === "win32") {
      currentPath = `${__dirname}`.split("\\");
    } else {
      currentPath = `${__dirname}`.split("/");
    }
  
    if (depth > currentPath.length) {
      return;
    }
  
    const resolvedPath = currentPath
      .slice(0, currentPath.length - depth)
      .join()
      .replace(/,/g, "/");
  
    return resolvedPath;
  }
  
  module.exports = getDirPath;
  