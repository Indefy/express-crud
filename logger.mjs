import { createLogger, transports, format } from 'winston';

const logger = createLogger({
  transports: [
    new transports.File({ filename: './logs/http.log' }),
    new transports.File({ filename: './logs/errors.log', level: 'error' }),
  ],
  format: format.combine(
    format.timestamp(),
    format.json()
  )
});

logger.stream = {
  write: function(message) {
    logger.info(message.trim());
  }
};
export default logger;