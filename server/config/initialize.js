// const Sequelize = require('sequelize');
// const sequelize = require('../config/database');
// const User = require('../user/user.model');
// const Podcast = require('../podcast/podcast.model');
// const Whitelist = require('../whitelist/whitelist.model');
// const UserPodcast = require('../podcast/userPodcast.model');
// const Episode = require('../episode/episode.model');
// const chalk = require('chalk');
// const Card = require('../card/card.model');


// UserPodcast.sync({ force: true });
// User.sync({ force: true });
// Podcast.sync({ force: true });
// Whitelist.sync({ force: true });
// Card.sync({ force: true });
//
// User.belongsToMany(Podcast, { through: UserPodcast, foreignKey: 'userId' });
// Podcast.belongsToMany(User, { through: UserPodcast, foreignKey: 'podcastId' });

// Whitelist.create({
//   feedUrl: 'https://www.sciencefriday.com/feed/podcast/podcast-episode',
//   email: 'vvnsze+83@gmail.com',
// }).then((success) => {
//   console.log('SUCCESS!:' , success);
// });

// Podcast.create({
//   full_name: 'Nexcast',
//   feed_url: 'http://feeds.feedburner.com/pod-save-america',
//   description: 'sure wish I had some hipster lorem',
//   email: 'bsanders808@gmail.com',
// });

// Card.create({
//   tagged_timestamp: 700,
//   podcast_id: 1,
//   episode_id: 1,
//   media_link: 'http://i.cdn.turner.com/adultswim/big/video/a/rickandmorty_ep210_003_Birdperson_And_Beth_Chit_Chat.jpg',
//   media_type: 'picture',
//   description: 'peter picked a bunch of pickled old peppers',
//   button_text: 'click me!',
//   button_link: 'https://www.youtube.com/watch?v=Y19FzsqM1as',
// }).then((inst) => {
//   console.log(chalk.blue('+++line 41 success!'), inst);
// }).catch((error) => {
//   console.log(chalk.red(`error!: ${error}`));
// });
//
// Card.create({
//   tagged_timestamp: 700,
//   podcast_id: 1,
//   episode_id: 2,
//   media_link: 'http://i.cdn.turner.com/adultswim/big/video/a/rickandmorty_ep210_003_Birdperson_And_Beth_Chit_Chat.jpg',
//   media_type: 'picture',
//   description: 'vivian picked a bunch of red pickled peppers',
//   button_text: 'click me!',
//   button_link: 'https://www.youtube.com/watch?v=Y19FzsqM1as',
// }).then((inst) => {
//   console.log(chalk.blue('+++line 41 success!'), inst);
// }).catch((error) => {
//   console.log(chalk.red(`error!: ${error}`));
// });
//
// Card.create({
//   tagged_timestamp: 700,
//   podcast_id: 1,
//   episode_id: 1,
//   media_link: 'http://i.cdn.turner.com/adultswim/big/video/a/rickandmorty_ep210_003_Birdperson_And_Beth_Chit_Chat.jpg',
//   media_type: 'picture',
//   description: 'peter picked a bunch of pickled peppers',
//   button_text: 'click me!',
//   button_link: 'https://www.youtube.com/watch?v=Y19FzsqM1as',
// }).then((inst) => {
//   console.log(chalk.blue('+++line 41 success!'), inst);
// }).catch((error) => {
//   console.log(chalk.red(`error!: ${error}`));
// });
//
// Card.create({
//   tagged_timestamp: 700,
//   podcast_id: 1,
//   episode_id: 3,
//   media_link: 'https://animalso.com/wp-content/uploads/2016/10/Pomsky-6.jpg',
//   media_type: 'video',
//   description: 'she sells sea shells for wholesale price by the sea',
//   button_text: 'please click me!',
//   button_link: 'https://www.youtube.com/watch?v=Y19FzsqM1as',
// }).then((inst) => {
//   console.log(chalk.blue('+++line 41 success!'), inst);
// }).catch((error) => {
//   console.log(chalk.red(`error!: ${error}`));
// });
//
// Card.create({
//   tagged_timestamp: 700,
//   podcast_id: 1,
//   episode_id: 4,
//   media_link: 'https://animalso.com/wp-content/uploads/2016/10/Pomsky-6.jpg',
//   media_type: 'picture',
//   description: 'vivian picked a bunch of pickled peppers',
//   button_text: 'click me!',
//   button_link: 'https://www.youtube.com/watch?v=Y19FzsqM1as',
// }).then((inst) => {
//   console.log(chalk.blue('+++line 41 success!'), inst);
// }).catch((error) => {
//   console.log(chalk.red(`error!: ${error}`));
// });
//
// Card.create({
//   tagged_timestamp: 700,
//   podcast_id: 1,
//   episode_id: 5,
//   media_link: 'http://butchbellah.com/wp-content/uploads/2014/08/podcast.jpg',
//   media_type: 'picture',
//   description: 'tempura chicken is not really a thing',
//   button_text: 'click me!',
//   button_link: 'https://www.youtube.com/watch?v=Y19FzsqM1as',
// }).then((inst) => {
//   console.log(chalk.blue('+++line 41 success!'), inst);
// }).catch((error) => {
//   console.log(chalk.red(`error!: ${error}`));
// });
//
// Card.create({
//   tagged_timestamp: 700,
//   podcast_id: 1,
//   episode_id: 5,
//   media_link: 'http://butchbellah.com/wp-content/uploads/2014/08/podcast.jpg',
//   media_type: 'picture',
//   description: 'nexcast is almost finished',
//   button_text: 'click me!',
//   button_link: 'https://www.youtube.com/watch?v=Y19FzsqM1as',
// }).then((inst) => {
//   console.log(chalk.blue('+++line 41 success!'), inst);
// }).catch((error) => {
//   console.log(chalk.red(`error!: ${error}`));
// });
//
// Card.create({
//   tagged_timestamp: 700,
//   podcast_id: 1,
//   episode_id: 5,
//   media_link: 'https://www.youtube.com/watch?v=a7fzkqLozwA',
//   media_type: 'picture',
//   description: 'tortilla chips are the best',
//   button_text: 'click me!',
//   button_link: 'https://www.youtube.com/watch?v=Y19FzsqM1as',
// }).then((inst) => {
//   console.log(chalk.blue('+++line 41 success!'), inst);
// }).catch((error) => {
//   console.log(chalk.red(`error!: ${error}`));
// });
//
// Card.create({
//   tagged_timestamp: 700,
//   podcast_id: 1,
//   episode_id: 5,
//   media_link: 'http://www.catbreedsjunction.com/images/chartreux-cat-breed.jpg',
//   media_type: 'picture',
//   description: 'Put a bird on it stumptown gluten-free microdosing. Godard single-origin coffee scenester freegan, schlitz farm-to-table lyft gentrify VHS hammock truffaut green juice neutra fashion axe. Kogi cloud bread pok pok, listicle occupy stumptown gochujang fam. ',
//   button_text: 'click me!',
//   button_link: 'https://www.youtube.com/watch?v=Y19FzsqM1as',
// }).then((inst) => {
//   console.log(chalk.blue('+++line 41 success!'), inst);
// }).catch((error) => {
//   console.log(chalk.red(`error!: ${error}`));
// });
//
// Card.create({
//   tagged_timestamp: 700,
//   podcast_id: 1,
//   episode_id: 5,
//   media_link: 'http://www.catbreedsjunction.com/images/chartreux-cat-breed.jpg',
//   media_type: 'picture',
//   description: 'Art party hell of shoreditch pug, banh mi gentrify chia forage freegan vape sriracha lyft. Pour-over sartorial brunch, literally tumblr cornhole prism sustainable slow-carb viral meggings migas disrupt keffiyeh. Letterpress try-hard succulents celiac neutra.',
//   button_text: 'click me!',
//   button_link: 'https://www.youtube.com/watch?v=Y19FzsqM1as',
// }).then((inst) => {
//   console.log(chalk.blue('+++line 41 success!'), inst);
// }).catch((error) => {
//   console.log(chalk.red(`error!: ${error}`));
// });
