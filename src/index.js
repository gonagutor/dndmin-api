// FileName: index.js
import servConsole from 'console';
import app from './app';
import './database';

app.listen(process.env.PORT || 8080, () => {
  servConsole.log(`Server running on http://localhost:${process.env.PORT || 8080}`);
});
