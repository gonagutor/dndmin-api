import mongoose from 'mongoose';
import servConsole from 'console';

mongoose.connect(process.env.USERANDPWD, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

servConsole.log(!mongoose.connection ? 'Error connecting db' : 'Db connected successfully');
