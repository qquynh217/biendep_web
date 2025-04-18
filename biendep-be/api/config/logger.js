const path = require("path");
const winston = require("winston");

// Custom formatter để tự động lấy context
const createLogger = (context) =>
  winston.createLogger({
    level: "info",
    format: winston.format.combine(
      winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      winston.format.colorize(),
      winston.format.printf(({ timestamp, level, message }) => {
        return `[${timestamp}] ${level}: [${context}] ${message}`;
      })
    ),
    transports: [new winston.transports.Console()],
  });

module.exports = (filename) => {
  const context = path.basename(filename).replace(".js", ""); // ví dụ: LicensePlateController
  const logger = createLogger(context);

  return {
    info: (msg) => logger.info(msg),
    error: (msg) => logger.error(msg),
    warn: (msg) => logger.warn(msg),
    debug: (msg) => logger.debug(msg),
  };
};
