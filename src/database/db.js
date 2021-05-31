import mongoose from 'mongoose';

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.3gbsf.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
}

mongoose.connect(uri, options)
    .then(() => {
        console.log('Database is connected!');
    })
    .catch(error => {
        console.error(error);
    })

export default mongoose;