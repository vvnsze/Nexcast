'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.renameColumn('podcasts', 'full_name', 'fullName');
    queryInterface.renameColumn('podcasts', 'feed_url', 'feedUrl');
    queryInterface.renameColumn('podcasts', 'image_url', 'imageUrl');
    queryInterface.renameColumn('card', 'tagged_timestamp', 'taggedTimestamp');
    queryInterface.renameColumn('card', 'podcast_id', 'podcastId');
    queryInterface.renameColumn('card', 'episode_id', 'episodeId');
    queryInterface.renameColumn('card', 'media_link', 'mediaLink');
    queryInterface.renameColumn('card', 'media_type', 'mediaType');
    queryInterface.renameColumn('card', 'button_text', 'buttonText');
    queryInterface.renameColumn('card', 'button_link', 'buttonLink');
    queryInterface.renameColumn('card', 'is_published', 'isPublished');
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.renameColumn('podcasts', 'fullName', 'full_name');
    queryInterface.renameColumn('podcasts', 'feedUrl', 'feed_url');
    queryInterface.renameColumn('podcasts', 'imageUrl', 'image_url');
    queryInterface.renameColumn('card', 'taggedTimestamp', 'tagged_timestamp');
    queryInterface.renameColumn('card', 'podcastId', 'podcast_id');
    queryInterface.renameColumn('card', 'episodeId', 'podcast_id');
    queryInterface.renameColumn('card', 'mediaLink', 'media_link');
    queryInterface.renameColumn('card', 'mediaType', 'media_type');
    queryInterface.renameColumn('card', 'buttonText', 'button_text');
    queryInterface.renameColumn('card', 'buttonLink', 'button_link');
    queryInterface.renameColumn('card', 'isPublished', 'is_published');
  }
};
